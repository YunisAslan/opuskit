---
name: responsive-design
description: "Adapts the Velmira — Ethereal Hotel Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.
- Type: display scales with clamp() — clamp(3rem, 8.5vw, 7.75rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Ambient video hero:** Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Collection:** Portrait crop, title over lower third
- **Home — Feature Rows:** Stack each row, media first
- **Home — Journal:** List view
- **Home — Reservation:** Full-width form, large touch targets
- **Rooms — Collection:** Portrait crop, title over lower third
- **Rooms — Lookbook:** Vertical stack, one look per screen
- **Rooms — Reservation:** Full-width form, large touch targets
- **Gallery — Gallery:** Two-column or single swipeable row
- **Book a stay — Reservation:** Full-width form, large touch targets
- **Book a stay — Location:** Stack; tap-to-call and tap-to-map
- **Book a stay — FAQ:** Full width
- **Getting here — Location:** Stack; tap-to-call and tap-to-map
- **Getting here — FAQ:** Full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
