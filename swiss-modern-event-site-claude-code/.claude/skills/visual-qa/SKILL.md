---
name: visual-qa
description: Compares the implemented site against the RALPH&LAUREN — Swiss Modern Event Site recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #FFFFFF; no other page background colors are introduced.
- [ ] Display text uses Special Gothic Expanded One 400; body uses Special Gothic; no other families appear.
- [ ] Accent #D7261E covers < 5% of any viewport.
- [ ] Pages: Home · RSVP · Venue & travel · FAQ · Gallery · Contact · Sign In · Sign Up · Privacy Policy · Terms of Service · Cookie Policy · Accessibility — every page shares the same navbar and footer.
- [ ] Home section order: Hero → Intro.
- [ ] RSVP section order: Reservation → Location.
- [ ] Venue & travel section order: .
- [ ] FAQ section order: FAQ.
- [ ] Gallery section order: Gallery.
- [ ] Contact section order: Closing CTA.
- [ ] Sign In section order: .
- [ ] Sign Up section order: .
- [ ] Privacy Policy section order: .
- [ ] Terms of Service section order: .
- [ ] Cookie Policy section order: .
- [ ] Accessibility section order: .
- [ ] Hero matches "Scroll-controlled video": A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- [ ] Controls and forms use shadcn/ui (button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, input, textarea, tabs, card, accordion, command, dialog, carousel, checkbox, input-otp) restyled to the recipe tokens and shape — no unstyled native select, date input or checkbox anywhere; the date field is a Calendar in a Popover.
- [ ] Signature moment "Words that light up as you read" is built on Home — Intro, with its mobile and reduced-motion versions.
- [ ] Signature moment "Image trail behind the cursor" is built on Gallery — Gallery, with its mobile and reduced-motion versions.
- [ ] Signature moment "Links that roll on hover" is built on Navigation, with its mobile and reduced-motion versions.
- [ ] Photos are shown as "Even grid" (Hover: subtle image scale (1.03) or a second photo), and the owner's request is met: “put there unsplash hourse and related images”.
- [ ] Owner’s video fills desktop and tablet screens at 16:9 (no bars, no stretching, no narrow strip); phones play the original shape.
- [ ] Video: public/media/heroVideo.mp4 and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); file size ≤ 6 MB desktop / ≤ 3 MB mobile; poster images (posterImage.jpg, posterMobile.jpg) exist and load before the video.
- [ ] Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).
- [ ] Layout: Modules snap to 3, 4, 6 or 12 columns; section spacing 96–128px, or sections separated by rules only.
- [ ] Shape “Sharp”: buttons 0px, cards 0px, media 0px radius (rounded-button / rounded-card / rounded-media) — No rounded corners anywhere; structure comes from lines and space.
- [ ] Menu “Centered logo”: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- [ ] Absent: Rounded corners and soft shadows.
- [ ] Absent: Centred text.
- [ ] Absent: Decorative imagery.
- [ ] Absent: Motion that doesn't explain anything.
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
