---
name: responsive-design
description: "Adapts the Hane — Japanese Minimal Practice layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- Type: display scales with clamp() — clamp(3rem, 7.5vw, 7rem); re-break headlines manually on mobile.
- Grid: 12 columns, content intentionally weighted to one side per section; 2vw (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Alternate 7/5 and 4/8 splits; leave columns empty on purpose. Container: Full width with 5vw side margins.
- Media: 4:5, 3:2, and tall 2:3 used in alternation. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Editorial image hero:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- **Home — Services:** Full-width rows, description beneath title
- **Home — How It Works:** Vertical steps
- **Home — Team:** 2-column grid
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Pricing:** Stacked plans, recommended first
- **Home — Location:** Stack; tap-to-call and tap-to-map
- **Home — Reservation:** Full-width form, large touch targets
- **Treatments — Services:** Full-width rows, description beneath title
- **Treatments — Process:** Vertical list
- **Treatments — Pricing:** Stacked plans, recommended first
- **Treatments — FAQ:** Full width
- **Practitioners — Team:** 2-column grid
- **Practitioners — Testimonials:** Quotes stack; the lead quote stays large
- **Book an appointment — Reservation:** Full-width form, large touch targets
- **Book an appointment — Location:** Stack; tap-to-call and tap-to-map
- **Book an appointment — FAQ:** Full width
- **FAQ — FAQ:** Full width
- **FAQ — Closing CTA:** Large tap target
- **Footer — Say hello:** Mobile: invitation, contact links, details and the links row stacked.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
