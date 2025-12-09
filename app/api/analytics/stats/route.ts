import { NextResponse } from 'next/server'
import { getTourStats } from '@/lib/api/analytics'

/**
 * GET /api/analytics/stats - Get dashboard statistics
 */
export async function GET() {
    try {
        const stats = await getTourStats()
        return NextResponse.json({ stats }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/analytics/stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        )
    }
}
