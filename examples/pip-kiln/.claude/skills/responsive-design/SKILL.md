---
name: responsive-design
description: "Adapts the Pip & Kiln — Cheeky Playful Pop Store layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: product first, text beneath, CTA sticky at bottom.
- Type: display scales with clamp() — clamp(3rem, 10vw, 9rem); re-break headlines manually on mobile.
- Grid: 24 columns (fine-grained for off-grid placement); 1vw.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #FFDE47 (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).
- Layout: Elements span unusual widths (5, 7, 11); overlaps allowed. Container: max-width none (full width), side gutter clamp(16px, 1vw + 12px, 28px) (--container, --gutter).
- Media: 1:1 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Product stage:** Mobile: product first, text beneath, CTA sticky at bottom.
- **Home — Categories:** 2-column grid
- **Home — Product Grid:** 2 columns on mobile
- **Home — Collection:** Portrait crop, title over lower third
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Trust Strip:** 2-column grid, then one column
- **Home — Newsletter:** Field and button stack, full width
- **Shop — Product Grid:** 2 columns on mobile
- **Shop — Product Highlight:** Media then detail list
- **Shop — Collection:** Portrait crop, title over lower third
- **Shop — FAQ:** Full width
- **Product — Product buy box:** Pictures first as a swipeable row or stack, then the buy column; the button stays full width
- **Product — Product Highlight:** Media then detail list
- **Product — Testimonials:** Quotes stack; the lead quote stays large
- **Product — FAQ:** Full width
- **Product — Product Grid:** 2 columns on mobile
- **Cart — Product Grid:** 2 columns on mobile
- **Workshops — Services:** Full-width rows, description beneath title
- **Workshops — Schedule:** Days stack, times stay left
- **Workshops — Gallery:** Two-column or single swipeable row
- **Workshops — Pricing:** Stacked plans, recommended first
- **Workshops — Reservation:** Full-width form, large touch targets
- **Workshops — FAQ:** Full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
