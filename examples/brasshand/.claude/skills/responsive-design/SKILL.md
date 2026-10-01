---
name: responsive-design
description: "Adapts the Brasshand — Typography First Agency Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- Type: display scales with clamp() — clamp(4rem, 13vw, 12rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail. Container: max-width 1440px, 32px side padding (mobile 20px).
- Media: 3:4 portrait, 4:5, occasional full-width 21:9. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Full-screen menu:** Same on every screen — it is already touch-first.
- **Home — Hero — Kinetic type hero:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Featured Work:** Single column, images first
- **Home — Services:** Full-width rows, description beneath title
- **Home — Clients:** 2-column grid
- **Home — Journal:** List view
- **Home — Closing CTA:** Large tap target
- **Case Studies — Featured Work:** Single column, images first
- **Case Studies — Case Study Preview:** Stack facts under media
- **Case Studies — Clients:** 2-column grid
- **Case Studies — Closing CTA:** Large tap target
- **Services — Services:** Full-width rows, description beneath title
- **Services — Process:** Vertical list
- **Services — Pricing:** Stacked plans, recommended first
- **Services — FAQ:** Full width
- **Services — Closing CTA:** Large tap target
- **About — About:** Portrait above text
- **About — Team:** 2-column grid
- **About — Stats:** 2 × 2 grid
- **About — Closing CTA:** Large tap target
- **Contact — Closing CTA:** Large tap target
- **Contact — Location:** Stack; tap-to-call and tap-to-map
- **Contact — FAQ:** Full width
- **Footer — Big name:** Mobile: links wrap in two columns; the wordmark still spans the full width.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
