# Build log — Raster School

How this site was made, step by step (see docs/plan-examples.md §3 and §5b). Example #22: a six-week evening course in
typographic design — Course / education · Swiss Modern · **still** · typography. Made through the flow Library → You →
Direction → Recipe. Its engine test: the first still site — does it feel alive through the seasoning alone (smooth
loaders, the look's micro-interactions, no parallax), with a course's own parts and worst-case content?

## 1. Recipe (2026-10-08)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — taken from three sites: from **Night Shift** its Process and Pricing (its Features was taken, then put
  back: it landed on Home, see Engine lessons 3); from **Sela Mor** its Schedule; from **Brasshand** its Manifesto and
  Team. No effects (a still site). Then **Build my site**.
- **You** — name "Raster School"; one sentence "A six-week evening course in typographic design: grids, lettering and
  a poster of your own at the end. Twelve seats a cohort, in our studio or online."; What are you making: **Something
  online** → Course / education (read from the sentence).
- **Direction (Make it yours)** — Look: **Swiss Modern** (Bold filter); Colours: **Klein Field** (the whole page
  ultramarine, white type, a pink signal — previewed against Signal White and Signal Orange: a still site gets its
  energy from colour); Lettering: **Grid Discipline** (Zalando Sans). Pages came from the kind of site: Home (Hero,
  Manifesto, Process, Team, Testimonials, Pricing, Schedule, FAQ, Closing CTA) · Curriculum · Enrol · Instructor · FAQ.
- **Next: Recipe** → sent to the user's browser by link (`/studio/open?recipe=…`), approved ("gettik. başla").
- The exact spec, with what was taken (`taken`): `opuskit.json`

## Engine lessons

1. **Fixed before the build:** the flow could not reach a still site — no look was still by default and no example is
   still, so "Movement" could never be taken as still. Swiss Modern (functional motion only) is now still by default.
2. **Fixed before the build:** the sentence reader read this course as a shop: "in our studio or online" — a bare
   "online" counted as selling and tied with "course", and the shop came first. A bare "online" no longer sells (only an
   online shop or store does); the course words grew (cohort, curriculum, enrol, students, academy…). check.ts.
3. **Open:** taken parts gather on Home. "Explain what you offer" is one wide job (curriculum, process, feature grid,
   pricing…), so Night Shift's Features — taken from its Curriculum page — found Home's Process first and was added to
   Home as a tenth part instead of going to Curriculum.
   Answered by decision 52 (2026-10-08): a site now lends only its signature parts; Features, Process, Pricing and
   Team are the engine's, and a taken part never replaces what the kind of site needs. (This recipe was made before:
   it keeps what it took.)
4. **Open:** a course is drawn in the software world (`worldFor`): Direction and the recipe page show "Connect your
   bank" and €9 / month on a typography school.
5. **Fixed after the build:** "tabular figures for prices and counts" — in Zalando Sans the tabular set is another
   style (a slashed zero, typewriter widths), so the builder dropped it. Interaction craft now says: look first; if the
   face's tabular set changes the figures' look, keep its own figures and hold the width with a fixed-width box.
6. **Fixed after the build:** a course's default menu was the Floating pill, on a Sharp site — the only rounded thing
   on it. A pill menu is no longer the default on a site with square corners (classic bar instead); check.ts.
7. **Process:** in `claude -p` the session waited on its own dev server after its final reply and ended only when that
   was stopped. Every later prompt asks it to stop the dev server before replying (`docs/plan-examples.md` §3).

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/Desktop/projects/raster-school`, outside the OpusKit repository.
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder
SVGs were removed. Then `npm install` (no extra packages: a still site ships no motion library). The package is the
first with the `interaction-craft` skill and the recipe's Seasoning (decisions 50, 51).

## 3. Prompts to Claude Code

Fully isolated, like Maison Vey, Halden, Low Hum and Pale Hour: a separate Claude Code session (`claude -p`, Claude
Opus 5.5) started inside the project folder, outside the OpusKit repository, with only the project's own settings
(`--setting-sources project,local`), `--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-08)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one run (~70 min, $8.52 reported, 670 transcript lines): Home, Curriculum, Enrol, Instructor, FAQ and a
404; production build and lint clean; checked by the builder at 1440 and 390 px (and 320–1728 for overflow, with names
~40% longer). Its moments: a live Basel studio clock in the menu row and the page's 12 columns drawn behind every page
(Home); "Poster in six frames" — one A2 poster drawn six times, each week adding its layer (Curriculum); "Twelve seats,
twelve columns" — the cohort's seats as grid columns, redrawn per cohort (Enrol); the instructor's name split to both
page edges (Instructor); "Ask it in your own words" — the search typed at display size with a live count (FAQ); the
footer's name cut by the page edge; a 404 "off the grid". Two deviations it named: no tabular figures (Zalando Sans's
tabular set has a slashed zero), and the picked floating pill menu is the only rounded thing on a sharp site.
The session then waited on its own dev server and only ended when that was stopped (Engine lessons 7).

## 4. Media

5 photos found and picked by Claude through the Unsplash connector, by the shot list — four black-and-white studio
portraits for the team, and hands inking a letterpress forme for the Instructor page — one grade (black and white), in
`media-src/` (sources in `media-src/SOURCES.md`), copied over the temporary files of the same names.

### Prompt 2 (2026-10-08)

```
My photos are in public/media/ now, under the same names. Update src/config/assets.ts and assets/manifest.json: status 'have' for team and about, no Temporary badge, and alt text from what each real photo shows — team-1: a woman with short curly hair in a dark top, black and white; team-2: a bearded man in a white shirt, black and white; team-3: a woman with a silver necklace and cuff, her hand at her chin, black and white; team-4: a man in a white open-collar shirt, seated, black and white; about: hands inking a letterpress forme with a roller, black and white.

The about photo shows hands at a press, not Mira Vogt: its caption must not say it is her. Caption it as what it shows, in the site's voice.

Check both pages with the photos at 1440 and 390, run the production build, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Prompt 2 finished in one resumed run (25 turns, ~2.5 min, $10.30 reported): status `have` and per-photo alt text in
`src/config/assets.ts` and the manifest, no Temporary badge, the Instructor caption now "Inking the forme. One pass of
the roller over the locked-up type, before every pull." It cleared `.next/cache/images` (same file names), and
stopped its dev server before replying.

## 5. Registration (2026-10-08)

Moved from `~/Desktop/projects/raster-school` into `examples/raster-school/`. `opuskit.json` keeps the menu it was built
with (`nav: floating-pill`: the default then; engine lesson 6 changed the default after). Registered in
`src/data/examples.ts` (title and summary from the site's own metadata); `public/examples/raster-school` symlink; card
`public/examples/raster-school.jpg` and the hero still `public/media/poster.jpg` (its first screen, 1440×900);
`npm run examples`; live export at `/live/raster-school` (media patched to `/examples/raster-school/media/`), checked by
a click-through from the menu (every page renders, photos load; only aborted link prefetches, as on Pale Hour);
`npm run check` ✓. Clips wait for the user's screen recording.
