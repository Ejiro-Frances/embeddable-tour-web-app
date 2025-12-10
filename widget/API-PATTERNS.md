# Widget API Patterns - Functional vs Class

## Why the Refactor?

Originally, the widget used a **class-based** approach (`new Tourify()`). After reviewing **intro.js**, I refactored to a **functional factory pattern** which offers better flexibility and a cleaner API.

## What Changed?

### Before (Class-based):

```javascript
const tour = new Tourify({
	tourId: 'my-tour',
	autoStart: false,
});

tour.start();
tour.next();
tour.skip();
```

### After (Functional):

```javascript
// Recommended approach
const tour = tourify({
	tourId: 'my-tour',
	autoStart: false,
});

// Method chaining supported
tour.start().next().next();

// Or auto-start
tourify({ tourId: 'my-tour', autoStart: true });
```

### Backwards Compatibility

The class-based API still works! Use whichever you prefer:

```javascript
// Both work identically:
const tour1 = tourify({ tourId: 'demo' }); // Functional
const tour2 = new Tourify({ tourId: 'demo' }); // Class

tour1.start(); // ✅
tour2.start(); // ✅
```

---

## Benefits of Functional Pattern

### 1. **Simpler Mental Model**

- No `new` keyword needed
- Just a function that returns an object with methods
- Similar to popular libraries (intro.js, shepherd.js)

### 2. **Method Chaining**

```javascript
tourify({ tourId: 'demo' }).start().next().next().goToStep(4);
```

### 3. **Cleaner Closures**

Private state is encapsulated without needing private class fields:

```javascript
function tourify(config) {
	// Private variables (closure)
	let currentStep = 0;
	let tourData = null;

	// Private functions
	function showStep(index) {
		/* ... */
	}

	// Public API
	return {
		start() {
			showStep(0);
		},
		next() {
			showStep(currentStep + 1);
		},
	};
}
```

### 4. **Tree Shaking**

Easier for bundlers to eliminate unused code

### 5. **Testing**

Simpler to mock and test pure functions

---

## How intro.js Does It

Intro.js uses a similar pattern:

```javascript
// intro.js style
introJs()
  .setOptions({ steps: [...] })
  .start();

// Our style (similar but simpler)
tourify({ tourId: 'demo' })
  .start();
```

---

## Public API Methods

Both APIs support these methods:

| Method          | Description            | Returns           |
| --------------- | ---------------------- | ----------------- |
| `start()`       | Start the tour         | `api` (chainable) |
| `next()`        | Go to next step        | `api` (chainable) |
| `previous()`    | Go to previous step    | `api` (chainable) |
| `skip()`        | Skip the entire tour   | `api` (chainable) |
| `exit()`        | Alias for `skip()`     | `api` (chainable) |
| `goToStep(n)`   | Jump to specific step  | `api` (chainable) |
| `currentStep()` | Get current step index | `number`          |
| `destroy()`     | Clean up and remove    | `void`            |

---

## Usage Examples

### Basic Usage

```javascript
// Simplest usage
tourify({ tourId: 'welcome-tour', autoStart: true });
```

### With Callbacks

```javascript
tourify({
	tourId: 'my-tour',
	showAvatar: true,
	onStart: () => console.log('Started!'),
	onComplete: () => console.log('Done!'),
	onStepChange: (step) => console.log('Step:', step.title),
}).start();
```

### Manual Control

```javascript
const tour = tourify({ tourId: 'manual-tour' });

// Start when user clicks a button
document.querySelector('#btn').onclick = () => tour.start();

// Navigate programmatically
tour.goToStep(2);
tour.next();
tour.previous();

// Clean up
tour.destroy();
```

### Method Chaining

```javascript
tourify({ tourId: 'chain-demo' })
	.start() // Start tour
	.next() // Go to step 2
	.next() // Go to step 3
	.goToStep(0); // Back to step 1
```

---

## Global Availability

Both patterns are available globally:

```html
<script src="tourify.umd.js"></script>
<script>
	// Functional
	window.tourify({ tourId: 'demo' }).start();

	// Class
	new window.Tourify({ tourId: 'demo' }).start();
</script>
```

---

## Implementation Details

### Closure-based State

```typescript
function tourify(config: TourConfig) {
	// Private state (closure scope)
	let tourData: TourData | null = null;
	let currentStepIndex = 0;
	let sessionId = generateSessionId();

	// Private functions
	function showStep(index: number) {
		/* ... */
	}
	function createCard(step: TourStep) {
		/* ... */
	}

	// Public API
	return {
		start: async () => {
			/* ... */ return api;
		},
		next: () => {
			/* ... */ return api;
		},
		// ... more methods
	};
}
```

### Class Wrapper (Backwards Compatibility)

```typescript
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
	// ... delegate to functional API
}
```

---

## Migration Guide

If you have existing code using the class API, **no changes needed!** But if you want to modernize:

### Before

```javascript
const tour = new Tourify({ tourId: 'my-tour' });
tour.start();
```

### After

```javascript
// Just remove 'new'
const tour = tourify({ tourId: 'my-tour' });
tour.start();

// Or inline
tourify({ tourId: 'my-tour', autoStart: true });
```

---

## Why Both Are Supported

1. **Backwards Compatibility** - Existing integrations don't break
2. **Developer Choice** - Use what feels comfortable
3. **Gradual Migration** - Update code at your own pace
4. **Flexibility** - Different projects have different patterns

---

## Recommended Approach

For new projects, use the **functional pattern**:

```javascript
tourify({
	tourId: 'my-tour',
	showAvatar: true,
	autoStart: true,
	onComplete: () => alert('Done!'),
});
```

**Why?**

- Simpler
- More flexible
- Better tree-shaking
- Matches modern library patterns (intro.js, shepherd.js)
- Method chaining support

---

## Testing Both APIs

Try both in the demo:

```javascript
// Functional
tourify({ tourId: 'demo', autoStart: true });

// Class (works identically)
new Tourify({ tourId: 'demo', autoStart: true });
```

Both produce the exact same result! 🎉
