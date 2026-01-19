# Polish Specification: Results Page

## Overview

This spec brings the results page from "functional and clean" to "Apple-level refined." The goal is subtle atmospheric depth, typographic precision, and micro-interactions that make the interface feel alive—without sacrificing the minimalist foundation already established.

Reference aesthetic: warm, layered, confident restraint. Think late-era Apple product pages meets premium editorial design.

---

## 1. Background & Atmosphere

### Current State
- Flat white (`#ffffff`) background
- No depth or atmospheric layering

### Target State
Add a subtle warm gradient and very faint texture to create depth without distraction.

**In `globals.css`, add:**

```css
.bg-atmosphere {
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 247, 244, 0.8), transparent),
    linear-gradient(180deg, #fefefe 0%, #fafaf8 50%, #f7f7f5 100%);
  min-height: 100vh;
}
```

**In `app/results/page.tsx`:**
Change `<main className="min-h-screen bg-white">` to `<main className="bg-atmosphere">`

---

## 2. Chart Container Refinement

### Current State
```tsx
<div className="bg-[#f8f8f8] rounded-xl p-8">
```
Flat gray box, no elevation or border definition.

### Target State
Subtle elevation with soft shadow and refined border.

**Replace with:**
```tsx
<div className="bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] rounded-2xl p-8 border border-[#e8e8e8]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
```

---

## 3. Radar Chart Polish

### Current State in `RadarChart.tsx`
- Grid lines at `rgba(0, 0, 0, 0.06)` — slightly harsh
- Tick labels visible but competing with data
- Point radius may be too prominent

### Target Changes

**Grid and angle lines — softer:**
```ts
grid: {
  color: 'rgba(0, 0, 0, 0.04)', // was 0.06
  circular: true,
},
angleLines: {
  color: 'rgba(0, 0, 0, 0.04)', // was 0.06
},
```

**Tick labels — more recessive:**
```ts
ticks: {
  stepSize: 20,
  color: 'rgba(134, 134, 139, 0.35)', // was 0.4, and using the gray from design system
  backdropColor: 'transparent',
  font: {
    size: 10, // was 11
    family: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  display: true,
},
```

**Point labels — refined:**
```ts
pointLabels: {
  color: 'rgba(134, 134, 139, 0.75)', // slightly more muted than current
  font: {
    size: 11, // was 12
    weight: '450' as const, // subtle medium weight
    family: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  padding: 16, // was 14, more breathing room
},
```

**Dataset styling — softer fills with slight gradient effect:**

For the Cohort (blue) dataset:
```ts
backgroundColor: 'rgba(96, 165, 250, 0.12)', // was 0.15
borderWidth: 2, // was 2.5
pointRadius: 4, // was 5
pointBorderWidth: 1.5, // was 2
```

For the You (pink) dataset:
```ts
backgroundColor: 'rgba(244, 114, 182, 0.10)', // was 0.12
borderWidth: 2, // was 2.5
pointRadius: 4, // was 5
pointBorderWidth: 1.5, // was 2
```

---

## 4. Legend Refinement

### Current State
```tsx
<div className="flex items-center justify-center gap-6 mt-6">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-[rgba(236,72,153,0.8)]"></div>
    <span className="text-[13px] text-[#86868b]">You</span>
  </div>
  ...
</div>
```

### Target State
More refined spacing and slightly smaller dots.

```tsx
<div className="flex items-center justify-center gap-8 mt-8 pt-4 border-t border-[#e8e8e8]/40">
  <div className="flex items-center gap-2.5">
    <div className="w-2.5 h-2.5 rounded-full bg-[rgba(236,72,153,0.75)]"></div>
    <span className="text-[12px] text-[#86868b] tracking-wide">You</span>
  </div>
  <div className="flex items-center gap-2.5">
    <div className="w-2.5 h-2.5 rounded-full bg-[rgba(96,165,250,0.75)]"></div>
    <span className="text-[12px] text-[#86868b] tracking-wide">Cohort</span>
  </div>
</div>
```

---

## 5. Sidebar Refinement

### Current State
The sidebar buttons work but lack polish on transitions and the selected state could be more refined.

### Target Changes

**In `app/results/page.tsx`, update the sidebar button styles:**

```tsx
<button
  key={cohort.name}
  onClick={() => setSelectedCohort(cohort.name)}
  className={`
    w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ease-out
    ${selectedCohort === cohort.name
      ? 'bg-[#1d1d1f] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
      : 'bg-transparent text-[#1d1d1f] hover:bg-[#f5f5f7]'
    }
  `}
>
  <div className="flex items-center gap-3">
    <span className={`
      text-[13px] font-medium tabular-nums
      ${selectedCohort === cohort.name ? 'opacity-50' : 'opacity-30'}
    `}>
      {index + 1}
    </span>
    <div className={`
      text-[15px] transition-all duration-300
      ${selectedCohort === cohort.name ? 'font-medium' : 'font-normal'}
    `}>
      {cohort.name}
    </div>
  </div>
</button>
```

Key changes:
- Remove background from unselected state (cleaner)
- Add subtle shadow to selected state
- Smoother transition timing (300ms with ease-out)
- Slightly more padding (py-3.5)
- Font weight animates on selection

---

## 6. Typography Adjustments

### Fit Analysis Paragraph

**Current:**
```tsx
<p className="type-body" style={{ maxWidth: '54ch' }}>
```

**Target:**
```tsx
<p className="type-body leading-relaxed" style={{ maxWidth: '58ch' }}>
```

Also, in `globals.css`, add a slight tweak to `.type-body`:

```css
.type-body {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.003em;
  line-height: 1.58; /* was 1.5 — slightly more generous */
  color: #515154; /* was #424245 — slightly lighter for less heaviness */
}
```

---

## 7. Button Polish

### Primary Button (View example schools)

**Current:**
```tsx
className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[15px] font-normal transition-colors inline-flex items-center gap-1.5"
```

**Target:**
```tsx
className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] text-white text-[15px] font-normal transition-all duration-200 inline-flex items-center gap-2 shadow-[0_1px_3px_rgba(0,113,227,0.3)] hover:shadow-[0_3px_8px_rgba(0,113,227,0.25)] hover:-translate-y-px"
```

Key changes:
- Slightly more padding
- Subtle blue-tinted shadow
- Hover lifts slightly (-translate-y-px)
- Active state for click feedback

### Secondary Button (Start Over)

**Current:**
```tsx
className="text-[#86868b] hover:text-[#1d1d1f] text-[15px] font-normal transition-colors"
```

**Target:**
```tsx
className="text-[#86868b] hover:text-[#1d1d1f] text-[15px] font-normal transition-all duration-200 hover:-translate-y-px flex items-center gap-1.5"
```

And add an arrow icon:
```tsx
<button
  onClick={() => router.push('/')}
  className="text-[#86868b] hover:text-[#1d1d1f] text-[15px] font-normal transition-all duration-200 hover:-translate-y-px flex items-center gap-1.5"
>
  <span>Start Over</span>
  <svg className="w-3.5 h-3.5 rotate-180 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>
```

---

## 8. Animation Timing Refinement

### Current State
Animation delays are set but could be more considered.

### Target Changes

In the results page, adjust the `animationDelay` values for a more orchestrated reveal:

```tsx
// Header section
style={{ animationDelay: '0s' }}

// Sidebar  
style={{ animationDelay: '0.08s' }}

// Chart
style={{ animationDelay: '0.16s' }}

// Fit analysis text
style={{ animationDelay: '0.24s' }}

// Schools section
style={{ animationDelay: '0.32s' }}

// Action buttons
style={{ animationDelay: '0.4s' }}

// Footer
style={{ animationDelay: '0.56s' }}
```

Also in `globals.css`, refine the animation curves:

```css
.slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; /* more expressive ease */
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px); /* was 12px — slightly more travel */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; /* was 0.5s ease-out */
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px); /* was 8px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 9. Content Transition on Cohort Change

### Current State
When selecting a different cohort, content just swaps instantly.

### Target State
Add a subtle fade transition when cohort changes.

**In `app/results/page.tsx`, add state for transition:**

```tsx
const [isTransitioning, setIsTransitioning] = useState(false);

const handleCohortChange = (cohortName: string) => {
  if (cohortName === selectedCohort) return;
  setIsTransitioning(true);
  setTimeout(() => {
    setSelectedCohort(cohortName);
    setIsTransitioning(false);
  }, 150);
};
```

**Update the cohort buttons to use this handler:**
```tsx
onClick={() => handleCohortChange(cohort.name)}
```

**Wrap the chart and analysis sections with transition classes:**
```tsx
<div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
  {/* Chart section */}
  {/* Fit analysis section */}
</div>
```

---

## 10. Hover State for Sidebar Items

Add a subtle indicator that appears on hover for unselected items.

**In `globals.css`, add:**

```css
.sidebar-item {
  position: relative;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: #d1d1d6;
  border-radius: 2px;
  transition: height 0.2s ease;
}

.sidebar-item:hover::before {
  height: 20px;
}

.sidebar-item.active::before {
  height: 24px;
  background: #0071e3;
}
```

Then add `sidebar-item` class to the buttons, and `active` when selected.

---

## Summary of Files to Modify

1. **`app/globals.css`**
   - Add `.bg-atmosphere` class
   - Refine `.type-body` line-height and color
   - Refine animation timing curves
   - Add `.sidebar-item` hover states

2. **`app/results/page.tsx`**
   - Apply `bg-atmosphere` to main
   - Update chart container classes
   - Update sidebar button styles
   - Update button styles
   - Add cohort transition state
   - Refine animation delays

3. **`components/RadarChart.tsx`**
   - Soften grid/angle line opacity
   - Reduce tick label prominence
   - Refine point label styling
   - Adjust dataset border widths and point sizes

---

## Design Principles to Maintain

1. **Restraint over decoration** — Every shadow, every gradient should earn its place
2. **Warmth over coldness** — Slight warm tints in grays and backgrounds
3. **Motion with purpose** — Animations should guide attention, not distract
4. **Typographic hierarchy through size and color, not weight** — Already established, maintain it
5. **Invisible grid** — Everything should feel aligned even if the user can't articulate why

---

## Part 2: Landing Page Polish

### Overview

The landing page needs the same atmospheric treatment as the results page, plus specific refinements to make the form feel like a considered experience rather than a checklist.

---

## 11. Apply Atmosphere to Landing Page

### Current State in `app/page.tsx`
```tsx
<main className="min-h-screen bg-white">
```

### Target State
```tsx
<main className="bg-atmosphere">
```

---

## 12. Form Container

### Current State
The form floats in open space with no visual containment.

### Target State
Wrap the form in a subtle card that provides grounding without heaviness.

**In `app/page.tsx`, wrap the QuestionnaireForm:**

```tsx
{/* Questionnaire Form */}
<div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8e8e8]/50 p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
  <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
</div>
```

---

## 13. Header Hierarchy Refinement

### Current State
"Find your medical school fit in 60 seconds" uses `type-body-lg` which makes it compete with the subtext below.

### Target State
Create clearer cascade: Title → Tagline → Description

**In `app/page.tsx`, update the header:**

```tsx
<header className="text-center mb-14">
  <div className="inline-flex items-center gap-1.5 mb-6">
    <div className="w-[5px] h-[5px] rounded-full bg-emerald-500"></div>
    <span className="type-label">Free Assessment</span>
  </div>

  <h1 className="type-display mb-5">
    Smarter Pre-Med
  </h1>

  <p className="text-[1.25rem] text-[#1d1d1f] font-normal tracking-tight mb-4" style={{ maxWidth: '28ch', margin: '0 auto 1rem' }}>
    Find your medical school fit in 60 seconds
  </p>

  <p className="type-secondary mx-auto leading-relaxed" style={{ maxWidth: '40ch' }}>
    Answer a few questions about your journey, and we'll show you where you stand across 6 key competencies.
  </p>
</header>
```

Key changes:
- Tagline is larger (1.25rem) and uses primary text color
- Tighter max-width on tagline for better line breaks
- More spacing between header and form (mb-14)
- Description max-width reduced for better measure

---

## 14. Form Question Spacing

### Current State in `QuestionnaireForm.tsx`
```tsx
<div className="space-y-6">
```
Too tight—questions feel cramped.

### Target State
```tsx
<div className="space-y-8">
```

---

## 15. Form Input Styling

### Current State
```tsx
className={`w-full px-3.5 py-2.5 rounded-lg bg-[#f5f5f7] border-0 text-[15px] ...`}
```
Inputs are functional but lack refinement.

### Target State
More padding, subtle border, refined focus state.

**For select elements:**
```tsx
className={`w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-[#e5e5e5]/80 text-[15px] ${
  errors[question.id]
    ? 'ring-2 ring-red-200 border-red-300'
    : 'hover:border-[#d1d1d6] focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20'
} text-[#1d1d1f] transition-all duration-200 focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2386868b%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat`}
```

**For textarea:**
```tsx
className={`w-full px-4 py-3 rounded-xl bg-[#fafafa] border border-[#e5e5e5]/80 text-[15px] ${
  errors[question.id]
    ? 'ring-2 ring-red-200 border-red-300'
    : 'hover:border-[#d1d1d6] focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20'
} text-[#1d1d1f] transition-all duration-200 focus:outline-none resize-none placeholder:text-[#a1a1a6]`}
```

Key changes:
- Larger padding (py-3, px-4)
- Rounded-xl instead of rounded-lg
- Visible border that responds to hover
- Subtle ring on focus (not just border)
- Custom chevron icon for selects
- Slightly warmer placeholder color

---

## 16. Question Label Styling

### Current State
```tsx
className="block text-[15px] text-[#1d1d1f] mb-2"
```

### Target State
```tsx
className="block text-[15px] text-[#1d1d1f] font-medium mb-2.5"
```

Subtle but adds clarity to the hierarchy.

---

## 17. Submit Button Polish

### Current State
```tsx
className={`group w-full py-3 px-6 rounded-full text-[15px] transition-all ${
  isSubmitting
    ? 'bg-[#e8e8ed] cursor-not-allowed text-[#86868b]'
    : 'bg-[#0071e3] hover:bg-[#0077ed] text-white'
}`}
```

### Target State
Match the refined button style from the results page.

```tsx
className={`group w-full py-3.5 px-6 rounded-full text-[15px] font-medium transition-all duration-200 ${
  isSubmitting
    ? 'bg-[#e8e8ed] cursor-not-allowed text-[#86868b]'
    : 'bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] text-white shadow-[0_2px_8px_rgba(0,113,227,0.35)] hover:shadow-[0_4px_12px_rgba(0,113,227,0.3)] hover:-translate-y-px active:translate-y-0'
}`}
```

Key changes:
- Slightly more vertical padding (py-3.5)
- Font-medium for better presence
- Blue-tinted shadow
- Hover lift effect
- Active state for tactile feedback

---

## 18. Animation Stagger for Questions

### Current State
```tsx
style={{ animationDelay: `${index * 0.03}s` }}
```
Too fast—questions appear almost simultaneously.

### Target State
```tsx
style={{ animationDelay: `${0.1 + index * 0.05}s` }}
```

Starts after a brief pause, then staggers more noticeably.

---

## 19. Footer Refinement

### Current State
```tsx
<footer className="text-center mt-12">
```

### Target State
```tsx
<footer className="text-center mt-10 pt-6 border-t border-[#e8e8e8]/40">
```

Subtle separator creates closure.

---

## Summary: Landing Page Files to Modify

1. **`app/page.tsx`**
   - Apply `bg-atmosphere`
   - Wrap form in container card
   - Refine header hierarchy and spacing
   - Update footer with border

2. **`components/QuestionnaireForm.tsx`**
   - Increase question spacing (space-y-8)
   - Update select styling with border, hover, custom chevron
   - Update textarea styling
   - Refine label styling
   - Polish submit button
   - Adjust animation stagger timing

---

## Design Consistency Notes

After these changes, both pages will share:
- The same atmospheric background
- Consistent button styling with shadows and hover lift
- Matching border/ring treatments on interactive elements
- Coordinated animation timing curves
- Unified typography hierarchy

The landing page will feel like a natural prelude to the results page, rather than two disconnected screens.
