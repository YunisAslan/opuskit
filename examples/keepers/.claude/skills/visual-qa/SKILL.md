---
name: visual-qa
description: Compares the implemented site against the KEEPERS — News Grid Product Launch recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #D6FF3D; no other page background colors are introduced.
- [ ] Display text uses Big Shoulders 800; body uses Hanken Grotesk; no other families appear.
- [ ] Accent #6A11E8 covers < 5% of any viewport.
- [ ] Pages: Home · Features · Contact · Testimonials · Privacy Policy · Terms of Service · Cookie Policy · About · Pricing · Comparison · FAQ · Sign In · Sign Up · 404 · Accessibility — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Product Highlight.
- [ ] Features section order: Features.
- [ ] Contact section order: Closing CTA.
- [ ] Testimonials section order: .
- [ ] Privacy Policy section order: .
- [ ] Terms of Service section order: .
- [ ] Cookie Policy section order: .
- [ ] About section order: About.
- [ ] Pricing section order: Pricing.
- [ ] Comparison section order: .
- [ ] FAQ section order: FAQ.
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] 404 section order: .
- [ ] Accessibility section order: .
- [ ] Hero matches "Whole-page scroll video": A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- [ ] Signature moment "Magnetic main button" is built on Contact — Closing CTA, with its mobile and reduced-motion versions.
- [ ] Signature moment "Product cards that tilt toward you" is built on Home — Product Highlight, with its mobile and reduced-motion versions.
- [ ] Signature moment "Cards that stack as you scroll" is built on Features — Features, with its mobile and reduced-motion versions.
- [ ] Signature moment "Links that roll on hover" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Absent: Decorative images.
- [ ] Absent: Soft pastels.
- [ ] Absent: Centered paragraphs.
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
