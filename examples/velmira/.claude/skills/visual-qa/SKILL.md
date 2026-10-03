---
name: visual-qa
description: Compares the implemented site against the Velmira — Ethereal Hotel Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #271A70; no other page background colors are introduced.
- [ ] Display text uses Kalnia 300; body uses SUSE; no other families appear.
- [ ] Accent #FDA1A2 covers < 5% of any viewport.
- [ ] Pages: Home · Rooms · Gallery · Book a stay · Getting here — every page shares the same navbar and footer.
- [ ] Footer “Signature columns”: Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- [ ] Home section order: Hero → Intro → Collection → Feature Rows → Journal → Reservation.
- [ ] Rooms section order: Collection → Lookbook → Reservation.
- [ ] Gallery section order: Gallery.
- [ ] Book a stay section order: Reservation → Location → FAQ.
- [ ] Getting here section order: Location → FAQ.
- [ ] Hero matches "Ambient video hero": Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, toggle-group, badge, pagination, input, textarea, carousel, dialog, accordion, tabs, card) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Sound, with a mute" (<AmbientSound/> from src/components/pieces/AmbientSound.tsx) is used on Whole site — mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “One thing guides the scroll” is visible on every page: pick one element from the first screen — the product, the logo mark, a drawn line or a simple shape in the accent colour — and let it leave the hero and travel down the page with the visitor, turning up beside each chapter.
- [ ] Chapters open as the big idea says: Each chapter opens where the motif comes to rest: the motif changes pose or size there, and the chapter title sits next to it.
- [ ] The site ends as the big idea says: The motif comes to rest in the footer, beside the brand name: the journey visibly ends.
- [ ] Signature moment "One shape travels down the page" is built on Home — Intro, with its mobile and reduced-motion versions.
- [ ] Signature moment "A footer worth reaching" is built on Footer, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it.
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Shape “Frosted glass”: buttons 14px, cards 20px, media 16px radius (rounded-button / rounded-card / rounded-media) — Cards, menu and dialogs are frosted glass: background at 15–30% opacity of the surface token, backdrop-filter: blur(16px), a 1px border at 20% white. Only over a vivid colour or photo — on a flat page it reads as grey. Body text stays on solid surfaces (4.5:1).
- [ ] Menu “Centered logo”: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- [ ] Absent: Low-contrast text on pale glows.
- [ ] Absent: Hard shadows.
- [ ] Absent: Busy imagery.
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
