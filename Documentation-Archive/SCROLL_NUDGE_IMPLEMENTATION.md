# Scroll Nudge Bar Implementation

## Design Specification

Add thin teal divider bars between major sections on the results page to encourage users to scroll and explore all content.

### Visual Design
- **Background color:** `#86cac4` (matches sticky header)
- **Height:** 20px
- **Text:** White, 10px, uppercase, 70% opacity, letter-spacing: 0.08em
- **Arrows:** White down arrows (filled triangles), 13×13px, 70% opacity
- **Shadow:** `0 1px 3px rgba(0,0,0,0.04)`
- **Layout:** Flexbox, centered, 12px gap between elements

### Text Content
1. **First bar** (between profile summary and chart): "COMPARE YOUR FIT ACROSS 5 SCHOOL TYPES"
2. **Second bar** (between chart and fit analysis): "SEE YOUR FIT ANALYSIS FOR EACH TYPE"

### Arrow SVG
```jsx
<svg width="13" height="13" fill="white" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
  <path d="M12 16l6-6H6z" />
</svg>
```

## Implementation Instructions

Update `/app/results/page.tsx`:

1. Add the first scroll nudge bar after the profile summary card (after the closing `</div>` of the "Where You Stand" card)

2. Add the second scroll nudge bar after the chart card (after the closing `</div>` of the radar chart card, before the fit analysis card)

### Code Template
```tsx
{/* Scroll nudge bar */}
<div 
  className="animate-fadeUp" 
  style={{ 
    animationDelay: '[APPROPRIATE_DELAY]s',
    backgroundColor: '#86cac4', 
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  }}
>
  <svg width="13" height="13" fill="white" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
    <path d="M12 16l6-6H6z" />
  </svg>
  
  <p style={{ 
    color: 'white', 
    fontSize: '10px', 
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: 0,
    lineHeight: 1,
    opacity: 0.7
  }}>
    [TEXT_HERE]
  </p>
  
  <svg width="13" height="13" fill="white" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
    <path d="M12 16l6-6H6z" />
  </svg>
</div>
```

## Animation Delays
Match existing card animation pattern:
- First bar: `0.11s` (between profile summary at 0.1s and chart at 0.12s)
- Second bar: `0.14s` (between chart at 0.12s and fit analysis at 0.16s)

## Testing
1. Verify bars appear between correct sections
2. Check animation timing flows naturally
3. Test on mobile (ensure text doesn't wrap)
4. Verify shadow renders correctly
5. Confirm arrow opacity and color match spec
