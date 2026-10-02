---
name: responsive-design
description: "Adapts the Sticky Weather — Cheeky Sticker Studio Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: a smaller ellipse with 6–8 stickers behind the headline; motion stays scroll-linked but half the distance.
- Type: display scales with clamp() — clamp(2.75rem, 7.5vw, 6.5rem); re-break headlines manually on mobile.
- Grid: 12 columns; 24px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Text in 6–8 central columns; media spans 10–12. Container: max-width 1200px, centred, 24px side padding (mobile 20px).
- Media: 16:9 wide, 4:5 portrait, 1:1 detail. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Split pill:** Mobile: logo + menu button; the pill opens as a full-width sheet with the same squiggles.
- **Home — Hero — Sticker orbit:** Mobile: a smaller ellipse with 6–8 stickers behind the headline; motion stays scroll-linked but half the distance.
- **Home — Featured Work:** Single column, images first
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Journal:** List view
- **Home — Closing CTA:** Large tap target
- **Practice — Featured Work:** Single column, images first
- **Practice — Editorial Story:** Single column, pull quote full width
- **Practice — Gallery:** Two-column or single swipeable row
- **Practice — Closing CTA:** Large tap target
- **About — About:** Portrait above text
- **About — Team:** 2-column grid
- **About — Process:** Vertical list
- **About — Closing CTA:** Large tap target
- **Contact — Closing CTA:** Large tap target
- **Contact — Location:** Stack; tap-to-call and tap-to-map
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
