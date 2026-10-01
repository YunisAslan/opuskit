---
name: visual-qa
description: Compares the implemented site against the Slow Atlas — News Grid Magazine recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #8C0F1E; no other page background colors are introduced.
- [ ] Display text uses Schibsted Grotesk 800; body uses Source Serif 4; no other families appear.
- [ ] Accent #FFD8E0 covers < 5% of any viewport.
- [ ] Pages: Home · Articles · About · Newsletter · Article — every page shares the same navbar and footer.
- [ ] Footer “Signature columns”: Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- [ ] Home section order: Hero → Intro → Journal → About → Closing CTA.
- [ ] Articles section order: Journal.
- [ ] About section order: About → Team.
- [ ] Newsletter section order: Journal → Closing CTA.
- [ ] Article section order: Editorial Story → Journal → Closing CTA.
- [ ] Hero matches "Typographic statement": A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, badge, pagination, textarea, select, checkbox, label) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Layout: Modules snap to 3, 4, 6 or 12 columns; section spacing 96–128px, or sections separated by rules only.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Classic bar”: Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
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
