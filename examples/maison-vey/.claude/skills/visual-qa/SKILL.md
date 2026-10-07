---
name: visual-qa
description: Compares the implemented site against the Maison Vey — Refined Luxury Editorial Store recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #4A1119; no other page background colors are introduced.
- [ ] Display text uses Bodoni Moda 400; body uses Jost; no other families appear.
- [ ] Accent #A9D6FF covers < 5% of any viewport.
- [ ] Pages: Home · Shop · Product · Cart · Checkout · About — every page shares the same navbar and footer.
- [ ] Footer “Signature columns”: Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- [ ] Home section order: Hero → Product Grid → Collection → Editorial Story → Testimonials → Trust Strip → Newsletter.
- [ ] Shop section order: Product Grid → Product Highlight → Collection → FAQ.
- [ ] Product section order: Product buy box → Product Highlight → Testimonials → FAQ → Product Grid.
- [ ] Cart section order: Product Grid.
- [ ] Checkout section order: .
- [ ] About section order: About → Process.
- [ ] Hero matches "Product stage": The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, radio-group, select, toggle-group, card, badge, input, form, label, slider, pagination, accordion, carousel, breadcrumb, table, separator, checkbox) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with reference code in src/components/sections/ keep its design (real copy and media, no placeholder text left) and are fitted into this site: tokens only, the site’s type sizes and spacing, the code edited wherever its defaults disagree. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] One system: things of one kind look alike everywhere — menu links, footer links, labels and button text share one face, width and size step; headings of one level share one size.
- [ ] Every row lines up: the items of one row (the menu’s logo, links and button; a card’s title and meta) share one vertical centre or baseline — none sits higher because of padding it brought along.
- [ ] Nothing looks pasted in: no part keeps a size, padding, width or font from its reference code that its neighbours do not share.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail; section spacing clamp(120px, 14vw, 200px) between chapters, 48px within.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Classic bar”: Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- [ ] Absent: Discount-style badges.
- [ ] Absent: Gold gradients.
- [ ] Absent: Crowded product grids.
- [ ] Absent: A cream or beige page ground with a clay/terracotta accent.
- [ ] Absent: A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black.
- [ ] Absent: Small uppercase, letter-spaced monospace labels above every heading.
- [ ] Absent: Numbered markers (01 / 02) on content that is not a real sequence.
- [ ] Absent: Meta strings joined with middle dots or spaced em dashes, and "→" appended to links.
- [ ] Absent: One italic or coloured accent word inside an otherwise plain headline.
- [ ] Absent: Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts.
- [ ] Absent: Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block.
- [ ] Absent: Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit.
- [ ] Mobile (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px.
- [ ] prefers-reduced-motion: every animation has its documented alternative.
- [ ] Every media element is rendered through the asset config layer; temporary assets are listed in the manifest.
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.

Do not mark work complete while any item fails. Fix, then re-check.
