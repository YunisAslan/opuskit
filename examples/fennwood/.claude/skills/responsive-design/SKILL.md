---
name: responsive-design
description: "Adapts the Fennwood — Organic Modern Restaurant Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- Type: display scales with clamp() — clamp(2.75rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 12 columns; 24px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Text in 6–8 central columns; media spans 10–12. Container: max-width 1200px, centred, 24px side padding (mobile 20px).
- Media: 16:9 wide, 4:5 portrait, 1:1 detail. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Full-bleed photo with depth:** Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Menu:** Single column, prices aligned right
- **Home — Reservation:** Full-width form, large touch targets
- **Home — Location:** Stack; tap-to-call and tap-to-map
- **Menu — Menu:** Single column, prices aligned right
- **Menu — Gallery:** Two-column or single swipeable row
- **Menu — Reservation:** Full-width form, large touch targets
- **Reservations — Reservation:** Full-width form, large touch targets
- **Reservations — Location:** Stack; tap-to-call and tap-to-map
- **Reservations — FAQ:** Full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
