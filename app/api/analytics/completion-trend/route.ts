import { NextResponse } from 'next/server'
import { getCompletionTrend } from '@/lib/api/analytics'

/**
 * GET /api/analytics/completion-trend - Get completion trend for the last 7 days
 */
export async function GET() {
    try {
        const trend = await getCompletionTrend()
        return NextResponse.json({ trend }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/analytics/completion-trend:', error)
        return NextResponse.json(
            { error: 'Failed to fetch completion trend' },
            { status: 500 }
        )
    }
}
