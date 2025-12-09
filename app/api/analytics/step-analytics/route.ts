import { NextRequest, NextResponse } from 'next/server'
import { getStepAnalytics } from '@/lib/api/analytics'

/**
 * GET /api/analytics/step-analytics - Get step analytics
 * Query params: tourId (optional)
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const tourId = searchParams.get('tourId') || undefined

        const analytics = await getStepAnalytics(tourId)
        return NextResponse.json({ analytics }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/analytics/step-analytics:', error)
        return NextResponse.json(
            { error: 'Failed to fetch step analytics' },
            { status: 500 }
        )
    }
}
