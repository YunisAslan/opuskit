---
name: responsive-design
description: "Adapts the Maison Vey — Refined Luxury Editorial Store layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: product first, text beneath, CTA sticky at bottom.
- Type: display scales with clamp() — clamp(3.25rem, 9vw, 8rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, 32px side padding (mobile 20px).
- Media: 3:4 portrait, 4:5, occasional full-width 21:9. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Product stage:** Mobile: product first, text beneath, CTA sticky at bottom.
- **Home — Product Grid:** 2 columns on mobile
- **Home — Collection:** Portrait crop, title over lower third
- **Home — Editorial Story:** Single column, pull quote full width
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Trust Strip:** 2-column grid, then one column
- **Home — Newsletter:** Field and button stack, full width
- **Shop — Product Grid:** 2 columns on mobile
- **Shop — Product Highlight:** Media then detail list
- **Shop — Collection:** Portrait crop, title over lower third
- **Shop — FAQ:** Full width
- **Product — Product buy box:** Pictures first as a swipeable row or stack, then the buy column; the button stays full width
- **Product — Product Highlight:** Media then detail list
- **Product — Testimonials:** Quotes stack; the lead quote stays large
- **Product — FAQ:** Full width
- **Product — Product Grid:** 2 columns on mobile
- **Cart — Product Grid:** 2 columns on mobile
- **About — About:** Portrait above text
- **About — Process:** Vertical list
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
