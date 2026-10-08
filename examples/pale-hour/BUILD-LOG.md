# Build log — Pale Hour

How this site was made, step by step (see docs/plan-examples.md §3). Example #21: a photography gallery and bookshop
— event (Gallery or museum) · Art Editorial · dynamic. Made through the flow Library → You → Direction → Recipe.

## 1. Recipe (2026-10-08)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — taken from three sites: from **Sela Mor** its Featured Work, Schedule and the effect "Photos follow
  the cursor"; from **Fieldhouse** its Gallery and "Tap to open large"; from **Slow Atlas** its Journal and
  "Cut-out headline". Then **Build my site**.
- **You** — name "Pale Hour"; one sentence "A photography gallery and bookshop in an old print works: three
  exhibitions a year, talks on Thursdays, photobooks to take home."; What are you making: **A place or an event**.
- **Direction (Make it yours)** — Look: **Art Editorial** (Editorial filter); Colours: **Gallery Grey** (over the
  look's own Limestone, which is cream); Lettering: **Cut Glass** (Prata + Public Sans, over Printed Word). Pages came
  from the kind of site and the sentence: Home (Full-bleed photo with depth, Intro, Featured Work, Schedule, Journal) ·
  Exhibitions (Featured Work, Gallery) · Visit (Location, Schedule, FAQ) · About (About, Team).
- **Next: Recipe** → saved, sent to the user's browser by link (`/studio/open?recipe=…`), approved ("indi başla").
- The exact spec, with what was taken (`taken`): `opuskit.json`

What making it fixed in OpusKit first (decision 46): the sentence reader knew no galleries and only the singular
"exhibition", so the site came out as a restaurant (Menu, Reservations, "Book a table"); now a gallery is an event
venue with its own start (Home, Exhibitions, Visit, About) and a visit as its goal ("Get directions").

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/Desktop/projects/pale-hour`, outside the OpusKit repository.
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder
SVGs were removed. Then `npm install` and the package's `npm i motion`.

## 3. Media

Built with temporary pictures (Prompt 1). Then 23 photos found and picked by Claude through the Unsplash connector,
by the shot list, saved over the temporary files of the same names (no code changed): one cool, quiet daylight, one
shared grade; the exhibitions' own works as photographs (The Quiet Rooms in black and white, Salt Roads toned warm
grey), the team as one black-and-white series. Sources in `media-src/SOURCES.md`. Known compromises: no free photo of
a talk with a speaker (gallery-5 is the empty chairs), and the hanging photo (journal-3) is a domestic room.

## 4. Prompts to Claude Code

Fully isolated, like Maison Vey, Halden and Low Hum: a separate Claude Code session (`claude -p`, Claude Opus 5.5)
started inside the project folder, outside the OpusKit repository, with only the project's own settings
(`--setting-sources project,local`), `--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-08)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3021 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one run (122 turns, ~29 min, $9.00 reported): Home, Exhibitions, Visit, About and a 404. Remembered
moments: on Exhibitions a line drawing of the print works' ground floor whose eight numbered marks follow the
visitors' walk; on Visit the week drawn as a timetable with a live "now" line ("Open now, until 21:00"); on About
"Since 1891 this hall has printed…" holding still while the words change with the years and end on photographs.
Invented facts marked `PLACEHOLDER` in `src/content/site.ts`.

Review (Claude, production build, 1440 + 390): no horizontal overflow, no console errors, no failed requests on any
page; keyboard focus visible (underline). Found: the copy named a real publisher ("MACK").

### Prompt 2 — media + fix round 1 (2026-10-08)

The same isolated session, resumed (`claude -p --resume`, same flags):

```
My photos are in: every file in public/media/ is now the real picture, same names and sizes (credits in media-src/SOURCES.md). Mark them all real, not temporary, in assets/manifest.json and src/config/assets.ts. Look at each photo and make its alt text and caption describe what it really shows, keeping the site's own words where they still fit. Check the first screen with the real photo: the headline must stay easy to read where it sits, on desktop and on the phone crop.

Also: no real brands in the copy. The book signing names a real publisher ("MACK") — use a made-up imprint or none.

Then run the production build and check every page at 1440 and 390 again.
```

Finished (73 turns, ~16 min, $14.76 reported): every photo marked real; alts and captions rewritten from what each
photo shows (and the copy around them where it no longer held — The Quiet Rooms' "beds still made" became "a chair
still under the window"); the first screen's dark fade replaced by a pale wash in the page's grey with black type,
since the hall photo is bright (headline ≥ 6:1 measured from 360 to 1920 px); the publisher name removed; Visit's
way-in photo loads first (AVIF on). Reviewed again by Claude at 1440 + 390: no errors, no failed requests.

### Prompt 3 — fix round 2 (2026-10-08)

The live export showed the cursor trail and the lightbox without pictures: the build wrote `/_next/image?url=…`
addresses by hand (`sized()` in `src/config/assets.ts`, the Lightbox), which only exist on a running Next server.
The same isolated session, resumed outside the repository (a first try was started by mistake from inside
`examples/pale-hour/` and stopped within seconds, before it read or changed anything):

```
One more fix: the site must also work when exported as static HTML (next.config with output 'export' and images unoptimized), the way it will be shown. Right now sized() in src/config/assets.ts and the Lightbox build /_next/image?url=… addresses by hand, and those only exist on a running Next server, so in the export the cursor trail and the lightbox lose their pictures. Make every picture go through next/image's own address logic (for example getImageProps), so it follows whatever next.config says. Don't change next.config.ts. Then run the production build and check the cursor trail and the lightbox still work at 1440 and 390.
```

Finished (22 turns, ~5 min, $16.99 reported): `sized()` and the Lightbox take their addresses from `getImageProps`,
no hand-written optimiser address is left; the trail preloads only once a mouse enters the first screen. Checked by
the build in a throwaway static export, then by Claude on the real live export (`/live/pale-hour`): trail and
lightbox show their pictures, click-through from the menu, no failed requests. The lesson went into every Build
Package (a rule in `build-packages/shared.ts`).

## 5. Registered (2026-10-08)

`src/data/examples.ts`, `public/examples/pale-hour` symlink, card `public/examples/pale-hour.jpg`, `npm run examples`,
live export at `/live/pale-hour` (click-through from the nav checked in a real browser), `npm run check` ✓.
