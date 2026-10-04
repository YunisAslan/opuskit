---
name: responsive-design
description: "Adapts the Inkwell & Moth — Scrapbook Portfolio layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: a portrait version of the illustration or a cropped detail.
- Type: display scales with clamp() — clamp(2.75rem, 8vw, 6.5rem); re-break headlines manually on mobile.
- Grid: 24 columns (fine-grained for off-grid placement); 1vw.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Elements span unusual widths (5, 7, 11); overlaps allowed. Container: Full width, free positioning within a 24-column underlying grid.
- Media: Free, including circles, arches and extreme crops. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Side index:** Mobile: collapses to a top bar with a menu button.
- **Home — Hero — Illustrated hero:** Mobile: a portrait version of the illustration or a cropped detail.
- **Home — Featured Work:** Single column, images first
- **Home — Gallery:** Two-column or single swipeable row
- **Home — Closing CTA:** Large tap target
- **Books — Featured Work:** Single column, images first
- **Books — Case Study Preview:** Stack facts under media
- **Books — Gallery:** Two-column or single swipeable row
- **Books — Clients:** 2-column grid
- **Books — Closing CTA:** Large tap target
- **About — About:** Portrait above text
- **About — Process:** Vertical list
- **About — Stats:** 2 × 2 grid
- **About — Testimonials:** Quotes stack; the lead quote stays large
- **About — Closing CTA:** Large tap target
- **Commissions — Closing CTA:** Large tap target
- **Commissions — FAQ:** Full width
- **Footer — One quiet line:** Mobile: logo, links and copyright centred on three short lines.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
