---
name: responsive-design
description: "Adapts the QUM — Warm Scandinavian Minimal Store layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- Type: display scales with clamp() — clamp(3rem, 7.5vw, 6.75rem); re-break headlines manually on mobile.
- Grid: 12 columns; 24px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Text in 6–8 central columns; media spans 10–12. Container: max-width 1200px, centred, 24px side padding (mobile 20px).
- Media: 16:9 wide, 4:5 portrait, 1:1 detail. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Editorial image hero:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Product Grid:** 2 columns on mobile
- **Home — Editorial Story:** Single column, pull quote full width
- **Home — Process:** Vertical list
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Press:** Quotes stack
- **Home — Journal:** List view
- **Home — Newsletter:** Field and button stack, full width
- **Shop — Categories:** 2-column grid
- **Shop — Product Grid:** 2 columns on mobile
- **Shop — Trust Strip:** 2-column grid, then one column
- **Product — Product buy box:** Pictures first as a swipeable row or stack, then the buy column; the button stays full width
- **Product — Specs:** The table keeps two columns; the grid drops to two cells per row
- **Product — Process:** Vertical list
- **Product — Testimonials:** Quotes stack; the lead quote stays large
- **Product — FAQ:** Full width
- **Product — Product Grid:** 2 columns on mobile
- **Cart — Product Grid:** 2 columns on mobile
- **The salt — About:** Portrait above text
- **The salt — Editorial Story:** Single column, pull quote full width
- **The salt — Timeline:** Heading above, steps stacked along the line
- **The salt — Location:** Stack; tap-to-call and tap-to-map
- **Journal — Journal:** List view
- **Journal — Newsletter:** Field and button stack, full width
- **Article — Article:** One column; break-outs return to the column width
- **Article — Journal:** List view
- **Article — Newsletter:** Field and button stack, full width
- **Help — FAQ:** Full width
- **Footer — Everything, listed:** Mobile: two columns of lists, then the legal row.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
