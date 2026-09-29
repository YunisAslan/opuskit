---
name: responsive-design
description: "Adapts the KOFİİ — Scandinavian Minimal Restaurant Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- Type: display scales with clamp() — clamp(3rem, 9vw, 8.5rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — Whole-page scroll video:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Menu — Menu:** Single column, prices aligned right
- **Reservations — Reservation:** Full-width form, large touch targets
- **Reservations — Location:** Stack; tap-to-call and tap-to-map
- **About — About:** Portrait above text
- **Gallery — Gallery:** Two-column or single swipeable row
- **Contact — Closing CTA:** Large tap target
- **FAQ — FAQ:** Full width
- **Footer:** Stacked columns

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
