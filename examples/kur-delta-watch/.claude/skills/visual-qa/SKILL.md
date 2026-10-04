---
name: visual-qa
description: Compares the implemented site against the Kür Delta Watch — Neo-Brutalist Foundation recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #F5C518; no other page background colors are introduced.
- [ ] Display text uses Big Shoulders 800; body uses Hanken Grotesk; no other families appear.
- [ ] Accent #1A3BD4 covers < 5% of any viewport.
- [ ] Pages: Home · The river · What we do · Field notes · Donate · Contact — every page shares the same navbar and footer.
- [ ] Footer “Big name”: Links and contact in one row at the top, then the brand name in the display face spanning the full container width (sized to fit, one line), then copyright and legal small underneath.
- [ ] Home section order: Hero → Stats → Hero → Manifesto → Timeline → Services → CTA Band → Journal → Newsletter.
- [ ] The river section order: About → Editorial Story → Team.
- [ ] What we do section order: Services → Process → Closing CTA.
- [ ] Field notes section order: Testimonials → Editorial Story → Gallery → Closing CTA.
- [ ] Donate section order: Pricing → Trust Strip → FAQ.
- [ ] Contact section order: Closing CTA → Location.
- [ ] Hero matches "Kinetic type hero": Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- [ ] Home: the hero sits mid-page exactly where the section order puts it — a full-width band after the sections above it, not moved to the top; the page's first section carries the h1.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, toggle-group, input, form, label, badge, pagination, textarea, select, checkbox, dialog, carousel, tabs, switch, card, accordion) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Departure board" (<SplitFlap/> from src/components/pieces/SplitFlap.tsx) is used on Home → Hero, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Filling underline" (<UnderlineFill/> from src/components/pieces/UnderlineFill.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “Loud covers, quiet reading” is visible on every page: two volumes, never mixed: covers (the first screen, chapter openers, the start of each story) are loud — giant type, a full-bleed photo — and everything people read stays narrow, calm and quiet.
- [ ] Chapters open as the big idea says: Chapters open like magazine covers: one giant word or a full-width photo, then the calm column starts.
- [ ] The site ends as the big idea says: A quiet ending: the footer is as calm as the reading, with the name set large once.
- [ ] Signature moment "Chapters that open with a giant word" is built on Home — Manifesto, with its mobile and reduced-motion versions.
- [ ] Signature moment "Photos revealed like a curtain" is built on Field notes — Gallery, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it.
- [ ] Layout: Modules snap to 3, 4, 6 or 12 columns; section spacing 96–128px, or sections separated by rules only.
- [ ] Shape “Bold outline”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — 2px ink borders on every module; hard offset shadow that collapses on press; no blur shadows.
- [ ] Menu “Menu with cards”: Compact bar; opening it reveals 3–4 cards below, each a section of the site with a photo, title and 2–3 links.
- [ ] Absent: Soft gradients.
- [ ] Absent: Glassmorphism.
- [ ] Absent: Delicate serif type.
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
