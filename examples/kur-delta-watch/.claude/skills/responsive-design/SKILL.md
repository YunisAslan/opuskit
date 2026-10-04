---
name: responsive-design
description: "Adapts the Kür Delta Watch — Neo-Brutalist Foundation layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- Type: display scales with clamp() — clamp(3.5rem, 12vw, 11rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Menu with cards:** Mobile: cards stack vertically in a sheet.
- **Home — Hero — Kinetic type hero:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- **Home — Stats:** 2 × 2 grid
- **Home — Hero — Ambient video hero · mid-page:** Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.
- **Home — Manifesto:** Re-break lines for mobile
- **Home — Timeline:** Heading above, steps stacked along the line
- **Home — Services:** Full-width rows, description beneath title
- **Home — CTA Band:** Line above the button
- **Home — Journal:** List view
- **Home — Newsletter:** Field and button stack, full width
- **The river — About:** Portrait above text
- **The river — Editorial Story:** Single column, pull quote full width
- **The river — Team:** 2-column grid
- **What we do — Services:** Full-width rows, description beneath title
- **What we do — Process:** Vertical list
- **What we do — Closing CTA:** Large tap target
- **Field notes — Testimonials:** Quotes stack; the lead quote stays large
- **Field notes — Editorial Story:** Single column, pull quote full width
- **Field notes — Gallery:** Two-column or single swipeable row
- **Field notes — Closing CTA:** Large tap target
- **Donate — Pricing:** Stacked plans, recommended first
- **Donate — Trust Strip:** 2-column grid, then one column
- **Donate — FAQ:** Full width
- **Contact — Closing CTA:** Large tap target
- **Contact — Location:** Stack; tap-to-call and tap-to-map
- **Footer — Big name:** Mobile: links wrap in two columns; the wordmark still spans the full width.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
