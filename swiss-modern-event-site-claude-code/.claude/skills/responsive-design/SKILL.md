---
name: responsive-design
description: "Adapts the RALPH&LAUREN — Swiss Modern Event Site layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint."
---

# Responsive design

Mobile is its own composition, not a squeezed desktop.

## Breakpoints
- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px

## Rules
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(2.5rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 12 columns desktop, 6 tablet, 4 mobile; 0 (bordered modules) or 16px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- Layout: Modules snap to 3, 4, 6 or 12 columns. Container: Full width, 24px margins; grid lines may be visible.
- Media: 1:1, 4:3, 16:9 — always snapped to module width. Provide dedicated mobile crops; keep focal points in the centre 60%.
- Headlines: set explicit line breaks per breakpoint (`<br className="hidden md:block" />` or separate spans).

## Section-specific
- **Navigation — Centered logo:** Mobile: centred logo, menu button left, action right.
- **Home — Hero — Scroll-controlled video:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Home — Intro:** Scale statement to ~8vw; keep line breaks intentional
- **RSVP — Reservation:** Full-width form, large touch targets
- **RSVP — Location:** Stack; tap-to-call and tap-to-map
- **FAQ — FAQ:** Full width
- **Gallery — Gallery:** Two-column or single swipeable row
- **Contact — Closing CTA:** Large tap target
- **Footer:** Stacked columns

## Verify
Check 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.
