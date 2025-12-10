import { tourify, Tourify } from './tourify';

// Export both functional and class APIs
export { tourify, Tourify };
export type { TourConfig, TourStep, TourData } from './types';

// Make both available globally
declare global {
	interface Window {
		tourify: typeof tourify;
		Tourify: typeof Tourify;
	}
}

if (typeof window !== 'undefined') {
	window.tourify = tourify;
	window.Tourify = Tourify;
}

export default tourify;
