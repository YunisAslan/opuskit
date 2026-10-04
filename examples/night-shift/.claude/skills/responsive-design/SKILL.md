---
name: responsive-design
description: "Adapts the Night Shift — Technical Minimal Course Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- Type: display scales with clamp() — clamp(2.5rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating dock:** Mobile: a fixed bottom tab bar with the same icons — thumb-friendly.
- **Home — Hero — 3D / WebGL scene:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Home — Case Study Preview:** Stack facts under media
- **Home — Process:** Vertical list
- **Home — About:** Portrait above text
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Pricing:** Stacked plans, recommended first
- **Home — FAQ:** Full width
- **Home — Closing CTA:** Large tap target
- **Curriculum — Features:** Single column
- **Curriculum — Process:** Vertical list
- **Curriculum — Case Study Preview:** Stack facts under media
- **Curriculum — FAQ:** Full width
- **Enrol — Pricing:** Stacked plans, recommended first
- **Enrol — FAQ:** Full width
- **Enrol — Testimonials:** Quotes stack; the lead quote stays large
- **Instructor — About:** Portrait above text
- **Instructor — Stats:** 2 × 2 grid
- **Instructor — Testimonials:** Quotes stack; the lead quote stays large
- **FAQ — FAQ:** Full width
- **FAQ — Closing CTA:** Large tap target
- **Footer — Say hello:** Mobile: invitation, contact links, details and the links row stacked.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
