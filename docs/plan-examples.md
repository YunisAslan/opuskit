# Plan — example sites

A shared, living plan for the example sites: how each one is made, what is open on the fifteen already built, and the
next five. Replaces `plan-for-fit.md`, `plan-vibe.md` and `plan-variety.md` (finished; in git history up to commit
`8d63496`). Older build logs cite their sections — read those files from git history if needed.
Before working on an example, read this file and keep the **Progress** table current.

## 1. Why examples exist

While picking options in the kit, a person must see **what kind of site they will get**. Exact combinations are
impossible (~10⁹), so: what defines the style (feel, first screen, movement, big idea, effects) is shown by a few
seconds of a real site built with OpusKit; details (colours, type, shape) by the kit's live preview. Under every clip:
*"A site like this. Colours and typefaces will follow your choices."* The user (2026-10-04): every site the kit makes
should be as good as **Sela Mor** — that is the bar for every new example too.

## 2. Rules

- **No fake examples.** Every site is made the way a user would make it: **kit → Build Package → Claude Code**.
  Allowed: providing media, and asking for fixes in plain words. Not allowed: hand-written code, hiding a change that
  went outside the recipe. Every prompt goes into `examples/{slug}/BUILD-LOG.md`, word for word, in order.
- No real brands, logos, famous people or film/TV footage. Brand names are made up; copy is real (no lorem).
- **Media:** Claude finds the photos (Unsplash connector — re-authorise it in claude.ai connector settings when it drops —
  else Pexels via a headed browser). **The user picks every video and sound** (decided 2026-10-03; exception only when
  the user says so). Claude writes the shot list and waits for the files.
- **Kit growth:** after each build, list what Claude Code built by hand that other users would want, and **ask** before
  adding it (full AGENTS.md wiring, `npm run pieces`, `npm run check`). Only what a user would look for and not find —
  the kit is the foundation of a site, not every detail of it.
- Palettes are picked **by fit** (`rankPalettes`), previewed on a real page, never because they are unused.

## 3. The loop for each site

| Step | Who | What |
|---|---|---|
| 1 | Claude | Builds the recipe **in the kit** with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `addSection`, …) and shows it. The user approves. |
| 2 | Claude | Writes the media brief (§5): photos Claude will find, and the shot list for any film or sound the user picks. |
| 3 | Claude + user | Claude downloads photos into `media-src/` (sources in `media-src/SOURCES.md`), resizes them (≤ 2400 px long side, JPEG q82) into `public/media/`. The user drops films/sound into the project root or `media-src/`. |
| 4 | Claude | `create-next-app@16.3.8` (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install --disable-git`), **`turbopack.root` pin in `next.config.ts` before any install/build**, `scripts/build-package.ts spec.json examples/{slug}`, keep `build/` out of `.gitignore`, remove the placeholder SVGs, `npm install`, the package README's `npm i …`. Films through `bash scripts/prepare-video.sh`. |
| 5 | Claude Code | A fresh subagent builds it from the package with the prompt in `BUILD-LOG.md` (it is told only: stay inside the folder, read CLAUDE.md and AGENTS.md, its port, never touch the `turbopack.root` line). Resumed with "continue where you left off" after a limit; logged. |
| 6 | Claude | Review: production build, 1440 px + 390 px in a real browser, overflow, console errors, failed requests. Fix prompts only (1–2 rounds). Fixes to shipped pieces/sections go into OpusKit's own sources too. |
| 7 | Claude | Registration: `src/data/examples.ts` (title/summary from the site's own `<title>`/meta, `choices` with exact option names), `public/examples/{slug}` symlink, card screenshot `public/examples/{slug}.jpg`, `npm run examples`, live export (AGENTS.md "Showing one on the site"), click-through from the nav in a real browser, `npm run check`. |
| 8 | User + Claude | Clips: the user screen-records the live export into `media-src/recording/` (kept on disk, not committed). Claude cuts with ffmpeg: site clip 10–15 s (first screen + scroll); section clips 3–5 s **standing still**, framed on the section (never scrolling past); small effects zoomed in (still 16:9 crop, 2–4×); never a pasted or patched frame. `pieceClips` and `signatureClips` for effects and big-idea moments. `npm run check` asserts each clip exists and the site really has that thing. |

Removing an example: `examples/{slug}/`, the symlink + `{slug}.jpg`, `public/live/{slug}/`, `public/downloads/{slug}.zip`,
its `examples.ts` entry; grep for `/examples/{slug}` (kit sample photos use some sites' media); `npm run examples`,
`npm run check`.

## 4. The fifteen built sites — what is open

All fifteen are built, registered and live. Open:
- **Clips for #11–#15** (Inkwell & Moth, Kür Delta Watch, Night Shift, Aster House, Sela Mor): waiting for the user's
  screen recordings.
- **Re-recordings** (section clips that are a held still frame because the recording never stopped on them; ~4 s
  standing still on each fixes it):

| Site | Sections |
|---|---|
| Fennwood | intro, menu, gallery, reservation, location, faq, footer |
| Sticky Weather | featured-work, manifesto, journal, contact-cta, about |
| Hexmint | clients, feature-rows, feature-grid, integrations, testimonials, contact-cta, how-it-works |
| Lowfield Nights | the home first screen (site clip), intro, schedule, team, location, reservation, menu, faq, footer |
| Velmira | the home first screen (site clip), intro, feature-rows, journal, reservation, lookbook, gallery, location, faq, footer |
| Slow Atlas | editorial-story, journal, categories |
| Halvik | product-highlight, feature-rows, press, testimonials, pricing, trust, contact-cta, footer, feature-grid, how-it-works |
| Hane | services, how-it-works, testimonials, pricing, reservation |
| Brasshand | manifesto, case-study, clients, services, journal |
| Saint Ashe | journal, newsletter, lookbook, editorial-story, team, product-grid, contact-cta, footer, about |

## 5. Next five sites (#16–#20, revised 2026-10-04)

The user (2026-10-04): we need **premium websites — realistic and modern**. Every new site is the kind of business that
really commissions an award-level site, made with today's award look (neutral grounds and one accent, media-led, huge
light type, calm motion with one big moment). Khazri stays from the first proposal ("Khazri xoşuma gəldi").

| # | Site | Kind · Look (family) · Movement | First screen | Colours · Lettering | Shows first on a real site |
|---|---|---|---|---|---|
| 16 | **QUM** — skincare made with Caspian salt and Absheron saffron | ecommerce · scandinavian-minimal (quiet) · subtle | editorial-image | Sage White · Soft Wedge | ecommerce; product page with the buy box + specs (ingredients, size); journal article page; index footer |
| 17 | **Volna** — an electric day boat for the Caspian, taking reservations | product · technical-minimal (futuristic) · immersive | scroll-video (the user's film) | Paper Cobalt · Horizon | Horizon's wide light type; reserve-with-deposit buy box; specs grid; proof held in place (PinnedStage) |
| 18 | **Khazri** — a type experiment: the north wind bends the letters | experiment · art-direction (experimental) · dynamic | kinetic-type | Grape Soda · Dial | experiment; status-bar menu (live wind and time); Dial's width axis; colour chapters |
| 19 | **Long Shadow** — a weekend of short films in an old cinema | event (festival starter) · dark-cinematic (cinematic) · dynamic | ambient-video (the user's film) | Charcoal Signal · Projection | the festival starter (lineup, tickets, sponsors); Projection; Charcoal Signal |
| 20 | **Kərpic** — an architecture studio restoring old brick houses | studio · modern-heritage (editorial) · dynamic | parallax-photo | Warm Black · Real Ink | project pages with specs; the work index; Real Ink; Warm Black |

What makes each premium and real (the references are the kind of site, never copied):
- **#16 QUM** — like the skincare houses that sell on calm, near-white pages with photography doing all the work: one
  product per screen, ingredients as facts, a ritual told in three steps, a journal. Showcase: the product photo lifts
  into the buy box as you scroll; the saffron accent appears only on "Add to bag".
- **#17 Volna** — like the electric-boat and e-mobility launches: the film of the boat on the water drives the scroll,
  the numbers (range, top speed, charge time) arrive held in place one by one, then reserve with a deposit. Showcase: the
  boat cuts across the screen as you scroll.
- **#18 Khazri** — the wordmark stretches and leans with a live wind reading; each chapter brings its own colour field;
  the status bar ticks "Baku 14:32, wind NNW 11 m/s".
- **#19 Long Shadow** — like the film-festival sites: a dark room, the festival film behind huge hairline titles, the
  lineup as a name wall, tickets as a table, sponsors by tier.
- **#20 Kərpic** — like the architecture studios' sites: each project opens on a full photo that drifts, its facts
  (place, year, area, team) in a specs grid, one project leads to the next.

**Media.** Photos: Claude (all five; product shots for QUM must show unbranded bottles and jars). Films: the user —
#17 a 15–30 s single continuous shot of a small modern boat (or the water from the bow) moving across calm water, no
logos or people's faces; #19 a 10–15 s loop of an empty old cinema or a projector beam, no people or brands. #16, #18 and
#20 need no film. Claude writes each shot list at step 2.

Names with Azerbaijani letters (ə) are checked against the display face at step 1 (Bayon lacked them on Brasshand); if
the face has no glyph, the brand is spelled Kerpic.

**Order:** 18 (no media) → 16 → 20 → 17 → 19 (the user's films last). The user can swap any row or change any pick.

## 6. Progress

| # | Site | Recipe | Media | Build | Registered | Clips |
|---|---|---|---|---|---|---|
| 1–10 | Slow Atlas … Lowfield Nights | ✓ | ✓ | ✓ | ✓ | ✓ (re-recordings in §4) |
| 11 | Inkwell & Moth | ✓ | ✓ | ✓ | ✓ live | waiting for recording |
| 12 | Kür Delta Watch | ✓ | ✓ | ✓ | ✓ live | waiting for recording |
| 13 | Night Shift | ✓ | ✓ | ✓ | ✓ live | waiting for recording |
| 14 | Aster House | ✓ | ✓ | ✓ | ✓ live | waiting for recording |
| 15 | Sela Mor | ✓ | ✓ | ✓ | ✓ live | waiting for recording |
| 16 | QUM | ✓ (`examples/qum/opuskit.json`, approved 2026-10-04) | ✓ 23 photos (Pexels, `media-src/SOURCES.md`) | ✓ Prompt 1 (subagent); no fix round; 20 static files; reviewed 1440 + 390 | ✓ live at `/live/qum` (click-through checked), `npm run check` ✓ | waiting for recording |
| 17 | Volna | proposed | | | | |
| 18 | Khazri | approved (idea) | | | | |
| 19 | Long Shadow | proposed | | | | |
| 20 | Kərpic | proposed | | | | |
