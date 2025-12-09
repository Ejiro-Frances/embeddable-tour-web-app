import { NextRequest, NextResponse } from 'next/server'
import { trackAnalyticsEvent } from '@/lib/api/analytics'
import { isUUID } from '@/lib/utils'

/**
 * POST /api/analytics/track - Track an analytics event
 * This endpoint is public for embedded tours
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { tourId, eventType, stepId, sessionId, deviceType, durationSeconds } = body

        if (!tourId || !eventType) {
            return NextResponse.json(
                { error: 'tourId and eventType are required' },
                { status: 400 }
            )
        }

        // confirm both are uuids
        if (!isUUID(tourId) || !isUUID(stepId)) {
            return NextResponse.json(
                { error: 'Invalid tourId or stepId, must be a UUID' },
                { status: 400 }
            )
        }


        const validEventTypes = ['started', 'completed', 'abandoned', 'step_completed', 'step_skipped']
        if (!validEventTypes.includes(eventType)) {
            return NextResponse.json(
                { error: 'Invalid event type' },
                { status: 400 }
            )
        }

        const success = await trackAnalyticsEvent(tourId, eventType, {
            stepId,
            sessionId,
            deviceType,
            durationSeconds,
        })

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to track event' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error in POST /api/analytics/track:', error)
        return NextResponse.json(
            { error: 'Failed to track event' },
            { status: 500 }
        )
    }
}
