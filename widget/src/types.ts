export interface TourStep {
	id: string;
	title: string;
	description: string;
	target?: string;
	position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
	order: number;
}

export interface TourConfig {
	tourId: string;
	apiUrl?: string;
	autoStart?: boolean;
	showAvatar?: boolean;
	onStepChange?: (step: TourStep) => void;
	onComplete?: () => void;
	onSkip?: () => void;
	onStart?: () => void;
}

export interface TourData {
	id: string;
	name: string;
	description?: string;
	steps: TourStep[];
}
