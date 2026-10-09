# Build log — Ninth Row

How this site was made, step by step (see docs/plan-examples.md §3). Example #25: a 120-seat arthouse cinema —
event (Cinema or theatre) · Film-inspired · immersive · video. Made through the flow Library → You → Direction → Recipe.

## 1. Recipe (2026-10-09)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — from **Halden** its first screen (the film, scroll-controlled) and Smooth scroll; from **Lowfield
  Nights** its Schedule, Curtain between pages and its footer (Big name). Then **Build my site**.
- **You** — name "Ninth Row"; one sentence "A 120-seat arthouse cinema: new and old films every night, a late-night
  series on Fridays, tickets for every screening."; What are you making: **A place or an event**.
- **Direction (Make it yours)** — Look: **Film-inspired** (Cinematic filter); Colours: **Grading Suite**, the look's own
  (black, cream, a salmon accent — the film's warm red sits in it); Lettering: **Tall Order** (Sofia Sans Extra
  Condensed + Sofia Sans), compared with Printed Word and Halden's Opening Credits on the brand poster: a marquee face.
  Pages from the kind of site and the sentence: Home (the film, Intro, Schedule, Featured Work, Newsletter) ·
  Programme · Tickets · Visit · About; main action "Book tickets".
- **Next: Recipe** → saved, sent to the user's browser by link, approved ("gettik").
- The exact spec, with what was taken: `opuskit.json` (its footer set to Big name after the build — see §5).

The engine test ("is a cinema read as an event venue?") failed first and was fixed before the recipe (decision 54):
no cinema or screening was read, so the site came out a restaurant; as an event it got a festival's RSVP and "Book a
table". Now a cinema is an event venue with its own start (Programme, Tickets, Visit) and books tickets (`ctaFor`).

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/Desktop/projects/ninth-row`, outside the OpusKit repository.
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder
SVGs were removed. Then `npm install` and the package's `npm i lenis motion`.

## 3. Media

**The film is the user's**, made with Google Flow (8 s, 1280×720, 24 fps): a projector lamp ignites, the camera pulls
back low over rows of red velvet seats, and the screen fills with white light — one continuous move with three clear
scenes, no text or logos. Prepared before the build with the package's own `bash scripts/prepare-video.sh
media-src/projector-original.mp4 --upscale footage` (Real-ESRGAN, the people/fabric model): desktop 1920×1080, the
keyframe-dense scroll encode, a 9:16 phone encode and posters. The original is `media-src/projector-original.mp4`.

10 photos found and picked by Claude through the Unsplash connector after the build, by the shot list, saved over the
temporary files of the same names: the four programme strands (a bulb marquee, a 35mm strip, an audience before a
bright screen, a small red auditorium), the way in, a projector beam, four low-key portraits; one warm grade. Sources
in `media-src/SOURCES.md`. Known compromises: "CINEMA" appears on two signs; the film strip's maker name was blurred
out; the portraits are four photographers.

## 4. Prompts to Claude Code

Fully isolated, like Maison Vey, Halden, Low Hum and Pale Hour: a separate Claude Code session (`claude -p`, Claude
Opus 5.5) started inside the project folder, outside the OpusKit repository, with only the project's own settings
(`--setting-sources project,local`), `--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-09)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My film is in: scripts/prepare-video.sh has already turned it into the files in public/media/ under the names the asset layer expects (the original is media-src/projector-original.mp4 — a projector lamp ignites, the camera pulls back over rows of red seats, and the screen fills with white light). Watch it and write the scene map from what it really shows.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3024 for the dev server, and stop any dev server you started before your final reply. Never remove or change the turbopack.root line in next.config.ts.```

Finished in one run (146 turns, ~25 min, $8.97 reported): Home, Programme, Tickets, Visit, About, Privacy and a 404.
The scene map written from the film (`src/config/scenes.ts`): Lamp (0–2 s) "The lamp is lit every night" · Rows
(2.4–4.4 s) "120 seats. Count nine back." · Screen (4.8–6.2 s) "On Fridays it runs late" · Light (6.7–8 s) "Tickets for
every screening", with a running timecode in the corner. Remembered moments: a doors countdown on Programme, a plan of
all 120 seats on Tickets (the ninth row named), the way-in photo opening like a film frame with the facts as credits on
Visit, a projector beam widening across the team on About. Bookings and the newsletter open the visitor's email app.

### Prompt 2 — media + fix round 1 (2026-10-09)

The same isolated session, resumed (`claude -p --resume`, same flags):

```
My photos are in: every file in public/media/ is now the real picture, same names and sizes (what each shows and its credit are in media-src/SOURCES.md). Mark them all real, not temporary, in assets/manifest.json and src/config/assets.ts. Look at each photo and make its alt text and caption describe what it really shows, keeping the site's own words where they still fit.

Two more changes:
1. No real films or people anywhere in the copy. The programme names real films and famous directors (Paris, Texas; Stalker; In the Mood for Love; Wong Kar-wai and others). Replace every one with an invented film and an invented director, in the same spirit (an old classic in a restoration, a new release in its first week, a late-night cult film, a Sunday matinee for families), and keep them marked PLACEHOLDER.
2. The footer is the one I took from another site, "Big name", not "Signature columns": links and contact in one row at the top, then the name Ninth Row in the display face spanning the full container width (sized to fit, on one line), drawn as an outline in the text colour, not filled; copyright and legal small underneath. On the page ground. Keep everything the footer holds now (the next film, the links), and on phones the links wrap in two columns while the name still spans the width.

Then run the production build and check every page at 1440 and 390 again — the film, the photos, the footer — and stop any dev server you started before your final reply.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3024 for the dev server. Never remove or change the turbopack.root line in next.config.ts.```

Finished (37 turns, ~7.5 min, $14.39 reported): photos real, alts and captions from what each shows, a focal point per
photo; every real film and director replaced with invented ones (still PLACEHOLDER); the Big name footer (the name as
an outline across the width, on the page ground).

## 5. Engine lessons (fixed in the engine before registering — decision 55, check.ts)

1. Picking a look in Direction replaced the footer taken from Lowfield Nights (Big name → Signature columns): a taken
   menu or footer is now kept like taken colours and lettering (`keptByName`). This site's `opuskit.json` was set to
   the Big name footer it was built with.
2. Verification said the footer was a dark band; layout.md put it on the page ground (a dark palette): verification now
   describes the footer as the recipe builds it.
3. The shot list asked a cinema for "one picture of each project": an event's Featured Work pictures its programme
   strands, never a still from a real film (`SHOTS_BY_PURPOSE`).
4. The copy filled the programme with real films and famous directors: invented content is invented outright.
5. (Before the build, decision 54) a cinema was not read as an event venue.

## 6. Registered (2026-10-09)

Moved into `examples/ninth-row/`; `src/data/examples.ts` (title and summary from the site's own metadata, the film as
its hero); `public/examples/ninth-row` symlink; card `public/examples/ninth-row.jpg`; `npm run examples`; live export
at `/live/ninth-row` — click-through from the menu checked in a real browser (no failed requests, every button shows
the pointer, the film scrubs with the scroll); `npm run check` ✓.
