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

- **No fake examples.** Every site is made the way a user would make it: **Library → You → Direction → Recipe → Build
  Package → Claude Code** (the flow since #19; #17–#18 went through the older Brand / Pages screens, #1–#16 the kit).
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
| 1 | Claude | Builds the recipe **through the flow** in a real (headless) browser, as a user would: take a site's signature parts in the Library (decision 52), You (name, sentence, kind), Direction (look, colours, lettering — palettes previewed by fit), Next: Recipe; sends it to the user as a `/studio/open?recipe=…` link. The user approves. |
| 2 | Claude | Writes the media brief (§5): photos Claude will find, and the shot list for any film or sound the user picks. |
| 3 | Claude + user | Claude downloads photos into `media-src/` (sources in `media-src/SOURCES.md`), resizes them (≤ 2400 px long side, JPEG q82) into `public/media/`. The user drops films/sound into the project root or `media-src/`. |
| 4 | Claude | `create-next-app@16.3.8` (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install --disable-git`), **`turbopack.root` pin in `next.config.ts` before any install/build**, `scripts/build-package.ts spec.json examples/{slug}`, keep `build/` out of `.gitignore`, remove the placeholder SVGs, `npm install`, the package README's `npm i …`. Films through `bash scripts/prepare-video.sh`. |
| 5 | Claude Code | A fresh subagent builds it from the package with the prompt in `BUILD-LOG.md` (it is told only: stay inside the folder, read CLAUDE.md and AGENTS.md, its port, never touch the `turbopack.root` line; in a `claude -p` session also to stop its dev server before its final reply — otherwise the session waits on it and never ends, #22). Resumed with "continue where you left off" after a limit; logged. |
| 6 | Claude | Review: production build, 1440 px + 390 px in a real browser, overflow, console errors, failed requests. Fix prompts only (1–2 rounds). Fixes to shipped pieces/sections go into OpusKit's own sources too. |
| 7 | Claude + user | Feed back (decision 33 in `docs/plan-library.md`): compare each section the builder made with its source in `src/sections/`. Where the build made it clearly better (layout, states, motion, a11y), list it and **ask**; once approved, bring it back as a fix or a new `variant` (tokens and props only, `npm run pieces`, `npm run check`). So the clip shows what a collector gets. |
| 8 | Claude | Registration: `src/data/examples.ts` (title/summary from the site's own `<title>`/meta, `choices` with exact option names), `public/examples/{slug}` symlink, card screenshot `public/examples/{slug}.jpg`, `npm run examples`, live export (AGENTS.md "Showing one on the site"), click-through from the nav in a real browser, `npm run check`. |
| 9 | User + Claude | Clips: the user screen-records the live export into `media-src/recording/` (kept on disk, not committed). Claude cuts with ffmpeg: site clip 10–15 s (first screen + scroll); section clips 3–5 s **standing still**, framed on the section (never scrolling past); small effects zoomed in (still 16:9 crop, 2–4×); never a pasted or patched frame. `pieceClips` and `signatureClips` for effects and big-idea moments. `npm run check` asserts each clip exists and the site really has that thing. |

Removing an example: `examples/{slug}/`, the symlink + `{slug}.jpg`, `public/live/{slug}/`, `public/downloads/{slug}.zip`,
its `examples.ts` entry; grep for `/examples/{slug}` (kit sample photos use some sites' media); `npm run examples`,
`npm run check`.

## 4. The built sites — what is open

All twenty-five are built, registered and live. Open:
- **Clips for #11–#25** (Inkwell & Moth, Kür Delta Watch, Night Shift, Aster House, Sela Mor, QUM, Fieldhouse, Maison Vey, Low Hum, Halden, Pale Hour, Raster School, Kelp Line, Pip & Kiln, Ninth Row):
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

## 5b. Next sites (#22–#25, 2026-10-08) — examples that also strengthen the engine

The user (2026-10-08): the next sites are made for two things at once — a premium example in a look no example has
yet, and a stronger engine. So each site carries one **engine test**: something no build has tried, chosen so the
build shows where the recipe is silent, contradicts itself or falls short. After each build, before registering:
compare the Build Package with the built code (as `docs/review-engine-2026-10-07.md` did), write the gaps into the
site's `BUILD-LOG.md` → Engine lessons, fix them in the engine with a check.ts regression, and only then start the next
site — so every site is built on what the one before it taught.

Made through the flow (Library → You → Direction → Recipe), approved by the user from a `/studio/open?recipe=…` link,
built in an isolated `claude -p` session outside the repo. Photos: Claude (Unsplash connector); films: the user.

| # | Site | Kind | Look (new) · motion · lead | Media | Engine test |
|---|---|---|---|---|---|
| 22 | **Raster School** — a six-week evening course in typographic design: grids, lettering, a poster at the end | Course / education | Swiss Modern · **still** · typography | ~10 photos (Claude): studio, posters on walls, hands at work | The first **still** site: does it feel alive through the seasoning alone — loaders, Swiss micro-interactions, no parallax? A course's own parts (curriculum, schedule, pricing, enrol form) and worst-case content (long module names, a sold-out cohort, zero seats left) |
| 23 | **Kelp Line** — volunteers replanting kelp forests on a cold northern coast; dives, beach days, a planting count | Nonprofit / cause | Coastal Calm · subtle · photography | ~20 photos (Claude): underwater kelp, divers, shoreline, hands with seedlings | **Donate** as the main action (form, amounts, what each buys), **numbers** that change (stats, a running count — tabular figures), events with dates, the **subtle** parallax dose (one picture on the whole site) |
| 24 | **Pip & Kiln** — bright glazed mugs, plates and vases from a two-person pottery; Saturday workshops | E-commerce | Playful Pop · dynamic · product | ~30 photos (Claude): product shots on colour, the studio, glazing | A **whole shop** through the flow: product grid, product page, cart, checkout, the cart micro-interactions, out of stock, one product in a category; the sentence's “workshops” adds a page (`pagesFromWords`); product photos per item from the shot list |
| 25 | **Ninth Row** — a 120-seat arthouse cinema: the month's programme, a late-night series, tickets | Event (cinema) | Film-inspired · immersive · video | a film (the user — own footage of a projector, seats, a lit screen; no film/TV footage), ~12 photos (Claude) | **Listings**: a programme with long titles, sold-out and cancelled screenings, an empty week; title cards between chapters; the **immersive** parallax dose next to a film first screen; is a cinema read as an event venue (decision 46)? |

Order: 22 → 23 → 24 → 25 (the user's film last). Palettes and lettering picked by fit in Direction, previewed on the
page. Each concept is international and invented (no Azerbaijan theming, no real brands or logos in the photos).
Still open for later: Victorian, Surrealism, Synthwave, Y2K Chrome, Pixel Art, Maximalism, Bohemian, Soft Pastel,
Swiss Editorial, Fashion Editorial, Raw Editorial, Art Direction, Immersive Portfolio, Conceptual Sketch, Cyberpunk,
Warm Hospitality — and the kinds with one example (real estate, personal brand, clinic, blog, SaaS).

## 5c. Next sites (#26–#29, proposed by the night run 2026-10-09) — waiting for the user's approval

Written by the night run when §5b ran out (#25 Ninth Row waits for the user's film). Same rules as §5b: a look no
example has yet, a kind with only one example, one engine test each; photos by Claude (no film or sound needed, so a
night run can build them once approved). Nothing here is built until the user approves the batch.

| # | Site | Kind | Look (new) · motion · lead | Media | Engine test |
|---|---|---|---|---|---|
| 26 | **Tidewell Physio** — a sports physiotherapy clinic for rowers and climbers by a harbour; three practitioners | Clinic | Soft Pastel · subtle · photography | ~12 photos (Claude): treatment rooms, hands on a shoulder, a rowing boat at dawn, practitioners | **Appointments**: a practitioner and a time slot, prices per treatment, what insurance covers; worst case — no slots this week, a practitioner on leave, a long treatment name; is a physio read as a clinic, not a spa (decision on Halden)? |
| 27 | **Hollis & Daughters** — a small estate agent selling restored Victorian terraced houses | Real estate | Victorian · subtle · photography | ~24 photos (Claude): façades, staircases, fireplaces, street views | **Listings**: filters, a page per house with its own photo set (per-item shots), Sold / Under offer states, a floor-plan block, a viewing request; one house in a filter, none in another |
| 28 | **Ines Varga** — a freelance cartographer drawing illustrated maps for towns, trails and books | Personal brand | Conceptual Sketch · dynamic · illustration | drawn work the builder makes (no stock), ~4 photos (Claude): desk, hands, inks | An **illustration lead**: does the shot list ask for drawings, not photos? A commissions form with a brief and a budget, a work index, sketches drawn in the page's own line |
| 29 | **Tally House** — an app for shared flats: bills, chores and the shopping list in one place | SaaS | Y2K Chrome · immersive · product | app screens the builder draws (no stock), ~4 photos (Claude): a shared kitchen | **Pricing** monthly/yearly with a feature table, app screens as product shots, sign-up and log-in states, integrations; the **immersive** dose without a film |

Order: 26 → 27 → 28 → 29. Concepts are invented and international (no Azerbaijan theming, no real brands or logos).

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
| 19 | Low Hum | ✓ the new flow, Library → You → Direction (no Pages screen): parts from Fennwood (first screen, Menu, Reservation), Lowfield Nights (Schedule, Words that arrive), Inkwell & Moth (Prints on a desk); Restaurant; Retro Seventies · Espresso · Soft Seventies; Home · Menu · Reservations — approved 2026-10-08 | ✓ 11 photos (Unsplash connector, `media-src/SOURCES.md`) | ✓ Prompt 1 + Prompt 2 (photos, alts, readable first screen, visible focus) in an isolated `claude -p` session; reviewed 1440 + 390 | ✓ live at `/live/low-hum` (click-through checked), `npm run check` ✓ | waiting for recording |
| 20 | Halden | ✓ via the Library (blank → Health & wellness; Dark Cinematic · Charcoal Signal · Opening Credits; Home: Film on the first screen, Services, How It Works, Gallery, Testimonials (Wall), Pricing, Location, Reservation · The baths · Visit · FAQ · Sign In · Sign Up; Smooth scroll + Scroll progress, both by the user) — saved 2026-10-07 | ✓ the user's film (drone over fog, 4K) via `prepare-video.sh`; 21 photos (Unsplash connector) | ✓ Prompt 1 + Prompt 2 (scene map fitted to the film) in an isolated `claude -p` session; reviewed 1440 + 390 | ✓ live at `/live/halden` (click-through checked), `npm run check` ✓ | waiting for recording |
| 21 | Pale Hour | ✓ the flow: parts from Sela Mor (Featured Work, Schedule, Photos follow the cursor), Fieldhouse (Gallery, Tap to open large), Slow Atlas (Journal, Cut-out headline); A place or an event → Gallery or museum (decision 46); Art Editorial · Gallery Grey · Cut Glass; Home · Exhibitions · Visit · About — approved 2026-10-08 | ✓ 23 photos (Unsplash connector, `media-src/SOURCES.md`) | ✓ Prompt 1 + Prompt 2 (photos, readable first screen, no real brand) + Prompt 3 (no hand-written `/_next/image`, for the static export) in an isolated `claude -p` session; reviewed 1440 + 390 | ✓ live at `/live/pale-hour` (click-through checked), `npm run check` ✓ | waiting for recording |
| 22 | Raster School | ✓ the flow: parts from Night Shift (Process, Pricing), Sela Mor (Schedule), Brasshand (Manifesto, Team); Course / education; Swiss Modern · Klein Field · Grid Discipline · **still**; Home · Curriculum · Enrol · Instructor · FAQ — approved 2026-10-08 | ✓ 5 photos (Unsplash connector, `media-src/SOURCES.md`) | ✓ Prompt 1 + Prompt 2 (photos, alts, caption) in an isolated `claude -p` session; reviewed 1440 + 390; Engine lessons 1–7 in its BUILD-LOG | ✓ live at `/live/raster-school` (click-through checked), `npm run check` ✓ | waiting for recording |
| 23 | Kelp Line | ✓ the flow (night run 2026-10-09): parts from Kür Delta Watch (Timeline, Editorial Story), Lowfield Nights (Schedule), Velmira (Gallery, Tap to open large); Nonprofit / cause; Coastal Calm · Bottle Green · Letterpress Modern · subtle; Home · Our mission · Programs · Stories · Donate · Contact — **not approved yet** (link in its BUILD-LOG) | ✓ 21 photos (Unsplash connector, `media-src/SOURCES.md`; fetched on the user's machine 2026-10-09 — the cloud blocked the downloads) | ✓ Prompt 1 + Prompt 2 (one picture per story) in an isolated `claude -p` session; reviewed 1440 + 390; Engine lessons 1–7 in its BUILD-LOG | ✓ live at `/live/kelp-line` (click-through checked), `npm run check` ✓ | waiting for recording |
| 24 | Pip & Kiln | ✓ the flow (night run 2026-10-09): parts from Maison Vey (Product Grid, Collection, Product Highlight), Sticky Weather (Manifesto, Wavy underline), Inkwell & Moth (Prints on a desk); E-commerce; Playful Pop · Butter Yellow · Bubble Pop · dynamic; Home · Shop · Product · Cart · Checkout · Workshops — **not approved yet** (link in its BUILD-LOG) | ✓ photos (Unsplash connector, `media-src/SOURCES.md`; fetched 2026-10-09, the six plates re-picked); per-product sets are the owner's shoot | ✓ Prompt 1 in an isolated `claude -p` session; Prompt 2 (photos, 2026-10-09); Prompt 3 + 4 (2026-10-10: a first screen of layers — the giant word and a cut-out Flow mug); reviewed 1440 + 390 and the shop walked through; Engine lessons 1–5 in its BUILD-LOG | ✓ live at `/live/pip-kiln` (click-through checked), `npm run check` ✓ | waiting for recording |
| 25 | Ninth Row | ✓ the flow: Halden's film first screen and Smooth scroll, Lowfield Nights' Schedule, Curtain between pages and Big name footer; A place or an event → Cinema or theatre (decision 54); Film-inspired · Grading Suite · Tall Order; Home · Programme · Tickets · Visit · About — approved 2026-10-09 | ✓ the user's film (Google Flow, prepare-video.sh --upscale footage); 10 photos (Unsplash connector) | ✓ Prompt 1 + Prompt 2 (photos, invented films, Big name footer) in an isolated `claude -p` session; reviewed 1440 + 390 | ✓ live at `/live/ninth-row` (click-through checked), `npm run check` ✓ | waiting for recording |
| 26–29 | Tidewell Physio, Hollis & Daughters, Ines Varga, Tally House | proposed (§5c), waiting for the user's approval | | | | |
