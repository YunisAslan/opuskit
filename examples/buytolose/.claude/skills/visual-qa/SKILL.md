---
name: visual-qa
description: Compares the implemented site against the BUYTOLOSE — Gothic Modern Store recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #86C9C4; no other page background colors are introduced.
- [ ] Display text uses Unbounded 700; body uses Onest; no other families appear.
- [ ] Accent #B3123F covers < 5% of any viewport.
- [ ] Pages: Home · Shop · Product · Cart · Checkout · Account · About · Contact · Shipping & Returns · Size Guide · Gift Cards · Testimonials · FAQ · Sign In · Sign Up · Privacy Policy · Terms of Service · Cookie Policy · 404 — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Collection.
- [ ] Shop section order: Product Grid → Product Highlight.
- [ ] Product section order: .
- [ ] Cart section order: .
- [ ] Checkout section order: .
- [ ] Account section order: .
- [ ] About section order: About.
- [ ] Contact section order: Closing CTA.
- [ ] Shipping & Returns section order: .
- [ ] Size Guide section order: .
- [ ] Gift Cards section order: .
- [ ] Testimonials section order: .
- [ ] FAQ section order: FAQ.
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] Privacy Policy section order: .
- [ ] Terms of Service section order: .
- [ ] Cookie Policy section order: .
- [ ] 404 section order: .
- [ ] Hero matches "Scroll-controlled video": A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Absent: Blackletter for paragraphs.
- [ ] Absent: Bright pastel accents.
- [ ] Absent: Cute illustrations.
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
