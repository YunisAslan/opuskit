---
name: visual-qa
description: Compares the implemented site against the Sela Mor — Monochrome Minimal Personal Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #000000; no other page background colors are introduced.
- [ ] Display text uses Mona Sans 800; body uses Mona Sans; no other families appear.
- [ ] Accent #FFFFFF covers < 5% of any viewport.
- [ ] Pages: Home · Works · Listen · Live · About · Contact — every page shares the same navbar and footer.
- [ ] Footer “Signature columns”: Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- [ ] Home section order: Hero → Featured Work → Hero → About → Schedule → Clients → Newsletter.
- [ ] Works section order: Featured Work → Case Study Preview → Gallery → Clients.
- [ ] Listen section order: Intro → Closing CTA.
- [ ] Live section order: Schedule → Newsletter.
- [ ] About section order: About → Press → Closing CTA.
- [ ] Contact section order: Closing CTA.
- [ ] Hero matches "Kinetic type hero": Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- [ ] Home: the hero sits mid-page exactly where the section order puts it — a full-width band after the sections above it, not moved to the top; the page's first section carries the h1.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, dialog, carousel, select, checkbox) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Photos follow the cursor" (<ImageTrail/> from src/components/pieces/ImageTrail.tsx) is used on Home → Featured Work, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Rolling links" (<TextRoll/> from src/components/pieces/TextRoll.tsx) is used on Every page — menu, footer and text links, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Magnetic button" (<Magnetic/> from src/components/pieces/Magnetic.tsx) is used on Every page — the main action, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Soft fade between pages" (<PageFade/> from src/components/pieces/PageFade.tsx) is used on Whole site — every internal link; mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Sound, with a mute" (<AmbientSound/> from src/components/pieces/AmbientSound.tsx) is used on Whole site — mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Tap to open large" (<Lightbox/> from src/components/pieces/Lightbox.tsx) is used on Works → Gallery (its photo layout), unchanged in behaviour and styled only through the recipe tokens.
- [ ] Big idea “Chapters in giant words” is visible on every page: type is the guide: one display size far above everything else, used only for the chapter words, so the page has a rhythm of loud word → quiet content → loud word.
- [ ] Chapters open as the big idea says: Every main chapter opens with one word set huge and cropped at the screen edges — the chapter’s subject (Work, Menu, Programme), never a slogan.
- [ ] The site ends as the big idea says: The brand name set as the last giant word, across the full width of the footer.
- [ ] Signature moment "Chapters that open with a giant word" is built on Listen — Intro, with its mobile and reduced-motion versions.
- [ ] Signature moment "Proof, one at a time" is built on Home — Featured Work, with its mobile and reduced-motion versions.
- [ ] Every page passes the award checklist in the recipe (one idea, one unforgettable moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it.
- [ ] Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail; section spacing clamp(120px, 14vw, 200px) between chapters, 48px within.
- [ ] Shape “Hairline”: buttons 4px, cards 6px, media 4px radius (rounded-button / rounded-card / rounded-media) — Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
- [ ] Menu “Split pill”: Three separate pieces at the top edge: signature logo left, a compact white pill of 3–4 uppercase links centred, and one boxed action with a status dot (● Contact) right. No bar behind them.
- [ ] Absent: Accent colors on UI.
- [ ] Absent: Gradients.
- [ ] Absent: Too many type sizes.
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
