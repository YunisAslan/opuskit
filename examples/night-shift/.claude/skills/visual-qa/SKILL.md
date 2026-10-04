---
name: visual-qa
description: Compares the implemented site against the Night Shift — Technical Minimal Course Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #040404; no other page background colors are introduced.
- [ ] Display text uses Science Gothic 600; body uses Atkinson Hyperlegible Next; no other families appear.
- [ ] Accent #E8A98C covers < 5% of any viewport.
- [ ] Pages: Home · Curriculum · Enrol · Instructor · FAQ — every page shares the same navbar and footer.
- [ ] Footer “Say hello”: A large headline invitation (“Let’s talk”, “Book a table”) with the email/phone as display-size links, address and hours beside it, then one small row of links, copyright and legal.
- [ ] Home section order: Hero → Intro → Case Study Preview → Process → About → Testimonials → Pricing → FAQ → Closing CTA.
- [ ] Curriculum section order: Features → Process → Case Study Preview → FAQ.
- [ ] Enrol section order: Pricing → FAQ → Testimonials.
- [ ] Instructor section order: About → Stats → Testimonials.
- [ ] FAQ section order: FAQ → Closing CTA.
- [ ] Hero matches "3D / WebGL scene": A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, input-otp, label, tabs, switch, card, badge, accordion, textarea, select, checkbox, table, command) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Before / after" (<ImageComparison/> from src/components/pieces/ImageComparison.tsx) is used on Home → Case Study Preview; Curriculum → Case Study Preview, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Scrambled labels" (<TextScramble/> from src/components/pieces/TextScramble.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “A live console” is visible on every page: console chrome everywhere, quietly: // labels in the utility face, a fine hairline grid behind key sections, numbers in tabular figures.
- [ ] Chapters open as the big idea says: Chapters open with a numbered // label that decodes out of random characters as it arrives (// 02 Sync).
- [ ] The site ends as the big idea says: The footer ends on the status line and a plain, monospaced sign-off.
- [ ] Signature moment "Labels that decode" is built on Curriculum — Features, with its mobile and reduced-motion versions.
- [ ] Signature moment "A live status line" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Layout: Modules snap to 3, 4, 6 or 12 columns; section spacing 96–128px, or sections separated by rules only.
- [ ] Shape “Hairline”: buttons 4px, cards 6px, media 4px radius (rounded-button / rounded-card / rounded-media) — Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
- [ ] Menu “Floating dock”: A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- [ ] Absent: Illustrative fluff.
- [ ] Absent: Rounded card soup.
- [ ] Absent: Marketing superlatives.
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
