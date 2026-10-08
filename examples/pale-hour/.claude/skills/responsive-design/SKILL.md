---
name: responsive-design
description: "Adapts the Pale Hour — Atelier Art Editorial Event Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- Type: display scales with clamp() — clamp(3rem, 8.5vw, 8rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, side gutter clamp(20px, 3vw, 44px) (--container, --gutter).
- Media: 3:2 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Full-bleed photo with depth:** Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Featured Work:** Single column, images first
- **Home — Schedule:** Days stack, times stay left
- **Home — Journal:** List view
- **Exhibitions — Featured Work:** Single column, images first
- **Exhibitions — Gallery:** Two-column or single swipeable row
- **Visit — Location:** Stack; tap-to-call and tap-to-map
- **Visit — Schedule:** Days stack, times stay left
- **Visit — FAQ:** Full width
- **About — About:** Portrait above text
- **About — Team:** 2-column grid
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
