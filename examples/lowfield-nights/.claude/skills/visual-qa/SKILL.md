---
name: visual-qa
description: Compares the implemented site against the Lowfield Nights — Cinematic Editorial Event Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #303030; no other page background colors are introduced.
- [ ] Display text uses Newsreader 700; body uses Albert Sans; no other families appear.
- [ ] Accent #F6CEA0 covers < 5% of any viewport.
- [ ] Pages: Home · RSVP · Venue & travel · FAQ — every page shares the same navbar and footer.
- [ ] Footer “Big name”: Links and contact in one row at the top, then the brand name in the display face spanning the full container width (sized to fit, one line), then copyright and legal small underneath.
- [ ] Home section order: Hero → Intro → Schedule → Team → Location → FAQ → Reservation.
- [ ] RSVP section order: Reservation → Location → FAQ.
- [ ] Venue & travel section order: Location → Gallery → FAQ.
- [ ] FAQ section order: FAQ → Closing CTA.
- [ ] Hero matches "Whole-page scroll video": A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, accordion, input, textarea, tabs, card, dialog, carousel, command, checkbox) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Words that arrive" (<TextEffect/> from src/components/pieces/TextEffect.tsx) is used on Every page — the h1, plus at most two section headings per page (not every heading), unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Curtain between pages" (<PageCurtain/> from src/components/pieces/PageCurtain.tsx) is used on Whole site — every internal link; mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “A walk through named stops” is visible on every page: the site is a place to walk through: every main view is a named stop (The terrace, Room 4, Day two), and a quiet index shows where the visitor is.
- [ ] Chapters open as the big idea says: Each chapter is a stop: a full-screen view first, then a small card that names it and says one useful thing.
- [ ] The site ends as the big idea says: The last stop is the way in: how to book, visit or arrive, with a line that is true right now (open, rooms left, doors at 19:00).
- [ ] Signature moment "A walk through named stops" is built on Venue & travel — Gallery, with its mobile and reduced-motion versions.
- [ ] Signature moment "A live status line" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it.
- [ ] Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Centered logo”: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- [ ] Absent: Generic SaaS UI.
- [ ] Absent: Excessive cards.
- [ ] Absent: Decorative gradients.
- [ ] Absent: Unnecessary animation on every element.
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
