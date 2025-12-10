# Widget Testing Guide

## 🚀 Quick Start

The dev server is running at: **http://localhost:5174/**

### Demo Page

Visit: **http://localhost:5174/demo/**

---

## ✅ Testing Checklist

### 1. Initial Page Load

- [ ] Page loads with black/gold theme
- [ ] See "Tourify Widget Demo" header with gold gradient
- [ ] 6 feature cards displayed in grid
- [ ] "Start Interactive Tour" button visible and styled

### 2. Widget Initialization

**Action:** Click "Start Interactive Tour" button

**Expected:**

- [ ] Dark overlay appears with blur effect
- [ ] Tour card appears with glass effect
- [ ] "Step 1 of 5" badge shows in gold
- [ ] Three.js avatar appears and animates (gold sphere rotating)
- [ ] Title and description text is readable
- [ ] Progress bar shows 20% filled

### 3. Navigation - Next Button

**Action:** Click "Next" button repeatedly

**Expected for each step:**

- [ ] Smooth transition animation
- [ ] Step badge updates (2 of 5, 3 of 5, etc.)
- [ ] Progress bar increases (40%, 60%, 80%, 100%)
- [ ] Content changes
- [ ] Avatar continues animating
- [ ] "Back" button appears after step 1

### 4. Navigation - Back Button

**Action:** Click "Back" button from step 3

**Expected:**

- [ ] Returns to step 2
- [ ] Progress bar decreases to 40%
- [ ] Step badge shows "2 of 5"

### 5. Skip Functionality

**Action:** Click "Skip Tour" button

**Expected:**

- [ ] Widget closes immediately
- [ ] Overlay disappears
- [ ] Console shows: "Tour skipped"
- [ ] Back to demo page

### 6. Resume Functionality

**Action:**

1. Start tour again
2. Navigate to step 3
3. Skip the tour
4. Start tour again

**Expected:**

- [ ] Tour resumes from step 3 (not step 1)
- [ ] Progress bar shows 60%
- [ ] Console shows saved progress

### 7. Complete Tour

**Action:** Navigate to step 5 and click "Complete"

**Expected:**

- [ ] Alert shows: "🎉 Tour completed! Thanks for trying Tourify!"
- [ ] Widget closes
- [ ] Overlay disappears
- [ ] Console shows: "Tour completed!"

### 8. Analytics Events

**Action:** Open browser DevTools Console before starting

**Expected console logs:**

- [ ] `Tour started!` when clicked start
- [ ] `Tourify Analytics: { event_type: 'tour_started' }`
- [ ] `Tourify Analytics: { event_type: 'step_viewed' }` for each step
- [ ] `Tourify Analytics: { event_type: 'step_completed' }` when clicking next
- [ ] `Tourify Analytics: { event_type: 'tour_completed' }` when finishing

### 9. Mobile Responsiveness

**Action:** Resize browser to mobile width (< 640px) or use DevTools mobile emulation

**Expected:**

- [ ] Widget card takes full width minus margins
- [ ] Buttons stack vertically
- [ ] Text remains readable
- [ ] Avatar still visible and responsive
- [ ] All interactions still work

### 10. Visual Quality

**Check these visual details:**

- [ ] Gold color matches #eabe7b
- [ ] Card has subtle glow effect
- [ ] Progress bar has gold gradient
- [ ] Buttons have hover effects
- [ ] Smooth animations (no jank)
- [ ] Text is crisp and readable
- [ ] Avatar rotates smoothly

---

## 🐛 Common Issues to Check

### If widget doesn't appear:

1. Open browser console - look for errors
2. Check if `tourify.es.js` loaded successfully
3. Verify the build was successful

### If avatar doesn't show:

1. Check browser console for WebGL errors
2. Three.js requires WebGL support
3. Try in different browser (Chrome recommended)

### If styles look wrong:

1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear browser cache
3. Check if CSS was injected (look for `#tourify-styles` in DOM)

---

## 📊 Expected Analytics Flow

For a complete tour run:

```
1. tour_started
2. step_viewed (step 1)
3. step_completed (step 1)
4. step_viewed (step 2)
5. step_completed (step 2)
6. step_viewed (step 3)
7. step_completed (step 3)
8. step_viewed (step 4)
9. step_completed (step 4)
10. step_viewed (step 5)
11. step_completed (step 5)
12. tour_completed
```

Each event should include:

- `tour_id`: "demo"
- `session_id`: "tourify-[timestamp]-[random]"
- `device_type`: "desktop", "tablet", or "mobile"
- `timestamp`: ISO date string

---

## 🎯 Next Tests

After verifying the demo works:

### Test 1: External Embed

Create a test HTML file anywhere:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Test Embed</title>
	</head>
	<body>
		<h1>My Website</h1>
		<button id="start">Start Tour</button>

		<script src="http://localhost:5174/dist/tourify.umd.js"></script>
		<script>
			document.getElementById('start').onclick = () => {
				new Tourify({ tourId: 'demo', autoStart: true });
			};
		</script>
	</body>
</html>
```

### Test 2: API Integration

Once your Next.js app is running, test with real tour data:

```javascript
new Tourify({
	tourId: 'YOUR_TOUR_ID_FROM_DATABASE',
	apiUrl: 'http://localhost:3000',
	autoStart: true,
});
```

---

## ✅ Success Criteria

All features are working if:

1. ✅ All 10 checklist items pass
2. ✅ No console errors
3. ✅ Smooth animations throughout
4. ✅ Analytics events log correctly
5. ✅ Mobile responsive works
6. ✅ Resume functionality persists across page refreshes

---

## 📸 Screenshots to Capture

Capture these for documentation:

1. Initial demo page
2. Widget on step 1 (with avatar)
3. Widget on step 5 (showing progress at 100%)
4. Mobile view of widget
5. Console showing analytics events
