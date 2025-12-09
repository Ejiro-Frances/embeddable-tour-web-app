import { createServerSupabaseClient as createClient } from '@/lib/supabase/server'
import { TourStats, CompletionTrend, StepAnalytics } from '@/types/database'

/**
 * Get dashboard statistics for the current user
 */
export async function getTourStats(): Promise<TourStats> {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }

    // Get all user's tour IDs
    const { data: tours } = await supabase
        .from('tours')
        .select('id')
        .eq('user_id', user.id)

    const tourIds = tours?.map((t: { id: string }) => t.id) || []

    if (tourIds.length === 0) {
        return {
            totalToursCreated: 0,
            totalToursCompleted: 0,
            completionRate: 0,
            stepsSkipped: 0,
            averageDurationInMinutes: 0,
            activeToursToday: 0,
            abandonRate: 0,
        }
    }

    // Total tours created
    const totalToursCreated = tourIds.length

    // Total tours completed
    const { count: completedCount } = await supabase
        .from('tour_analytics')
        .select('*', { count: 'exact', head: true })
        .in('tour_id', tourIds)
        .eq('event_type', 'completed')

    const totalToursCompleted = completedCount || 0

    // Total tours started
    const { count: startedCount } = await supabase
        .from('tour_analytics')
        .select('*', { count: 'exact', head: true })
        .in('tour_id', tourIds)
        .eq('event_type', 'started')

    const totalToursStarted = startedCount || 0

    // Completion rate
    const completionRate = totalToursStarted > 0
        ? Math.round((totalToursCompleted / totalToursStarted) * 100)
        : 0

    // Steps skipped
    const { count: skippedCount } = await supabase
        .from('tour_analytics')
        .select('*', { count: 'exact', head: true })
        .in('tour_id', tourIds)
        .eq('event_type', 'step_skipped')

    const stepsSkipped = skippedCount || 0

    // Average duration (in minutes)
    const { data: allCompletedTours } = await supabase
        .from('tour_analytics')
        .select('duration_seconds')
        .in('tour_id', tourIds)
        .eq('event_type', 'completed')
        .not('duration_seconds', 'is', null)

    // type cast
    const completedTours = allCompletedTours as { duration_seconds: number }[]

    const averageDurationInMinutes = completedTours && completedTours.length > 0
        ? Math.round(
            completedTours.reduce((sum: number, t) => sum + (t.duration_seconds || 0), 0) /
            completedTours.length / 60
        )
        : 0

    // Active tours today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count: activeTodayCount } = await supabase
        .from('tour_analytics')
        .select('*', { count: 'exact', head: true })
        .in('tour_id', tourIds)
        .eq('event_type', 'started')
        .gte('created_at', today.toISOString())

    const activeToursToday = activeTodayCount || 0

    // Abandon rate
    const { count: abandonedCount } = await supabase
        .from('tour_analytics')
        .select('*', { count: 'exact', head: true })
        .in('tour_id', tourIds)
        .eq('event_type', 'abandoned')

    const totalAbandoned = abandonedCount || 0
    const abandonRate = totalToursStarted > 0
        ? Math.round((totalAbandoned / totalToursStarted) * 100)
        : 0

    return {
        totalToursCreated,
        totalToursCompleted,
        completionRate,
        stepsSkipped,
        averageDurationInMinutes,
        activeToursToday,
        abandonRate,
    }
}

/**
 * Get completion trend for the last 7 days
 */
export async function getCompletionTrend(): Promise<CompletionTrend[]> {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }

    // Get all user's tour IDs
    const { data: tours } = await supabase
        .from('tours')
        .select('id')
        .eq('user_id', user.id)

    const tourIds = tours?.map((t: { id: string }) => t.id) || []

    if (tourIds.length === 0) {
        return []
    }

    // Get last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: analytics } = await supabase
        .from('tour_analytics')
        .select('created_at')
        .in('tour_id', tourIds)
        .eq('event_type', 'completed')
        .gte('created_at', sevenDaysAgo.toISOString())

    // Group by day
    const completionByDay: { [key: string]: number } = {}

    analytics?.forEach((record: { created_at: string }) => {
        const date = new Date(record.created_at)
        const dayName = days[(date.getDay() + 6) % 7]
        completionByDay[dayName] = (completionByDay[dayName] || 0) + 1
    })

    // Return data for all 7 days
    return days.map(day => ({
        day,
        completed: completionByDay[day] || 0,
    }))
}

/**
 * Get step analytics (completed vs skipped per step)
 */
export async function getStepAnalytics(tourId?: string): Promise<StepAnalytics[]> {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }

    // Get all user's tour IDs or specific tour
    let tourIds: string[] = []

    if (tourId) {
        tourIds = [tourId]
    } else {
        const { data: tours } = await supabase
            .from('tours')
            .select('id')
            .eq('user_id', user.id)

        tourIds = tours?.map((t: { id: string }) => t.id) || []
    }

    if (tourIds.length === 0) {
        return []
    }

    // Get all steps for these tours
    const { data: steps } = await supabase
        .from('steps')
        .select('id, title, tour_id')
        .in('tour_id', tourIds)
        .order('order_number', { ascending: true })

    if (!steps || steps.length === 0) {
        return []
    }

    // Get analytics for all steps in a single query
    const stepIds = (steps as { id: string }[]).map(s => s.id)
    const { data: allAnalyticsData, error: analyticsError } = await supabase
        .from('tour_analytics')
        .select('step_id, event_type')
        .in('step_id', stepIds)
        .in('event_type', ['step_completed', 'step_skipped'])

    if (analyticsError) {
        console.error('Error fetching step analytics:', analyticsError)
        return []
    }

    // Build a lookup: { [step_id]: { completed: number, skipped: number } }
    // Group and count the data manually in JavaScript
    const analyticsMap: Record<string, { completed: number, skipped: number }> = {}

    const analyticsData = allAnalyticsData as { step_id: string, event_type: string }[]
    for (const row of analyticsData || []) {
        const stepId = row.step_id
        const eventType = row.event_type

        if (!stepId) continue

        if (!analyticsMap[stepId]) {
            analyticsMap[stepId] = { completed: 0, skipped: 0 }
        }

        if (eventType === 'step_completed') {
            analyticsMap[stepId].completed += 1
        } else if (eventType === 'step_skipped') {
            analyticsMap[stepId].skipped += 1
        }
    }
    const stepAnalytics: StepAnalytics[] = (steps as { id: string, title: string, tour_id: string }[]).map(step => ({
        step: step.title,
        stepId: step.id,
        completed: analyticsMap[step.id]?.completed || 0,
        skipped: analyticsMap[step.id]?.skipped || 0,
    }))

    return stepAnalytics
}

/**
 * Track analytics event (for public embeds)
 */
export async function trackAnalyticsEvent(
    tourId: string,
    eventType: 'started' | 'completed' | 'abandoned' | 'step_completed' | 'step_skipped',
    options?: {
        stepId?: string
        sessionId?: string
        deviceType?: string
        durationSeconds?: number
    }
): Promise<boolean> {
    const supabase = await createClient()

    const { error } = await supabase
        .from('tour_analytics')
        // @ts-expect-error - Supabase type inference issue
        .insert({
            tour_id: tourId,
            event_type: eventType,
            step_id: options?.stepId || null,
            session_id: options?.sessionId || null,
            device_type: options?.deviceType || null,
            duration_seconds: options?.durationSeconds || null,
        })

    if (error) {
        console.error('Error tracking analytics:', error)
        return false
    }

    return true
}
