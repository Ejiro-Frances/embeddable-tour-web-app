import { TourConfig, TourStep, TourData } from './types';
import { styles } from './styles';
import { Avatar } from './avatar';

/**
 * Tourify - Embeddable Tour Widget
 * Factory function pattern inspired by intro.js
 *
 * Usage:
 *   const tour = tourify({ tourId: 'my-tour' });
 *   tour.start();
 */
export function tourify(config: TourConfig) {
	// Private state
	let tourData: TourData | null = null;
	let currentStepIndex = 0;
	const sessionId = generateSessionId();
	let elements: {
		overlay?: HTMLElement;
		spotlight?: HTMLElement;
		card?: HTMLElement;
		avatar?: Avatar;
	} = {};

	// Merge config with defaults
	const options: Required<Omit<TourConfig, 'onStepChange' | 'onComplete' | 'onSkip' | 'onStart'>> & TourConfig = {
		autoStart: false,
		showAvatar: true,
		apiUrl: typeof window !== 'undefined' ? window.location.origin : '',
		...config,
	};

	// Initialize
	injectStyles();
	if (options.autoStart) {
		setTimeout(() => start(), 100);
	}

	// Private functions
	function generateSessionId(): string {
		return `tourify-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	function injectStyles(): void {
		if (document.getElementById('tourify-styles')) return;

		const styleEl = document.createElement('style');
		styleEl.id = 'tourify-styles';
		styleEl.textContent = styles;
		document.head.appendChild(styleEl);
	}

	async function fetchTourData(): Promise<void> {
		try {
			const response = await fetch(`${options.apiUrl}/api/tours/${options.tourId}`);

			if (!response.ok) throw new Error('Failed to fetch tour data');

			const data = await response.json();
			tourData = data.tour;
		} catch (error) {
			console.error('Tourify: Error fetching tour data:', error);
			// Fallback to demo data
			tourData = getDemoData();
		}
	}

	function getDemoData(): TourData {
		return {
			id: 'demo',
			name: 'Demo Tour',
			description: 'A demo tour',
			steps: [
				{
					id: '1',
					title: 'Welcome! 👋',
					description: 'This is a guided tour to help you get started. Click Next to continue.',
					position: 'center',
					order: 1,
				},
				{
					id: '2',
					title: 'Navigation',
					description: 'Use the navigation buttons to move between steps.',
					target: 'body',
					position: 'center',
					order: 2,
				},
				{
					id: '3',
					title: 'Progress Tracking',
					description: 'The progress bar shows how far along you are in the tour.',
					position: 'center',
					order: 3,
				},
				{
					id: '4',
					title: 'Skip Anytime',
					description: 'You can skip the tour at any time using the Skip button.',
					position: 'center',
					order: 4,
				},
				{
					id: '5',
					title: 'All Done! 🎉',
					description: 'You can resume this tour later from where you left off.',
					position: 'center',
					order: 5,
				},
			],
		};
	}

	function showStep(index: number, direction: 'next' | 'previous' | 'none' = 'none'): void {
		if (!tourData) return;

		const step = tourData.steps[index];
		if (!step) return;

		// Animate out current card if it exists
		if (elements.card && direction !== 'none') {
			animateCardOut(elements.card, direction).then(() => {
				proceedToStep(index, step, direction);
			});
		} else {
			proceedToStep(index, step, direction);
		}
	}

	function proceedToStep(index: number, step: TourStep, direction: 'next' | 'previous' | 'none'): void {
		currentStepIndex = index;
		saveProgress();

		// Scroll to target element if it exists
		if (step.target) {
			scrollToTarget(step.target);
		}

		cleanup(false);
		createOverlay();

		if (step.target) {
			createSpotlight(step.target);
		}

		createCard(step, direction);
		trackEvent('step_viewed', step);
		options.onStepChange?.(step);
	}

	function scrollToTarget(selector: string): void {
		const target = document.querySelector(selector) as HTMLElement;
		if (!target) return;

		// Smooth scroll to element with some offset for better visibility
		const rect = target.getBoundingClientRect();
		const offset = 100; // 100px from top

		if (rect.top < offset || rect.bottom > window.innerHeight - offset) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}

	function disableScroll(): void {
		// Save current scroll position
		const scrollY = window.scrollY;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = '100%';
	}

	function enableScroll(): void {
		// Restore scroll position
		const scrollY = document.body.style.top;
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
	}

	function animateCardOut(card: HTMLElement, direction: 'next' | 'previous'): Promise<void> {
		return new Promise((resolve) => {
			const slideDistance = direction === 'next' ? -30 : 30;

			card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
			card.style.opacity = '0';

			// Get current transform and add slide
			const currentTransform = card.style.transform;
			if (currentTransform.includes('translate')) {
				// Extract translate values and add slide
				card.style.transform = currentTransform.replace(/translate\([^)]+\)/, (match) => {
					const values = match.match(/-?[\d.]+%?/g) || ['0', '0'];
					return `translate(calc(${values[0]} + ${slideDistance}px), ${values[1]})`;
				});
			} else {
				card.style.transform = `translateX(${slideDistance}px)`;
			}

			setTimeout(resolve, 200);
		});
	}

	function createOverlay(): void {
		const overlay = document.createElement('div');
		overlay.className = 'tourify-overlay tourify-widget';
		overlay.onclick = () => {};
		document.body.appendChild(overlay);
		elements.overlay = overlay;
	}

	function createSpotlight(selector: string): void {
		const target = document.querySelector(selector) as HTMLElement;
		if (!target) return;

		const rect = target.getBoundingClientRect();
		const spotlight = document.createElement('div');
		spotlight.className = 'tourify-spotlight';
		spotlight.style.top = `${rect.top + window.scrollY - 8}px`;
		spotlight.style.left = `${rect.left + window.scrollX - 8}px`;
		spotlight.style.width = `${rect.width + 16}px`;
		spotlight.style.height = `${rect.height + 16}px`;

		document.body.appendChild(spotlight);
		elements.spotlight = spotlight;
	}

	function createCard(step: TourStep, direction: 'next' | 'previous' | 'none' = 'none'): void {
		const card = document.createElement('div');
		card.className = 'tourify-card tourify-widget';

		// Set initial centered position BEFORE adding to DOM
		card.style.top = '50%';
		card.style.left = '50%';

		// Set initial slide position based on direction
		const slideDistance = direction === 'next' ? 30 : direction === 'previous' ? -30 : 0;
		card.style.transform =
			slideDistance !== 0 ? `translate(calc(-50% + ${slideDistance}px), -50%)` : 'translate(-50%, -50%)';
		card.style.opacity = '0';

		card.innerHTML = `
      <div class="tourify-header">
        <div class="tourify-step-badge">
          Step ${currentStepIndex + 1} of ${tourData!.steps.length}
        </div>
        <h3 class="tourify-title">${step.title}</h3>
      </div>
      ${options.showAvatar ? '<div class="tourify-avatar-container" id="tourify-avatar"></div>' : ''}
      <p class="tourify-description">${step.description}</p>
      <div class="tourify-progress">
        <div class="tourify-progress-bar" style="width: ${
					((currentStepIndex + 1) / tourData!.steps.length) * 100
				}%"></div>
      </div>
      <div class="tourify-footer">
        <button class="tourify-button tourify-button-skip" id="tourify-skip">
          Skip Tour
        </button>
        <div class="tourify-nav-buttons">
          ${
						currentStepIndex > 0
							? '<button class="tourify-button tourify-button-secondary" id="tourify-back">Back</button>'
							: ''
					}
          <button class="tourify-button tourify-button-primary" id="tourify-next">
            ${isLastStep() ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    `;

		document.body.appendChild(card);
		elements.card = card;

		// Animate in with slide effect
		requestAnimationFrame(() => {
			// If step has specific target, reposition after DOM calculations
			if (step.target && step.position !== 'center') {
				positionCard(card, step);
			} else {
				// Keep centered position
				card.style.transform = 'translate(-50%, -50%)';
			}

			// Fade in with slide animation
			requestAnimationFrame(() => {
				card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
				card.style.opacity = '1';

				// Ensure final transform is correct
				if (step.target && step.position !== 'center') {
					// Will be set by positionCard
				} else {
					card.style.transform = 'translate(-50%, -50%)';
				}
			});
		});

		if (options.showAvatar) {
			const avatarContainer = document.getElementById('tourify-avatar');
			if (avatarContainer) {
				elements.avatar = new Avatar(avatarContainer);
			}
		}

		attachEventListeners();
	}

	function positionCard(card: HTMLElement, step: TourStep): void {
		const position = step.position || 'center';

		if (position === 'center' || !step.target) {
			card.style.top = '50%';
			card.style.left = '50%';
			card.style.transform = 'translate(-50%, -50%)';
			return;
		}

		const target = document.querySelector(step.target!) as HTMLElement;
		if (!target) {
			card.style.top = '50%';
			card.style.left = '50%';
			card.style.transform = 'translate(-50%, -50%)';
			return;
		}

		const rect = target.getBoundingClientRect();
		const cardWidth = 420;
		const cardHeight = 400;
		const padding = 20;

		switch (position) {
			case 'top':
				card.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
				card.style.top = `${rect.top + window.scrollY - cardHeight - padding}px`;
				card.style.transform = 'translateX(-50%)';
				break;
			case 'bottom':
				card.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
				card.style.top = `${rect.bottom + window.scrollY + padding}px`;
				card.style.transform = 'translateX(-50%)';
				break;
			case 'left':
				card.style.left = `${rect.left + window.scrollX - cardWidth - padding}px`;
				card.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
				card.style.transform = 'translateY(-50%)';
				break;
			case 'right':
				card.style.left = `${rect.right + window.scrollX + padding}px`;
				card.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
				card.style.transform = 'translateY(-50%)';
				break;
		}
	}

	function attachEventListeners(): void {
		document.getElementById('tourify-next')?.addEventListener('click', () => {
			if (isLastStep()) {
				complete();
			} else {
				next();
			}
		});

		document.getElementById('tourify-back')?.addEventListener('click', () => {
			previous();
		});

		document.getElementById('tourify-skip')?.addEventListener('click', () => {
			skip();
		});
	}

	function isLastStep(): boolean {
		if (!tourData) return false;
		return currentStepIndex === tourData.steps.length - 1;
	}

	function saveProgress(): void {
		if (!tourData) return;
		localStorage.setItem(`tourify-progress-${tourData.id}`, currentStepIndex.toString());
	}

	async function trackEvent(eventType: string, step?: TourStep): Promise<void> {
		if (!tourData) return;

		const eventData = {
			tourId: tourData.id,
			eventType: eventType,
			stepId: step?.id,
			sessionId: sessionId,
			deviceType: getDeviceType(),
			timestamp: new Date().toISOString(),
		};

		console.log('Tourify Analytics:', eventData);

		// Try to send to API, fail silently if unavailable (expected in demo mode)
		try {
			await fetch(`${options.apiUrl}/api/analytics/track`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(eventData),
			}).catch(() => {
				// Silently fail - API not available (demo mode)
			});
		} catch {
			// Silently fail - expected when running standalone
		}
	}

	function getDeviceType(): string {
		const width = window.innerWidth;
		if (width <= 640) return 'mobile';
		if (width <= 1024) return 'tablet';
		return 'desktop';
	}

	function cleanup(removeProgress: boolean = false): void {
		elements.overlay?.remove();
		elements.spotlight?.remove();
		elements.card?.remove();
		elements.avatar?.destroy();

		elements = {};

		// Restore page scrolling
		enableScroll();

		if (removeProgress && tourData) {
			localStorage.removeItem(`tourify-progress-${tourData.id}`);
		}
	}

	// Public API (intro.js style)
	async function start(): Promise<typeof api> {
		await fetchTourData();

		if (!tourData || tourData.steps.length === 0) {
			console.error('Tourify: No tour data available');
			return api;
		}

		const completed = localStorage.getItem(`tourify-completed-${tourData.id}`);
		if (completed) {
			const resumeKey = `tourify-progress-${tourData.id}`;
			const savedIndex = localStorage.getItem(resumeKey);
			if (savedIndex) {
				currentStepIndex = parseInt(savedIndex, 10);
			}
		}

		// Disable page scrolling during tour
		disableScroll();

		options.onStart?.();
		trackEvent('tour_started');
		showStep(currentStepIndex);

		return api;
	}

	function next(): typeof api {
		if (!tourData) return api;

		const currentStep = tourData.steps[currentStepIndex];
		trackEvent('step_completed', currentStep);

		if (currentStepIndex < tourData.steps.length - 1) {
			showStep(currentStepIndex + 1, 'next');
		}

		return api;
	}

	function previous(): typeof api {
		if (currentStepIndex > 0) {
			showStep(currentStepIndex - 1, 'previous');
		}
		return api;
	}

	function skip(): typeof api {
		if (!tourData) return api;

		const currentStep = tourData.steps[currentStepIndex];
		trackEvent('step_skipped', currentStep);
		trackEvent('tour_skipped');
		options.onSkip?.();
		cleanup(true);

		return api;
	}

	function complete(): typeof api {
		if (!tourData) return api;

		const currentStep = tourData.steps[currentStepIndex];
		trackEvent('step_completed', currentStep);
		trackEvent('tour_completed');

		localStorage.setItem(`tourify-completed-${tourData.id}`, 'true');
		localStorage.removeItem(`tourify-progress-${tourData.id}`);

		options.onComplete?.();
		cleanup(true);

		return api;
	}

	function destroy(): void {
		cleanup(true);
		const stylesEl = document.getElementById('tourify-styles');
		stylesEl?.remove();
	}

	function goToStep(index: number): typeof api {
		if (tourData && index >= 0 && index < tourData.steps.length) {
			showStep(index);
		}
		return api;
	}

	function currentStep(): number {
		return currentStepIndex;
	}

	// Return public API
	const api = {
		start,
		next,
		previous,
		skip,
		exit: skip,
		goToStep,
		currentStep,
		destroy,
	};

	return api;
}

// Legacy class-based API for backwards compatibility
export class Tourify {
	private tour: ReturnType<typeof tourify>;

	constructor(config: TourConfig) {
		this.tour = tourify(config);
	}

	start() {
		return this.tour.start();
	}

	next() {
		return this.tour.next();
	}

	previous() {
		return this.tour.previous();
	}

	skip() {
		return this.tour.skip();
	}

	destroy() {
		this.tour.destroy();
	}
}
