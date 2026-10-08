# Build log — Low Hum

How this site was made, step by step (see docs/plan-examples.md §3). Example #19: a listening bar — records, a big
hand-built sound system, small plates — restaurant · Retro Seventies · dynamic. The first example made through the new
flow: Library → You → Direction → Recipe (decisions 35–43 in docs/plan-library.md; no Pages screen).

## 1. Recipe (2026-10-08)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — taken from three sites: from **Fennwood** its first screen (Photo with depth), Menu and Reservation;
  from **Lowfield Nights** its Schedule and the effect "Words that arrive"; from **Inkwell & Moth** the effect
  "Prints on a desk". Then **Build my site**.
- **You** — name "Low Hum"; one sentence "A listening bar with ten thousand records, a hand-built sound system and
  small plates until late."; What are you making: **A place or an event** (→ Restaurant).
- **Direction (Make it yours)** — Look: **Retro Seventies** (from the Bold filter); Colours: **Espresso** and
  Lettering: **Soft Seventies** (Gloock + Figtree), both the look's own and kept. Pages came from the kind of site and
  the sentence: Home (Full-bleed photo with depth, Intro, Menu, Schedule, Reservation) · Menu (Menu, Gallery with
  Prints on a desk, Reservation) · Reservations (Reservation, Location, FAQ); Words that arrive on every page.
- **Next: Recipe** → saved (`/result/d1a61c18`). Approved by the user ("gettik").
- The exact spec: `opuskit.json`

What the walk-through fixed in OpusKit on the way (same day): the You and landing copy still promised "your site,
three ways"; Direction's "From …" line named only whole looks and qualities (now every part and effect, by site); a
taken part that replaced one after the page's booking landed below it (Schedule under Reservation — now moved above,
tested in check.ts); the recipe page's first-screen preview spoke in sample words (now the owner's sentence, pages
and main action).

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/Desktop/projects/low-hum`, outside the OpusKit repository.
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder
SVGs were removed. Then `npm install` and the package's `npm i motion`.

## 3. Media

Built with temporary pictures (Prompt 1). Then 11 photos found and picked by Claude through the Unsplash connector,
by the shot list, saved over the temporary files of the same names (no code changed): one warm, low, amber light
across ten photographers, one shared grade; sources in `media-src/SOURCES.md`. Known compromises: the record wall in
the first screen shows real (not famous) classical sleeves; no usable photo of a drink beside a record sleeve was
found, so gallery-7 is a drink and carafe on the bar.

## 4. Prompts to Claude Code

Fully isolated, like Maison Vey and Halden: a separate Claude Code session (`claude -p`, Claude Opus 5.5) started
inside the project folder, outside the OpusKit repository, with only the project's own settings
(`--setting-sources project,local`), `--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-08)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3020 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one run (136 turns, ~25 min, $7.80 reported): Home, Menu, Reservations and a 404. Remembered moments: the
first screen's drifting photo under "loud world? low hum."; the menu as two sides of a record (Side A plates, Side B
drinks) with a record sliding out of its sleeve; the booking form pressed onto a 45's label, the tonearm swinging over
on send. Invented facts marked `PLACEHOLDER` in `src/content/site.ts`; the form opens the visitor's email app (no
fake booking). It edited the reference sections, the DragPhotos piece and shadcn components in place.

Review (Claude, production build, 1440 + 390): no horizontal overflow, no console errors, no failed requests on
any page. Found: keyboard focus nearly invisible (`:focus-visible { outline: none }`; the logo link showed no change).

### Prompt 2 — media + fix round 1 (2026-10-08)

The same isolated session, resumed (`claude -p --resume`, same flags):

```
My photos are in: every file in public/media/ is now the real picture, same names and sizes (credits in media-src/SOURCES.md). Mark them all real, not temporary, in assets/manifest.json and src/config/assets.ts. Look at each photo and make its alt text and caption describe what it really shows — some differ from the shot list (gallery-7 is a drink and a carafe on the bar, no record sleeve; gallery-6 is people at the bar seen through the window; gallery-3 is snacks and beer on the bar). Check the first screen with the real photo: the headline must stay easy to read where it sits, on desktop and on the phone crop.

Also: keyboard focus is not visible enough. The logo link shows no change at all when focused, and buttons only lighten slightly. Make focus clearly visible on every link, button, tab, picker and form field, in the site's own style, without bringing back the browser's default ring.

Then run the production build and check every page at 1440 and 390 again.
```
