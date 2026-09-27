---
name: responsive-design
description: "Adapts the Future Art Direction Experiment layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- Type: display scales with clamp() — clamp(3rem, 9vw, 9rem); re-break headlines manually on mobile.
- Grid: 24 columns (fine-grained for off-grid placement); 1vw.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Elements span unusual widths (5, 7, 11); overlaps allowed. Container: Full width, free positioning within a 24-column underlying grid.
- Media: Free, including circles, arches and extreme crops. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navbar:** Mobile: logo + menu button; full-screen menu with large links
- **Home — Hero — 3D / WebGL scene:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- **Home — Manifesto:** Re-break lines for mobile
- **Experiment — Gallery:** Two-column or single swipeable row
- **Experiment — Editorial Story:** Single column, pull quote full width
- **About — About:** Portrait above text
- **Contact — Closing CTA:** Large tap target
- **FAQ — FAQ:** Full width
- **Footer:** Stacked columns

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
