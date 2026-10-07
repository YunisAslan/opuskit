# Plan — example sites

A shared, living plan for the example sites: how each one is made, what is open on the sixteen already built, and the
next ones (on hold). In the Library (`docs/plan-library.md`) the examples are the **Sites** shelf and the shop window for
sections. Replaces `plan-for-fit.md`, `plan-vibe.md` and `plan-variety.md` (finished; in git history up to commit
`8d63496`). Older build logs cite their sections — read those files from git history if needed.
Before working on an example, read this file and keep the **Progress** table current.

## 1. Why examples exist

While picking options in the kit, a person must see **what kind of site they will get**. Exact combinations are
impossible (~10⁹), so: what defines the style (feel, first screen, movement, big idea, effects) is shown by a few
seconds of a real site built with OpusKit; details (colours, type, shape) by the kit's live preview. Under every clip:
*"A site like this. Colours and typefaces will follow your choices."* The user (2026-10-04): every site the kit makes
should be as good as **Sela Mor** — that is the bar for every new example too.

## 2. Rules

- **No fake examples.** Every site is made the way a user would make it: **Library → Brand → Pages → Recipe → Build
  Package → Claude Code** (from #17, 2026-10-06; #1–#16 were made in the kit).
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
| 1 | Claude | Builds the recipe **through the Library flow** in a real browser, as a user would (collect sites or start blank, Brand, Pages, Next: Recipe), and shows it. The user approves. (#1–#16: in the kit.) |
| 2 | Claude | Writes the media brief (§5): photos Claude will find, and the shot list for any film or sound the user picks. |
| 3 | Claude + user | Claude downloads photos into `media-src/` (sources in `media-src/SOURCES.md`), resizes them (≤ 2400 px long side, JPEG q82) into `public/media/`. The user drops films/sound into the project root or `media-src/`. |
| 4 | Claude | `create-next-app@16.3.8` (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install --disable-git`), **`turbopack.root` pin in `next.config.ts` before any install/build**, `scripts/build-package.ts spec.json examples/{slug}`, keep `build/` out of `.gitignore`, remove the placeholder SVGs, `npm install`, the package README's `npm i …`. Films through `bash scripts/prepare-video.sh`. |
| 5 | Claude Code | A fresh subagent builds it from the package with the prompt in `BUILD-LOG.md` (it is told only: stay inside the folder, read CLAUDE.md and AGENTS.md, its port, never touch the `turbopack.root` line). Resumed with "continue where you left off" after a limit; logged. |
| 6 | Claude | Review: production build, 1440 px + 390 px in a real browser, overflow, console errors, failed requests. Fix prompts only (1–2 rounds). Fixes to shipped pieces/sections go into OpusKit's own sources too. |
| 7 | Claude + user | Feed back (decision 33 in `docs/plan-library.md`): compare each section the builder made with its source in `src/sections/`. Where the build made it clearly better (layout, states, motion, a11y), list it and **ask**; once approved, bring it back as a fix or a new `variant` (tokens and props only, `npm run pieces`, `npm run check`). So the clip shows what a collector gets. |
| 8 | Claude | Registration: `src/data/examples.ts` (title/summary from the site's own `<title>`/meta, `choices` with exact option names), `public/examples/{slug}` symlink, card screenshot `public/examples/{slug}.jpg`, `npm run examples`, live export (AGENTS.md "Showing one on the site"), click-through from the nav in a real browser, `npm run check`. |
| 9 | User + Claude | Clips: the user screen-records the live export into `media-src/recording/` (kept on disk, not committed). Claude cuts with ffmpeg: site clip 10–15 s (first screen + scroll); section clips 3–5 s **standing still**, framed on the section (never scrolling past); small effects zoomed in (still 16:9 crop, 2–4×); never a pasted or patched frame. `pieceClips` and `signatureClips` for effects and big-idea moments. `npm run check` asserts each clip exists and the site really has that thing. |

Removing an example: `examples/{slug}/`, the symlink + `{slug}.jpg`, `public/live/{slug}/`, `public/downloads/{slug}.zip`,
its `examples.ts` entry; grep for `/examples/{slug}` (kit sample photos use some sites' media); `npm run examples`,
`npm run check`.

## 4. The built sites — what is open

All nineteen are built, registered and live. Open:
- **Clips for #11–#18 and #20** (Inkwell & Moth, Kür Delta Watch, Night Shift, Aster House, Sela Mor, QUM, Fieldhouse, Maison Vey, Halden):
  waiting for the user's screen recordings.
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

## 5. Next sites (#17–#20, 2026-10-06)

The 2026-10-04 proposal (Volna, Khazri, Long Shadow, Kərpic — in git history at `064ccfb`) is dropped: sites Claude
invents are not set in Azerbaijan (HANDOFF working agreements). Tramontane (a wind-driven type experiment) was dropped
too — in Typography First with Lido Blue and a kinetic first screen it came out as Brasshand again. The user: we need
**new looks**, made the **Library + Build** way. So every site below is in a look no example has yet, started in the
Library (blank, or parts collected — any look can then be picked in Brand), then Pages, Recipe, Build Package, Claude
Code.

| # | Site | Kind | Look (new) | Media |
|---|---|---|---|---|
| 17 | **Fieldhouse** — an architecture studio that restores old barns into houses | Studio | Modern Heritage | photos (Claude) |
| 18 | **Maison Vey** — a small perfume house, five scents | E-commerce | Luxury Editorial | photos (Claude); a film optional (the user) |
| 19 | **Low Hum** — a listening bar: records, a big sound system, small plates | Restaurant | Retro Seventies | photos (Claude) |
| 20 | **Halden** — a sauna and cold-sea bathhouse on a northern coast | Health & wellness | Dark Cinematic | a film (the user) |

Order: 17 → 18 → 19 → 20 (the user's film last). Palettes and lettering by fit, previewed in Brand. Not used: Orrery (a
watchmaker) — nearly every watch photo carries a real brand's logo.

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
| 17 | Fieldhouse | ✓ via the Library (blank → Studio; Modern Heritage · Warm Black · Moonlit Italic; Home: Photo with depth, Featured Work, Manifesto, Testimonials, Closing CTA · Work · Project · About · Contact) — approved | ✓ 28 photos (Unsplash connector, `media-src/SOURCES.md`) | ✓ Prompt 2 (real photos) + fix round 1 (Home photos without hover, project cover full width); reviewed 1440 + 390 | ✓ live at `/live/fieldhouse` (click-through checked), `npm run check` ✓ | waiting for recording |
| 18 | Maison Vey | ✓ via the Library (blank → E-commerce; Luxury Editorial · Oxblood Room · Gala Night; Home: Product in the spotlight, Product Grid, Collection, Editorial Story, Testimonials, Trust Strip, Newsletter · Shop · Product · Cart · Checkout · About: About, Process) — saved 2026-10-07 | ✓ 33 photos (Unsplash connector, over the build's temporary ones) | ✓ Prompt 1 in an isolated `claude -p` session (resumed once); approved by the user ("Pages-də necə qurulubsa realda da elədir") | ✓ live at `/live/maison-vey` (click-through checked), `npm run check` ✓ | waiting for recording |
| 19 | Low Hum | §5 — after Halden | | | | |
| 20 | Halden | ✓ via the Library (blank → Health & wellness; Dark Cinematic · Charcoal Signal · Opening Credits; Home: Film on the first screen, Services, How It Works, Gallery, Testimonials (Wall), Pricing, Location, Reservation · The baths · Visit · FAQ · Sign In · Sign Up; Smooth scroll + Scroll progress, both by the user) — saved 2026-10-07 | ✓ the user's film (drone over fog, 4K) via `prepare-video.sh`; 21 photos (Unsplash connector) | ✓ Prompt 1 + Prompt 2 (scene map fitted to the film) in an isolated `claude -p` session; reviewed 1440 + 390 | ✓ live at `/live/halden` (click-through checked), `npm run check` ✓ | waiting for recording |
