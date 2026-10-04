---
name: visual-qa
description: Compares the implemented site against the QUM — Warm Scandinavian Minimal Store recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #DDEBD8; no other page background colors are introduced.
- [ ] Display text uses Petrona 300; body uses Public Sans; no other families appear.
- [ ] Accent #0B7A4B covers < 5% of any viewport.
- [ ] Pages: Home · Shop · Product · Cart · Checkout · The salt · Journal · Article · Help — every page shares the same navbar and footer.
- [ ] Footer “Everything, listed”: On the page ground: the logo and one line of contact at the top, then 3–4 columns, each a heading and every link under it (all pages, services, categories, recent posts), then a hairline and copyright and legal.
- [ ] Home section order: Hero → Intro → Product Grid → Editorial Story → Process → Testimonials → Press → Journal → Newsletter.
- [ ] Shop section order: Categories → Product Grid → Trust Strip.
- [ ] Product section order: Product buy box → Specs → Process → Testimonials → FAQ → Product Grid.
- [ ] Cart section order: Product Grid.
- [ ] Checkout section order: .
- [ ] The salt section order: About → Editorial Story → Timeline → Location.
- [ ] Journal section order: Journal → Newsletter.
- [ ] Article section order: Article → Journal → Newsletter.
- [ ] Help section order: FAQ.
- [ ] Hero matches "Editorial image hero": One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, radio-group, select, toggle-group, card, badge, pagination, input, form, label, slider, accordion, carousel, breadcrumb, table, separator, checkbox, command) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Words that arrive" (<TextEffect/> from src/components/pieces/TextEffect.tsx) is used on Every page — the h1, plus at most two section headings per page (not every heading), unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Filling underline" (<UnderlineFill/> from src/components/pieces/UnderlineFill.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Soft fade between pages" (<PageFade/> from src/components/pieces/PageFade.tsx) is used on Whole site — every internal link; mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “A walk through named stops” is visible on every page: the site is a place to walk through: every main view is a named stop (The terrace, Room 4, Day two), and a quiet index shows where the visitor is.
- [ ] Chapters open as the big idea says: Each chapter is a stop: a full-screen view first, then a small card that names it and says one useful thing.
- [ ] The site ends as the big idea says: The last stop is the way in: how to book, visit or arrive, with a line that is true right now (open, rooms left, doors at 19:00).
- [ ] Signature moment "A walk through named stops" is built on The salt — Location, with its mobile and reduced-motion versions.
- [ ] Signature moment "A live status line" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Photos are shown as "Even grid" (Hover: subtle image scale (1.03) or a second photo).
- [ ] Layout: Text in 6–8 central columns; media spans 10–12; section spacing clamp(96px, 12vw, 160px) between sections.
- [ ] Shape “Soft”: buttons 8px, cards 12px, media 12px radius (rounded-button / rounded-card / rounded-media) — Small, consistent radii; never mix sharp and rounded.
- [ ] Menu “Centered logo”: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
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
