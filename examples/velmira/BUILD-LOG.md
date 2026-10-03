# Build log — Velmira

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #9 of docs/plan-for-fit.md §5: quiet / ethereal, ambient-video first screen, calm movement, hotel / spa.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `toggleSitePiece`), the same calls the kit UI makes.
Approved by the user ("continue").
- Kind of site: Hotel & travel · name "Velmira" · about "Nine rooms and a bathhouse on a lake in the Gabala hills: warm
  water, cold air, long quiet mornings." · goal: Book or reserve
- Look: Ethereal · colours Midnight Chapters · lettering Kalnia Couture (both the row's fresh picks, §5) · shape Frosted
  glass · layout Full-bleed · first screen: Ambient video hero · movement: Subtle
- Big idea: One thing guides the scroll (the kit's recommendation) → a shape that travels from Home's intro, a footer
  worth reaching
- Menu: Centered logo · footer: Signature columns · whole site: Sound, with a mute (the row's C3 pick); headlines, links,
  main button and between pages — none
- Pages (the hotel defaults): Home (hero → intro → collection → feature rows → journal → reservation), Rooms (collection →
  lookbook → reservation), Gallery (gallery), Book a stay (reservation → location → FAQ), Getting here (location → FAQ)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

Film: "A Mist Over Water" by Aaron Burden on Pexels (3840×2160, 21 s), found and downloaded by Claude; seconds 2–16 cut
to `media-src/hero.mp4` (the recipe asks for an 8–15 s loop), then the package's own `bash scripts/prepare-video.sh
media-src/hero.mp4 --no-upscale`: `heroVideo.mp4` 1920×1080 4.0 MB (CRF 26), `mobileVideoEncode.mp4` 1080×1920 2.3 MB
(CRF 32), posters. Mist is hard to compress: the phone film only fits its 3 MB budget at CRF 32, so OpusKit's script now
allows the CRF to rise to 32 (it stopped at 28), and this project got the regenerated script.

Sound: "Calm River Ambience Loop" by soundsforyou on Pixabay (2:00, Pixabay Content License), found and downloaded by
Claude; re-encoded at 96 kbps to `public/media/ambientSound.mp3` (1.4 MB), the path the recipe uses.

Photos: the Unsplash connector needed a new sign-in, so the 11 photos come from Pexels (sources in `media-src/SOURCES.md`).
Originals in `media-src/`; resized to at most 2400 px (JPEG q82) into `public/media/`. Graded to match the pale set:
`sauna` (warm wood cooled and desaturated, the bright right edge cropped), `lake` (black and white, given a light cool
tint).

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for the earlier examples.
It was given only: "work inside `examples/velmira/` as the project root; read its CLAUDE.md and AGENTS.md first; port
3000 is taken, use port 3015 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My files are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- heroVideo.mp4 (1920×1080) and mobileVideoEncode.mp4 (1080×1920) — mist drifting over the lake, made by scripts/prepare-video.sh; the first screen loop. posterImage.jpg and posterMobile.jpg are their first frames.
- ambientSound.mp3 — a calm water ambience for the sound switch (off until the visitor turns it on).
- room-1.jpg, room-2.jpg, room-3.jpg — three of our nine rooms, for the rooms collection and lookbook.
- bath.jpg — the bathhouse pool, lake.jpg — the dock in the fog, sauna.jpg — the wood-fired sauna; for the feature rows.
- gallery-1.jpg … gallery-4.jpg — details (the bath by the window, the firs in fog, morning tea, towels), for the gallery and the journal.
- arrival.jpg — the house on the lake shore, for Getting here.

I don't have a logo yet — make a simple one for Velmira.

Booking has no backend yet: the booking form can open the visitor's mail app with the details filled in.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: the whole site built — Home, Rooms, Gallery, Book a stay (`/book`), Getting here and a 404, from the ready
sections and kit pieces. Its own additions: a coral-sun-over-water logo (`Logo.tsx`, `icon.svg`); the travelling coral disc
(leaves the first screen, rests beside each chapter title, ends beside a full-width "Velmira" in the footer); a rooms strip
pinned sideways on desktop, a swipe row on phones; a full-screen photo viewer for the gallery; travel tabs on Getting here;
a booking form (calendar, guests, room) that opens the visitor's mail app; a phone "Check availability" bar. It invented
three named rooms and prices (AZN), `stay@velmira.az`, a phone number, the address "Nohur lake shore, Gabala" (a real
lake), house rules, travel times and three journal notes. It reported: shadcn's `form` part is not offered in this style,
so forms use its `field` parts; two lint errors sit in code it didn't write (the kit's sound switch, shadcn's carousel).
`next build` with `output: 'export'` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests. Seen:
the fixed "Lake sound off" switch in the bottom-left corner sits on top of text — over the "A sauna lit with birch and
oak" heading on desktop, and over the footer links on phones, where it also stacks beside the "Check availability" bar.
OpusKit fix from it: the AmbientSound piece now takes a `placement` (e.g. inside the menu bar) and its rules say the switch
never covers text.

### Prompt 2 — fix round 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), given only: "work inside
`examples/velmira/` as the project root; read its CLAUDE.md and AGENTS.md first; port 3000 is taken, use port 3015 for its
dev server" — then the prompt below, word for word.

```
One fix, please: the "Lake sound off" switch in the bottom-left corner sits on top of text — on desktop it covers the start of "A sauna lit with birch and oak" while you scroll, and on phones it covers the footer links and stacks next to the "Check availability" bar. Keep the switch always in view, but give it a place where it never covers anything: for example in the menu bar on desktop, and inside the phone bar (or the phone menu) on phones.

Keep everything else as it is. When you're done, run the static build again and make sure it still passes.
```

Result: the sound switch now sits in the fixed menu bar (desktop: a pill after Rooms and Gallery; phones: a 44 px bars-only
button between the menu button and the logo); the bottom-left switch is gone. It also fixed a crash in the kit's switch
("volume … outside the range [0, 1]" when the fade's first frame landed early) — fixed in OpusKit's own piece too.
`next build` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests; the
switch sits in the menu bar and covers nothing, the sauna heading and the footer are clear.
