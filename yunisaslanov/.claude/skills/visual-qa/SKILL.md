---
name: visual-qa
description: Compares the implemented site against the yunisaslanov — Warm Scrapbook Portfolio recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #040404; no other page background colors are introduced.
- [ ] Display text uses Hubot Sans 800; body uses IBM Plex Sans; no other families appear.
- [ ] Accent #E8A98C covers < 5% of any viewport.
- [ ] Pages: Home · About · Projects · Contact — every page shares the same navbar and footer.
- [ ] Footer “One quiet line”: One row on the page ground above a hairline: logo left, 3–5 links centred, copyright right.
- [ ] Home section order: Hero → Featured Work → Testimonials → Newsletter.
- [ ] About section order: Editorial Story.
- [ ] Projects section order: Gallery.
- [ ] Contact section order: Closing CTA.
- [ ] Hero matches "Typographic statement": A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, dialog, carousel, select, checkbox) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Dithered pattern" (<ShaderDither/> from src/components/pieces/ShaderDither.tsx) is used on Home → Hero, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Hand-drawn underline" (<DrawnLink/> from src/components/pieces/DrawnLink.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “Loud covers, quiet reading” is visible on every page: two volumes, never mixed: covers (the first screen, chapter openers, the start of each story) are loud — a full-bleed photo with its title set large over it — and everything people read stays narrow, calm and quiet.
- [ ] Chapters open as the big idea says: Chapters open like magazine covers: a full-width photo the visitor scrolls into, its title over it, then the calm column starts.
- [ ] The site ends as the big idea says: A quiet ending: the footer is as calm as the reading — small, clear links under the last cover, no giant type.
- [ ] Signature moment "Photos revealed like a curtain" is built on Projects — Gallery, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Photos are shown as "Full-bleed moments" (Slow reveal (clip or fade) once, on entering the viewport).
- [ ] Layout: Elements span unusual widths (5, 7, 11); overlaps allowed; section spacing Irregular: 80–240px, set per section by composition.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Floating pill”: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- [ ] Absent: Collage behind reading text.
- [ ] Absent: Too many fonts.
- [ ] Absent: Perfectly aligned grids.
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
