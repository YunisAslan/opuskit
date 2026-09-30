---
name: visual-qa
description: Compares the implemented site against the ulooklonely — Film-inspired Portfolio recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #B6DADA; no other page background colors are introduced.
- [ ] Display text uses Special Gothic Expanded One 400; body uses Special Gothic; no other families appear.
- [ ] Accent #0038FF covers < 5% of any viewport.
- [ ] Pages: Home · About · Sign In · Sign Up · Services · Work — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Journal.
- [ ] About section order: Editorial Story.
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] Services section order: Closing CTA.
- [ ] Work section order: Featured Work → Case Study Preview.
- [ ] Hero matches "Scroll-controlled video": A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, badge, pagination, input, checkbox, form, label, input-otp, textarea, select) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Sections with ready code are built from their component in src/components/sections/ (real copy and media through props, no placeholder text left) and styled only through the recipe tokens.
- [ ] Kit piece "Hand-drawn underline" (<ScribbleLink/> from src/components/pieces/ScribbleLink.tsx) is used on Home → Hero, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Reading line" (<ScrollProgress/> from src/components/pieces/ScrollProgress.tsx) is used on Home → Journal, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Type that races the scroll" (<VelocityBand/> from src/components/pieces/VelocityBand.tsx) is used on Menu and footer — on every page, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Brand cursor" (<BrandCursor/> from src/components/pieces/BrandCursor.tsx) is used on Whole site — mount once in app/layout.tsx, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Kit piece "Tilted scroll grid" (<TiltedGrid/> from src/components/pieces/TiltedGrid.tsx) is used on Work → Featured Work, unchanged in behaviour and styled only through the recipe tokens.
- [ ] Photos are shown as "Tilted scroll grid" (Scroll drives rotateX / translateZ from tilted to flat (or columns moving at different speeds, parallax-scroll style).).
- [ ] Owner’s video fills desktop and tablet screens at 16:9 (no bars, no stretching, no narrow strip); phones play the original shape.
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it.
- [ ] Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).
- [ ] Layout: Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8; section spacing Media sections are 100svh; text sections 120–160px padding.
- [ ] Shape “Bold outline”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — 2px ink borders on every module; hard offset shadow that collapses on press; no blur shadows.
- [ ] Menu “Floating dock”: A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- [ ] Absent: Heavy vintage filters.
- [ ] Absent: Fake film UI (sprocket holes).
- [ ] Absent: Cold, clinical palettes.
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
