---
name: visual-qa
description: Compares the implemented site against the Future Art Direction Experiment recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #F2F0E6; no other page background colors are introduced.
- [ ] Display text uses Syne 700; body uses DM Sans; no other families appear.
- [ ] Accent #FF4F1F covers < 5% of any viewport.
- [ ] Pages: Home · Experiment · About · Contact · FAQ · Privacy Policy · 404 · Sign In · Sign Up · Terms of Service · Cookie Policy · Accessibility — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Manifesto.
- [ ] Experiment section order: Gallery → Editorial Story.
- [ ] About section order: About.
- [ ] Contact section order: Closing CTA.
- [ ] FAQ section order: FAQ.
- [ ] Privacy Policy section order: .
- [ ] 404 section order: .
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] Terms of Service section order: .
- [ ] Cookie Policy section order: .
- [ ] Accessibility section order: .
- [ ] Hero matches "3D / WebGL scene": A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- [ ] Layout: Elements span unusual widths (5, 7, 11); overlaps allowed; section spacing Irregular: 80–240px, set per section by composition.
- [ ] Absent: Random effects without a concept.
- [ ] Absent: Unreadable text over images.
- [ ] Absent: Custom cursors that hide the real cursor.
- [ ] Absent: Scroll hijacking.
- [ ] Mobile (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px.
- [ ] prefers-reduced-motion: every animation has its documented alternative.
- [ ] Every media element is rendered through the asset config layer; temporary assets are listed in the manifest.
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.

Do not mark work complete while any item fails. Fix, then re-check.
