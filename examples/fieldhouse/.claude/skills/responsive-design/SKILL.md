---
name: responsive-design
description: "Adapts the Fieldhouse — Refined Modern Heritage Studio Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- Type: display scales with clamp() — clamp(3.25rem, 9vw, 8rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, 32px side padding (mobile 20px).
- Media: 3:4 portrait, 4:5, occasional full-width 21:9. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Side index:** Mobile: collapses to a top bar with a menu button.
- **Home — Hero — Full-bleed photo with depth:** Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- **Home — Featured Work:** Single column, images first
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Closing CTA:** Large tap target
- **Work — Featured Work:** Single column, images first
- **Work — Gallery:** Two-column or single swipeable row
- **Project — Case Study Preview:** Stack facts under media
- **Project — Gallery:** Two-column or single swipeable row
- **Project — Specs:** The table keeps two columns; the grid drops to two cells per row
- **Project — Featured Work:** Single column, images first
- **About — About:** Portrait above text
- **About — Process:** Vertical list
- **About — Team:** 2-column grid
- **Contact — Closing CTA:** Large tap target
- **Contact — Location:** Stack; tap-to-call and tap-to-map
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
