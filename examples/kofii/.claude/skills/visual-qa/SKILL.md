---
name: visual-qa
description: Compares the implemented site against the KOFİİ — Scandinavian Minimal Restaurant Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #CEDE91; no other page background colors are introduced.
- [ ] Display text uses Zalando Sans 800; body uses Zalando Sans; no other families appear.
- [ ] Accent #6A2FD9 covers < 5% of any viewport.
- [ ] Pages: Home · Menu · Reservations · About · Gallery · Contact · Order Online · Catering & Private Events · Locations · Gift Cards · Privacy Policy · FAQ · Sign In · Sign Up · Terms of Service · Cookie Policy · 404 · Accessibility — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Intro.
- [ ] Menu section order: Menu.
- [ ] Reservations section order: Reservation → Location.
- [ ] About section order: About.
- [ ] Gallery section order: Gallery.
- [ ] Contact section order: Closing CTA.
- [ ] Order Online section order: .
- [ ] Catering & Private Events section order: .
- [ ] Locations section order: .
- [ ] Gift Cards section order: .
- [ ] Privacy Policy section order: .
- [ ] FAQ section order: FAQ.
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] Terms of Service section order: .
- [ ] Cookie Policy section order: .
- [ ] 404 section order: .
- [ ] Accessibility section order: .
- [ ] Hero matches "Whole-page scroll video": A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- [ ] Signature moment "A line that draws through your story" is built on About — About, with its mobile and reduced-motion versions.
- [ ] Signature moment "Photos revealed like a curtain" is built on Gallery — Gallery, with its mobile and reduced-motion versions.
- [ ] Photos are shown as "Liquid glass carousel" (Inertial drag).
- [ ] Owner’s video fills desktop and tablet screens at 16:9 (no bars, no stretching, no narrow strip); phones play the original shape.
- [ ] Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Shape “Soft”: buttons 8px, cards 12px, media 12px radius (rounded-button / rounded-card / rounded-media) — Small, consistent radii; never mix sharp and rounded.
- [ ] Menu “Floating pill”: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- [ ] Absent: Pure white + pure black.
- [ ] Absent: Dramatic dark sections.
- [ ] Absent: Ornamental type.
- [ ] Absent: A cream or beige page ground with a clay/terracotta accent.
- [ ] Absent: A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black.
- [ ] Absent: Small uppercase, letter-spaced monospace labels above every heading.
- [ ] Absent: Numbered markers (01 / 02) on content that is not a real sequence.
- [ ] Absent: Meta strings joined with middle dots or spaced em dashes, and "→" appended to links.
- [ ] Absent: One italic or coloured accent word inside an otherwise plain headline.
- [ ] Absent: Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts.
- [ ] Mobile (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px.
- [ ] prefers-reduced-motion: every animation has its documented alternative.
- [ ] Every media element is rendered through the asset config layer; temporary assets are listed in the manifest.
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.

Do not mark work complete while any item fails. Fix, then re-check.
