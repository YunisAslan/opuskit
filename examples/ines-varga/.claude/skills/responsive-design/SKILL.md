---
name: responsive-design
description: "Adapts the Ines Varga — Raw Conceptual Sketch Portfolio layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: a portrait version of the illustration or a cropped detail.
- Type: display scales with clamp() — clamp(3rem, 9vw, 7.5rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #DAD8DB (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: max-width none (full width), side gutter clamp(16px, 2vw, 24px) (--container, --gutter).
- Media: 4:3 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Full-screen menu:** Same on every screen — it is already touch-first.
- **Home — Hero — Illustrated hero:** Mobile: a portrait version of the illustration or a cropped detail.
- **Home — Featured Work:** Single column, images first
- **Home — Closing CTA:** Large tap target
- **Selected Work — Featured Work:** Single column, images first
- **Selected Work — Clients:** 2-column grid
- **Project — Case Study Preview:** Stack facts under media
- **Project — Gallery:** Two-column or single swipeable row
- **Project — Specs:** The table keeps two columns; the grid drops to two cells per row
- **Project — Featured Work:** Single column, images first
- **About — About:** Portrait above text
- **About — Testimonials:** Quotes stack; the lead quote stays large
- **About — Timeline:** Heading above, steps stacked along the line
- **Contact — Closing CTA:** Large tap target
- **Contact — FAQ:** Full width
- **Footer — Say hello:** Mobile: invitation, contact links, details and the links row stacked.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
