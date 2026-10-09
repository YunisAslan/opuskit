---
name: responsive-design
description: "Adapts the Ninth Row — Nocturne Film-inspired Event Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(4rem, 13vw, 12.5rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #040404 (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: max-width 1200px, side gutter clamp(20px, 4vw, 40px) (--container, --gutter).
- Media: 16:9 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Scroll-controlled video:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Schedule:** Days stack, times stay left
- **Home — Featured Work:** Single column, images first
- **Home — Newsletter:** Field and button stack, full width
- **Programme — Schedule:** Days stack, times stay left
- **Programme — Featured Work:** Single column, images first
- **Tickets — Reservation:** Full-width form, large touch targets
- **Tickets — Pricing:** Stacked plans, recommended first
- **Tickets — FAQ:** Full width
- **Visit — Location:** Stack; tap-to-call and tap-to-map
- **Visit — FAQ:** Full width
- **About — About:** Portrait above text
- **About — Team:** 2-column grid
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
