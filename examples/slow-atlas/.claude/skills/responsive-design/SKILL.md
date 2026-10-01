---
name: responsive-design
description: "Adapts the Slow Atlas — News Grid Magazine layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- Type: display scales with clamp() — clamp(3rem, 8.5vw, 7.5rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Typographic statement:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- **Home — Editorial Story:** Single column, pull quote full width
- **Home — Journal:** List view
- **Home — Categories:** 2-column grid
- **Home — Newsletter:** Field and button stack, full width
- **Articles — Journal:** List view
- **About — About:** Portrait above text
- **About — Team:** 2-column grid
- **Newsletter — Newsletter:** Field and button stack, full width
- **Newsletter — Journal:** List view
- **Article — Editorial Story:** Single column, pull quote full width
- **Article — Journal:** List view
- **Article — Newsletter:** Field and button stack, full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
