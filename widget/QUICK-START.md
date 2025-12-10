# Tourify Widget - Quick Start

## Installation

### Option 1: CDN (Easiest)

Add this script tag to your HTML:

```html
<script src="https://your-cdn.com/tourify.umd.js"></script>
```

## Basic Usage

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My App</title>
	</head>
	<body>
		<!-- Your content -->
		<div id="welcome">Welcome!</div>

		<!-- Initialize Tourify -->
		<script>
			const tour = new Tourify({
				tourId: 'YOUR_TOUR_ID',
				autoStart: true,
				showAvatar: true,
			});
		</script>
	</body>
</html>
```

## Configuration Options

```javascript
new Tourify({
	tourId: 'your-tour-id', // Required: Tour ID from dashboard
	apiUrl: 'https://your-api', // Optional: API endpoint (defaults to current origin)
	autoStart: false, // Optional: Auto-start tour on load
	showAvatar: true, // Optional: Show 3D avatar animation

	// Callbacks
	onStart: () => {}, // Called when tour starts
	onComplete: () => {}, // Called when tour completes
	onSkip: () => {}, // Called when tour is skipped
	onStepChange: (step) => {}, // Called when step changes
});
```

## Manual Control

```javascript
const tour = new Tourify({ tourId: 'my-tour' });

// Start the tour manually
tour.start();

// Navigate
tour.next();
tour.previous();
tour.skip();

// Cleanup
tour.destroy();
```

## Styling

The widget uses a premium black and gold theme that automatically matches dark backgrounds. All styles are scoped to avoid conflicts with your site.

## Analytics

The widget automatically tracks:

- Tour starts
- Step views
- Step completions
- Step skips
- Tour completions
- Device type
- Session duration

All analytics are sent to your API endpoint at `/api/analytics/track`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Bundle Size

- **Minified**: ~45KB
- **Gzipped**: ~15KB
