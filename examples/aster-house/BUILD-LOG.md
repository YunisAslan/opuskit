# Build log — Aster House

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #14 of docs/plan-for-fit.md §11: minimal / architectural-minimal, scroll-video first screen, immersive, real estate.

## 1. Recipe (2026-10-04)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `addSection`, `removeSection`,
`renamePage`, `removePage`, `setPagePurpose`), the same calls the kit UI makes; the palette was chosen by comparing four
in the kit's live preview (Limestone, Signal White, Wet Concrete, Black Box). Approved by the user ("təsdiq edirəm").
- Kind of site: Real estate · name "Aster House" · about "Twelve houses cut into the cliff above the Caspian at Shikhov,
  each built around the light of one hour of the day. One release, spring 2027." · goal: Book or reserve
- Look: Architectural Minimal · colours Limestone · lettering Quiet Page · shape Hairline (the look's own) · layout
  Full-bleed · first screen: Scroll-controlled video · movement: Immersive
- Big idea: One thing guides the scroll → A shape that travels (Home — Intro), A footer worth reaching
- Menu: Classic bar · footer: Signature columns
- Behaviour: links — Filling underline; between pages — Soft fade; headlines, main button, whole site — none
- Pages: Home (hero → intro → feature rows → product grid → gallery → location → closing CTA), Residences (product grid →
  feature grid → FAQ; its brief: "All twelve houses in one list: the hour each is built around, floor area, bedrooms,
  terrace, price, and whether it is still free, reserved or sold."), A house (product highlight → gallery → feature rows →
  closing CTA), Book a viewing (closing CTA → location)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

15 photos from Pexels, picked by Claude (the Unsplash connector needed a new sign-in; sources in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`.

Film: the user's pick (Pexels 7578547, 3840×2160, 21.2 s, one continuous gimbal walk through a bright modern house), kept
as `media-src/film-original.mp4` and run as it is through the package's own `bash scripts/prepare-video.sh`:
`scrubReadyEncode.mp4` 4.8 MB (a keyframe every 6 frames), `heroVideo.mp4` 1920×1080 5.5 MB, `mobileVideoEncode.mp4`
1080×1920 2.9 MB, posters. (A warm grade was tried first and dropped: it only made the film darker.)

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-04)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for the other new sites.
It was given only: "work inside `examples/aster-house/` as the project root, never edit files outside it; read its
CLAUDE.md and AGENTS.md first; port 3001 is taken, use port 3011 for its dev server; never remove or change the
`turbopack.root` line in next.config.ts (`output: 'export'` and `images: { unoptimized: true }` may be added)" — then the
prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

The film is already prepared (I ran scripts/prepare-video.sh): public/media/scrubReadyEncode.mp4 for the scroll on desktop, heroVideo.mp4, mobileVideoEncode.mp4 for phones, posterImage.jpg and posterMobile.jpg. It is a slow walk through the show house, and it is the first screen: scrolling walks you through the house, forwards and back. Over it, only the name and one line; as the walk goes on, two or three short captions appear and leave (the hall, the kitchen, the stair to the sea rooms).

My photos are in public/media/ (where each one comes from is in media-src/SOURCES.md):
- cliff-1.jpg, cliff-2.jpg — the site: the clifftop above the sea, and the houses on the rock.
- hour-dawn.jpg, hour-morning.jpg, hour-noon.jpg, hour-afternoon.jpg, hour-evening.jpg, hour-dusk.jpg — each house is built around the light of one hour; these are that light inside the houses. Use them for the hours on Home and for the houses.
- room-bed.jpg, room-balcony.jpg, terrace-pool.jpg, terrace-stone.jpg, detail-jug.jpg, stair.jpg — rooms, terraces and details.
- architect.jpg — the architect, for a short word from her or him.

The twelve houses are named after the hour they face: Dawn, Six, Eight, Ten, Noon, Two, Four, Golden, Six Evening, Dusk, Blue Hour, Night — invent area, bedrooms, terrace size and price for each, and mark three as reserved and two as sold. Residences lists them all with that status. The thing that travels down the page is a thin line of light, like sun moving across a floor.

Book a viewing: a short form (name, email, which house, a preferred day) — it's a static site, so it opens the visitor's mail app with the request written out, to the sales office. Invent the architect's name, the sales office address in Baku and the contact details — real-sounding, made up.

I don't have a logo yet — make a simple one for Aster House.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: every page built from the ready sections and kit pieces (Home, Residences, twelve static house pages, Book a
viewing, plus Privacy and a 404); `next build` with `output: 'export'` passes, all 19 routes static. Its own additions: the
first screen as the scroll-scrubbed walk (320vh on desktop with the scrub encode, 180svh on phones with the 9:16 one) with
the name, a line and three captions that follow the film (kitchen, hall, stair — the film's own order); a thin line of
light that leaves the first screen, rests beside each section heading and lands under the footer logo (a still line per
heading on phones and with reduced motion); the twelve houses with status filters (Eight, Two, Dusk reserved; Noon,
Golden sold; Ten the show house); a booking form (house pre-selected from a house page, a calendar with past days off)
that opens the visitor's mail app; a square-and-beam logo as the favicon. It reshaped ready sections within the tokens.

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): no console errors, no 4xx, no horizontal
overflow; the scroll film scrubs. No fix round.

## 5. On OpusKit (2026-10-04)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names). `public/examples/aster-house` is a symlink to this project's `public/`; the card is a
1440×900 screenshot of the live first screen with film frames. `npm run examples` wrote its spec and
`public/downloads/aster-house.zip`; the live export is in `public/live/aster-house/`. Checked in a browser at 1440 px and
390 px: home, scroll (the scrub encode plays at 1440, the phone encode at 390), then the menu to Residences and on to a
house page — no failed requests. `npm run check` ✓. Clips: waiting for the user's recordings.
