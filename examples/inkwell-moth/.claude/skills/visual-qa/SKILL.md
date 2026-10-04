---
name: visual-qa
description: Compares the implemented site against the Inkwell & Moth — Scrapbook Portfolio recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #F7EEC0; no other page background colors are introduced.
- [ ] Display text uses Permanent Marker 400; body uses Courier Prime; no other families appear.
- [ ] Accent #C8323C covers < 5% of any viewport.
- [ ] Pages: Home · Books · About · Commissions — every page shares the same navbar and footer.
- [ ] Footer “One quiet line”: One row on the page ground above a hairline: logo left, 3–5 links centred, copyright right.
- [ ] Home section order: Hero → Featured Work → Gallery → Closing CTA.
- [ ] Books section order: Featured Work → Case Study Preview → Gallery → Clients → Closing CTA.
- [ ] About section order: About → Process → Stats → Testimonials → Closing CTA.
- [ ] Commissions section order: Closing CTA → FAQ.
- [ ] Hero matches "Illustrated hero": A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, dialog, carousel, select, checkbox, accordion) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Prints on a desk" (<DragPhotos/> from src/components/pieces/DragPhotos.tsx) is used on Home → Gallery, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Tilted scroll grid" (<TiltedGrid/> from src/components/pieces/TiltedGrid.tsx) is used on Books → Gallery, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Hand-drawn underline" (<ScribbleLink/> from src/components/pieces/ScribbleLink.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “A playful way in” is visible on every page: play is the guide: the site invites a small action first, and keeps answering the visitor’s hand — things react, colours change, nothing is only to be read.
- [ ] Chapters open as the big idea says: Chapters change colour: each item or part brings its own ground and ink as it arrives.
- [ ] The site ends as the big idea says: A footer worth reaching: the brand name assembles letter by letter, as a small reward for scrolling to the end.
- [ ] Signature moment "A playful way in" is built on Home — Hero — Illustrated hero, with its mobile and reduced-motion versions.
- [ ] Signature moment "Each item brings its own colours" is built on Home — Featured Work, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Layout: Elements span unusual widths (5, 7, 11); overlaps allowed; section spacing Irregular: 80–240px, set per section by composition.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Side index”: Fixed left column (≈220px): logo, then the page list in the utility face, the current page marked; content fills the rest.
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
