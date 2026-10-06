---
name: responsive-design
description: "Adapts the yunisaslanov — Warm Scrapbook Portfolio layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- Type: display scales with clamp() — clamp(2.5rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 24 columns (fine-grained for off-grid placement); 1vw.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Elements span unusual widths (5, 7, 11); overlaps allowed. Container: Full width, free positioning within a 24-column underlying grid.
- Media: Free, including circles, arches and extreme crops. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — Typographic statement:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- **Home — Featured Work:** Single column, images first
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Newsletter:** Field and button stack, full width
- **About — Editorial Story:** Single column, pull quote full width
- **Projects — Gallery:** Two-column or single swipeable row
- **Contact — Closing CTA:** Large tap target
- **Footer — One quiet line:** Mobile: logo, links and copyright centred on three short lines.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
