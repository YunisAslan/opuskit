---
name: responsive-design
description: "Adapts the Kelp Line — Warm Coastal Calm Foundation layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- Type: display scales with clamp() — clamp(2.75rem, 6.5vw, 5.75rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #0F3F2E (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, side gutter clamp(20px, 3vw, 44px) (--container, --gutter).
- Media: 3:2 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md). Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — Editorial image hero:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- **Home — Timeline:** Heading above, steps stacked along the line
- **Home — Stats:** 2 × 2 grid
- **Home — Services:** Full-width rows, description beneath title
- **Home — Editorial Story:** Single column, pull quote full width
- **Home — CTA Band:** Line above the button
- **Home — Journal:** List view
- **Home — Newsletter:** Field and button stack, full width
- **Our mission — About:** Portrait above text
- **Our mission — Editorial Story:** Single column, pull quote full width
- **Our mission — Team:** 2-column grid
- **Our mission — Stats:** 2 × 2 grid
- **Programs — Services:** Full-width rows, description beneath title
- **Programs — Process:** Vertical list
- **Programs — Stats:** 2 × 2 grid
- **Programs — CTA Band:** Line above the button
- **Stories — Testimonials:** Quotes stack; the lead quote stays large
- **Stories — Editorial Story:** Single column, pull quote full width
- **Stories — Gallery:** Two-column or single swipeable row
- **Donate — Donate:** Gifts stacked above the form; the spending split as a 2 × 2 grid
- **Donate — Trust Strip:** 2-column grid, then one column
- **Donate — FAQ:** Full width
- **Contact — Schedule:** Days stack, times stay left
- **Contact — Closing CTA:** Large tap target
- **Contact — Location:** Stack; tap-to-call and tap-to-map
- **Footer — One quiet line:** Mobile: logo, links and copyright centred on three short lines.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
