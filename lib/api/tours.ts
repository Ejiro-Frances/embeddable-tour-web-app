import { createServerSupabaseClient as createClient } from '@/lib/supabase/server'
import { TourWithSteps, TourInsert, StepInsert } from '@/types/database'

/**
 * Get all tours for the current user
 */
export async function getUserTours(): Promise<TourWithSteps[]> {
    const supabase = await createClient()

    const { data: tours, error } = await supabase
        .from('tours')
        .select(`
      *,
      steps (*)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching tours:', error)
        throw new Error('Failed to fetch tours')
    }

    return tours as TourWithSteps[]
}

/**
 * Get a single tour by ID with its steps
 */
export async function getTourById(tourId: string): Promise<TourWithSteps | null> {
    const supabase = await createClient()

    const { data: tour, error } = await supabase
        .from('tours')
        .select(`
      *,
      steps (*)
    `)
        .eq('id', tourId)
        .single()

    if (error) {
        console.error('Error fetching tour:', error)
        return null
    }

    return tour as TourWithSteps
}

/**
 * Create a new tour with steps
 */
export async function createTour(
    tourData: Omit<TourInsert, 'user_id'>,
    steps: Omit<StepInsert, 'tour_id'>[]
): Promise<TourWithSteps | null> {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('User not authenticated')
    }

    // Insert tour
    const { data: tour, error: tourError } = await supabase
        .from('tours')
        // @ts-expect-error - Supabase type inference issue
        .insert({
            ...tourData,
            user_id: user.id,
        } as TourInsert)
        .select()
        .single() as { data: TourWithSteps, error?: unknown }

    if (tourError) {
        console.error('Error creating tour:', tourError)
        throw new Error('Failed to create tour')
    }

    // Insert steps
    const stepsToInsert = steps.map((step, index) => ({
        ...step,
        tour_id: tour.id,
        order_number: step.order_number ?? index + 1,
    }))

    const { data: insertedSteps, error: stepsError } = await supabase
        .from('steps')
        // @ts-expect-error - Supabase type inference issue
        .insert(stepsToInsert as StepInsert[])
        .select()

    if (stepsError) {
        console.error('Error creating steps:', stepsError)
        // Rollback: delete the tour
        await supabase.from('tours').delete().eq('id', tour.id)
        throw new Error('Failed to create tour steps')
    }

    return {
        ...tour,
        steps: insertedSteps,
    } as TourWithSteps
}

/**
 * Update an existing tour
 */
export async function updateTour(
    tourId: string,
    tourData: Partial<Omit<TourInsert, 'user_id'>>,
    steps?: Omit<StepInsert, 'tour_id'>[]
): Promise<TourWithSteps | null> {
    const supabase = await createClient()

    // Update tour
    const { data: tour, error: tourError } = await supabase
        .from('tours')
        // @ts-expect-error - Supabase type inference issue
        .update(tourData)
        .eq('id', tourId)
        .select()
        .single() as { data: TourWithSteps, error?: unknown }

    if (tourError) {
        console.error('Error updating tour:', tourError)
        throw new Error('Failed to update tour')
    }

    // If steps are provided, update them
    if (steps) {
        // Delete existing steps
        await supabase.from('steps').delete().eq('tour_id', tourId)

        // Insert new steps
        const stepsToInsert = steps.map((step, index) => ({
            ...step,
            tour_id: tourId,
            order_number: step.order_number ?? index + 1,
        }))

        const { data: insertedSteps, error: stepsError } = await supabase
            .from('steps')
            // @ts-expect-error - Supabase type inference issue
            .insert(stepsToInsert as StepInsert[])
            .select()

        if (stepsError) {
            console.error('Error updating steps:', stepsError)
            throw new Error('Failed to update tour steps')
        }

        return {
            ...tour,
            steps: insertedSteps,
        } as TourWithSteps
    }

    // Fetch steps if not provided
    const { data: existingSteps } = await supabase
        .from('steps')
        .select('*')
        .eq('tour_id', tourId)
        .order('order_number', { ascending: true })

    return {
        ...tour,
        steps: existingSteps || [],
    } as TourWithSteps
}

/**
 * Delete a tour (steps will be cascade deleted)
 */
export async function deleteTour(tourId: string): Promise<boolean> {
    const supabase = await createClient()

    const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', tourId)

    if (error) {
        console.error('Error deleting tour:', error)
        return false
    }

    return true
}
