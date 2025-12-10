# Tourify Widget

> A premium embeddable tour widget with black and gold aesthetics

Beautiful, lightweight onboarding tours for any website. Built with TypeScript, Vite, and Three.js.

## ✨ Features

- 🎨 **Premium Design** - Black and gold theme with glassmorphism effects
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎯 **Smart Targeting** - Spotlight system highlights elements
- 📊 **Analytics** - Track user engagement automatically
- 🎭 **3D Avatar** - Optional animated Three.js avatar
- ⚡ **Lightweight** - Only ~15KB gzipped
- 🔧 **Easy Integration** - Add with a simple script tag
- 💾 **Resume Support** - Users can continue where they left off

## 🚀 Quick Start

```html
<script src="https://your-cdn.com/tourify.umd.js"></script>
<script>
	new Tourify({
		tourId: 'your-tour-id',
		autoStart: true,
	});
</script>
```

See [QUICK-START.md](./QUICK-START.md) for detailed instructions.

## 🏗️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
widget/
├── src/
│   ├── index.ts        # Entry point
│   ├── tourify.ts      # Main widget class
│   ├── avatar.ts       # Three.js avatar
│   ├── styles.ts       # CSS styles
│   └── types.ts        # TypeScript types
├── demo/
│   └── index.html      # Demo page
├── dist/               # Build output
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📖 API Reference

### Constructor Options

```typescript
interface TourConfig {
	tourId: string; // Required
	apiUrl?: string; // Default: window.location.origin
	autoStart?: boolean; // Default: false
	showAvatar?: boolean; // Default: true
	onStart?: () => void;
	onComplete?: () => void;
	onSkip?: () => void;
	onStepChange?: (step: TourStep) => void;
}
```

### Methods

- `start()` - Start the tour
- `next()` - Go to next step
- `previous()` - Go to previous step
- `skip()` - Skip the entire tour
- `destroy()` - Remove tour and cleanup

### Tour Data Format

```typescript
interface TourData {
	id: string;
	name: string;
	description?: string;
	steps: TourStep[];
}

interface TourStep {
	id: string;
	title: string;
	description: string;
	target?: string; // CSS selector
	position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
	order: number;
}
```

## 🎨 Styling

The widget uses a premium black and gold color scheme:

- **Primary Gold**: `#eabe7b`
- **Background**: `rgba(15, 15, 15, 0.95)`
- **Glass Effect**: `backdrop-filter: blur(12px)`
- **Shadows**: Subtle gold glows

All styles are scoped with `.tourify-` prefix to avoid conflicts.

## 📊 Analytics Events

The widget automatically tracks:

- `tour_started`
- `tour_completed`
- `tour_skipped`
- `step_viewed`
- `step_completed`
- `step_skipped`

Events are sent to `{apiUrl}/api/analytics/track` with:

```javascript
{
  tour_id: string;
  event_type: string;
  step_id?: string;
  session_id: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  timestamp: string;
}
```

## 🧪 Testing

### Demo Page

```bash
npm run dev
# Open http://localhost:5173/demo
```

### Build Verification

```bash
npm run build
ls -lh dist/
# Should show tourify.es.js and tourify.umd.js
```

## 📦 Deployment

The widget can be hosted on:

- **Vercel** - Deploy directly from Git
- **Netlify** - Drag and drop dist folder
- **CDN** - Upload to any CDN service

### Build for Production

```bash
npm run build
# Output in dist/ folder
```

## 🔌 Integration with Dashboard

The widget expects tours from your API at:

```
GET {apiUrl}/api/tours/{tourId}
```

Response format:

```json
{
	"tour": {
		"id": "uuid",
		"name": "Welcome Tour",
		"description": "Get started guide",
		"steps": [
			{
				"id": "1",
				"order": 1,
				"title": "Welcome!",
				"description": "Let's get started",
				"target": "#welcome-button",
				"position": "bottom"
			}
		]
	}
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT

## 🙏 Credits

Built with:

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/)
