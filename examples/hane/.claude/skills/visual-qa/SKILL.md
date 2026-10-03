---
name: visual-qa
description: Compares the implemented site against the Hane — Japanese Minimal Practice recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #EACDC3; no other page background colors are introduced.
- [ ] Display text uses Bellefair 400; body uses Red Hat Text; no other families appear.
- [ ] Accent #A3123A covers < 5% of any viewport.
- [ ] Pages: Home · Treatments · Practitioners · Book an appointment · FAQ — every page shares the same navbar and footer.
- [ ] Footer “Say hello”: A large headline invitation (“Let’s talk”, “Book a table”) with the email/phone as display-size links, address and hours beside it, then one small row of links, copyright and legal.
- [ ] Home section order: Hero → Services → How It Works → Team → Testimonials → Pricing → Location → Reservation.
- [ ] Treatments section order: Services → Process → Pricing → FAQ.
- [ ] Practitioners section order: Team → Testimonials.
- [ ] Book an appointment section order: Reservation → Location → FAQ.
- [ ] FAQ section order: FAQ → Closing CTA.
- [ ] Hero matches "Editorial image hero": One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, tabs, switch, card, badge, input, textarea, accordion, command, checkbox) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Filling underline" (<UnderlineFill/> from src/components/pieces/UnderlineFill.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “A walk through named stops” is visible on every page: the site is a place to walk through: every main view is a named stop (The terrace, Room 4, Day two), and a quiet index shows where the visitor is.
- [ ] Chapters open as the big idea says: Each chapter is a stop: a full-screen view first, then a small card that names it and says one useful thing.
- [ ] The site ends as the big idea says: The last stop is the way in: how to book, visit or arrive, with a line that is true right now (open, rooms left, doors at 19:00).
- [ ] Signature moment "A walk through named stops" is built on Home — Location, with its mobile and reduced-motion versions.
- [ ] Signature moment "A live status line" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Photos are shown as "Photo story" (Each pair reveals together).
- [ ] Layout: Alternate 7/5 and 4/8 splits; leave columns empty on purpose; section spacing clamp(120px, 16vw, 240px); vary spacing to create rhythm.
- [ ] Shape “Soft”: buttons 8px, cards 12px, media 12px radius (rounded-button / rounded-card / rounded-media) — Small, consistent radii; never mix sharp and rounded.
- [ ] Menu “Classic bar”: Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- [ ] Absent: Card grids and boxed UI.
- [ ] Absent: Saturated accents or more than one accent.
- [ ] Absent: Motion that loops or bounces.
- [ ] Absent: Stock "zen" clichés (stones, bamboo, enso brush strokes).
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
