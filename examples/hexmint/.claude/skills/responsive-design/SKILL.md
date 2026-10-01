---
name: responsive-design
description: "Adapts the Hexmint — Digital Futurism Software Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- Type: display scales with clamp() — clamp(3rem, 8vw, 7rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Floating pill:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Home — Hero — 3D / WebGL scene:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- **Home — Clients:** 2-column grid
- **Home — Feature Rows:** Stack each row, media first
- **Home — Features:** Single column
- **Home — Integrations:** 2-column grid under the heading
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Closing CTA:** Large tap target
- **Features — Features:** Single column
- **Features — Product Highlight:** Media then detail list
- **Features — How It Works:** Vertical steps
- **Features — Closing CTA:** Large tap target
- **Pricing — Pricing:** Stacked plans, recommended first
- **Pricing — FAQ:** Full width
- **Pricing — Testimonials:** Quotes stack; the lead quote stays large
- **Pricing — Closing CTA:** Large tap target
- **FAQ — FAQ:** Full width
- **FAQ — Closing CTA:** Large tap target
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
