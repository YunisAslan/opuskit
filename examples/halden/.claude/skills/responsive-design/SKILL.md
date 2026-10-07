---
name: responsive-design
description: "Adapts the Halden — Nocturne Dark Cinematic Practice layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(4.5rem, 14vw, 13rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8. Container: Media edge-to-edge (100vw); text in a 1200px inner container.
- Media: 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Classic bar:** Mobile: logo + menu button; opens a simple full-width sheet.
- **Home — Hero — Scroll-controlled video:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Home — Services:** Full-width rows, description beneath title
- **Home — How It Works:** Vertical steps
- **Home — Gallery:** Two-column or single swipeable row
- **Home — Testimonials:** Quotes stack; the lead quote stays large
- **Home — Pricing:** Stacked plans, recommended first
- **Home — Location:** Stack; tap-to-call and tap-to-map
- **Home — Reservation:** Full-width form, large touch targets
- **The baths — Services:** Full-width rows, description beneath title
- **The baths — Process:** Vertical list
- **The baths — Pricing:** Stacked plans, recommended first
- **The baths — FAQ:** Full width
- **Visit — Reservation:** Full-width form, large touch targets
- **Visit — Location:** Stack; tap-to-call and tap-to-map
- **Visit — FAQ:** Full width
- **FAQ — FAQ:** Full width
- **Footer — Signature columns:** Mobile: logo, then the columns stacked, then the legal row wrapped.

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
