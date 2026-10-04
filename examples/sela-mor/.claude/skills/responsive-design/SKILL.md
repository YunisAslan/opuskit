---
name: responsive-design
description: "Adapts the Sela Mor — Monochrome Minimal Personal Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- Type: display scales with clamp() — clamp(2.75rem, 7vw, 6.5rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, 32px side padding (mobile 20px).
- Media: 3:4 portrait, 4:5, occasional full-width 21:9. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Split pill:** Mobile: logo + menu button; the pill opens as a full-width sheet with the same links.
- **Home — Hero — Kinetic type hero:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- **Home — Featured Work:** Single column, images first
- **Home — Hero — Scroll-controlled video · mid-page:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Home — About:** Portrait above text
- **Home — Schedule:** Days stack, times stay left
- **Home — Clients:** 2-column grid
- **Home — Newsletter:** Field and button stack, full width
- **Works — Featured Work:** Single column, images first
- **Works — Case Study Preview:** Stack facts under media
- **Works — Gallery:** Two-column or single swipeable row
- **Works — Clients:** 2-column grid
- **Listen — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **Listen — Closing CTA:** Large tap target
- **Live — Schedule:** Days stack, times stay left
- **Live — Newsletter:** Field and button stack, full width
- **About — About:** Portrait above text
- **About — Press:** Quotes stack
- **About — Closing CTA:** Large tap target
- **Contact — Closing CTA:** Large tap target
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
