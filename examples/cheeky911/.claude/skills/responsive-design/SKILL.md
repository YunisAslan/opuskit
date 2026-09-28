---
name: responsive-design
description: "Adapts the CHEEKY — Film-inspired Fashion House layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(3rem, 10vw, 9rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navbar:** Mobile: logo + menu button; full-screen menu with large links
- **Home — Hero — Scroll-controlled video:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Collections — Collection:** Portrait crop, title over lower third
- **Collections — Lookbook:** Vertical stack, one look per screen
- **About — About:** Portrait above text
- **About — Editorial Story:** Single column, pull quote full width
- **Contact — Closing CTA:** Large tap target
- **FAQ — FAQ:** Full width
- **Journal — Journal:** List view
- **Shop — Product Grid:** 2 columns on mobile
- **Footer:** Stacked columns

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
