import { NextRequest, NextResponse } from 'next/server';
import { trackAnalyticsEvent } from '@/lib/api/analytics';
import { isUUID } from '@/lib/utils';

/**
 * OPTIONS /api/analytics/track - Handle CORS preflight
 */
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}

/**
 * POST /api/analytics/track - Track an analytics event
 * This endpoint is public for embedded tours
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { tourId, eventType, stepId, sessionId, deviceType, durationSeconds } = body;

		if (!tourId || !eventType) {
			return NextResponse.json(
				{ error: 'tourId and eventType are required' },
				{
					status: 400,
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
		}

		// confirm both are uuids
		if (!isUUID(tourId) || !isUUID(stepId)) {
			return NextResponse.json(
				{ error: 'Invalid tourId or stepId, must be a UUID' },
				{
					status: 400,
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
		}

		const validEventTypes = ['started', 'completed', 'abandoned', 'step_completed', 'step_skipped'];
		if (!validEventTypes.includes(eventType)) {
			return NextResponse.json(
				{ error: 'Invalid event type' },
				{
					status: 400,
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
		}

		const success = await trackAnalyticsEvent(tourId, eventType, {
			stepId,
			sessionId,
			deviceType,
			durationSeconds,
		});

		if (!success) {
			return NextResponse.json(
				{ error: 'Failed to track event' },
				{
					status: 500,
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
				},
			);
		}

		return NextResponse.json(
			{ success: true },
			{
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			},
		);
	} catch (error) {
		console.error('Error in POST /api/analytics/track:', error);
		return NextResponse.json(
			{ error: 'Failed to track event' },
			{
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			},
		);
	}
}
