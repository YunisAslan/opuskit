---
name: responsive-design
description: "Adapts the Lowfield Nights — Cinematic Editorial Event Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- Type: display scales with clamp() — clamp(3rem, 8vw, 7rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Whole-page scroll video:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Schedule:** Days stack, times stay left
- **Home — Team:** 2-column grid
- **Home — Location:** Stack; tap-to-call and tap-to-map
- **Home — FAQ:** Full width
- **Home — Reservation:** Full-width form, large touch targets
- **RSVP — Reservation:** Full-width form, large touch targets
- **RSVP — Location:** Stack; tap-to-call and tap-to-map
- **RSVP — FAQ:** Full width
- **Venue & travel — Location:** Stack; tap-to-call and tap-to-map
- **Venue & travel — Gallery:** Two-column or single swipeable row
- **Venue & travel — FAQ:** Full width
- **FAQ — FAQ:** Full width
- **FAQ — Closing CTA:** Large tap target
- **Footer — Big name:** Mobile: links wrap in two columns; the wordmark still spans the full width.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
