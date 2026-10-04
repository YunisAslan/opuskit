---
name: responsive-design
description: "Adapts the Aster House — Architectural Minimal Property Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(2.75rem, 6vw, 5.5rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Scroll-controlled video:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Feature Rows:** Stack each row, media first
- **Home — Product Grid:** 2 columns on mobile
- **Home — Gallery:** Two-column or single swipeable row
- **Home — Location:** Stack; tap-to-call and tap-to-map
- **Home — Closing CTA:** Large tap target
- **Residences — Product Grid:** 2 columns on mobile
- **Residences — Features:** Single column
- **Residences — FAQ:** Full width
- **A house — Product Highlight:** Media then detail list
- **A house — Gallery:** Two-column or single swipeable row
- **A house — Feature Rows:** Stack each row, media first
- **A house — Closing CTA:** Large tap target
- **Book a viewing — Closing CTA:** Large tap target
- **Book a viewing — Location:** Stack; tap-to-call and tap-to-map
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
