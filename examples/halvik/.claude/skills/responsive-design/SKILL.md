---
name: responsive-design
description: "Adapts the Halvik — Bento Product Launch layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: product first, text beneath, CTA sticky at bottom.
- Type: display scales with clamp() — clamp(2.5rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — Product stage:** Mobile: product first, text beneath, CTA sticky at bottom.
- **Home — Product Highlight:** Media then detail list
- **Home — Feature Rows:** Stack each row, media first
- **Home — Press:** Quotes stack
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Pricing:** Stacked plans, recommended first
- **Home — Trust Strip:** 2-column grid, then one column
- **Home — Closing CTA:** Large tap target
- **Features — Features:** Single column
- **Features — How It Works:** Vertical steps
- **Features — Product Highlight:** Media then detail list
- **Features — Closing CTA:** Large tap target
- **Contact — Closing CTA:** Large tap target
- **Contact — FAQ:** Full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
