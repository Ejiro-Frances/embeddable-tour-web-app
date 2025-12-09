import { NextRequest, NextResponse } from 'next/server'
import { getUserTours, createTour } from '@/lib/api/tours'

/**
 * GET /api/tours - Get all tours for the current user
 */
export async function GET() {
    try {
        const tours = await getUserTours()
        return NextResponse.json({ tours }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/tours:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tours' },
            { status: 500 }
        )
    }
}

/**
 * POST /api/tours - Create a new tour
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, description, steps } = body

        if (!name || !steps || steps.length < 5) {
            return NextResponse.json(
                { error: 'Invalid tour data. Name and at least 5 steps are required.' },
                { status: 400 }
            )
        }

        const tour = await createTour(
            { name, description },
            steps.map((step: { order: number, title: string, description: string }, index: number) => ({
                order_number: step.order || index + 1,
                title: step.title,
                description: step.description,
            }))
        )

        return NextResponse.json({ tour }, { status: 201 })
    } catch (error) {
        console.error('Error in POST /api/tours:', error)
        return NextResponse.json(
            { error: 'Failed to create tour' },
            { status: 500 }
        )
    }
}
