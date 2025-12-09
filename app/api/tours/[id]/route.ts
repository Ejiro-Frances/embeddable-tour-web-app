import { NextRequest, NextResponse } from 'next/server'
import { getTourById, updateTour, deleteTour } from '@/lib/api/tours'
import { isUUID } from '@/lib/utils'

/**
 * GET /api/tours/[id] - Get a specific tour
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const tour = await getTourById(id)

        if (!tour) {
            return NextResponse.json(
                { error: 'Tour not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ tour }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/tours/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tour' },
            { status: 500 }
        )
    }
}

/**
 * PATCH /api/tours/[id] - Update a specific tour
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    
    try {
        const body = await request.json()
        const { name, description, steps } = body
        
        if (!isUUID(id)) {
            return NextResponse.json(
                { error: 'Invalid tourId, must be a UUID' },
                { status: 400 }
            )
        }

        if (!name || !steps || steps.length < 5) {
            return NextResponse.json(
                { error: 'Invalid tour data. Name and at least 5 steps are required.' },
                { status: 400 }
            )
        }

        const tour = await updateTour(
            id,
            { name, description },
            steps ? steps.map((step: { order: number, title: string, description: string }, index: number) => ({
                order_number: step.order || index + 1,
                title: step.title,
                description: step.description,
            })) : undefined
        )

        return NextResponse.json({ tour }, { status: 200 })
    } catch (error) {
        console.error('Error in PATCH /api/tours/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to update tour' },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/tours/[id] - Delete a specific tour
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    
    try {
        const success = await deleteTour(id)

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to delete tour' },
                { status: 500 }
            )
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Error in DELETE /api/tours/[id]:', error)
        return NextResponse.json(
            { error: 'Failed to delete tour' },
            { status: 500 }
        )
    }
}
