---
name: responsive-design
description: "Adapts the Raster School — Precise Swiss Modern Course Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- Type: display scales with clamp() — clamp(3rem, 9vw, 8.5rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #1F35D6 (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: max-width none (full width), side gutter clamp(16px, 2vw, 24px) (--container, --gutter).
- Media: 4:3 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — Typographic statement:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Process:** Vertical list
- **Home — Team:** 2-column grid
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Pricing:** Stacked plans, recommended first
- **Home — Schedule:** Days stack, times stay left
- **Home — FAQ:** Full width
- **Home — Closing CTA:** Large tap target
- **Curriculum — Curriculum:** Each module stacks: label, title, lessons, outcome
- **Curriculum — Process:** Vertical list
- **Curriculum — FAQ:** Full width
- **Enrol — Pricing:** Stacked plans, recommended first
- **Enrol — FAQ:** Full width
- **Enrol — Testimonials:** Quotes stack; the lead quote stays large
- **Instructor — About:** Portrait above text
- **Instructor — Stats:** 2 × 2 grid
- **Instructor — Testimonials:** Quotes stack; the lead quote stays large
- **FAQ — FAQ:** Full width
- **Footer — Big name:** Mobile: links wrap in two columns; the wordmark still spans the full width.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
