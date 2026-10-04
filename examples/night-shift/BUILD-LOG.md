# Build log — Night Shift

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #13 of docs/plan-for-fit.md §11: futuristic / technical-minimal, 3D/WebGL first screen, immersive, course.

## 1. Recipe (2026-10-04)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `addSection`, `removeSection`,
`togglePiece`, `setPagePurpose`), the same calls the kit UI makes, then loaded into `/kit` and shown to the user. Approved
by the user ("gettik").
- Kind of site: Course · name "Night Shift" · about "An eight-week online course in film colour grading, taught live by
  a working colourist: from flat log footage to a finished grade, one real shot at a time." · goal: Sign up
- Look: Technical Minimal · colours Wet Slate · lettering Control Room · shape Hairline (the look's own) · first screen:
  3D / WebGL scene · movement: Immersive
- Big idea: A live console → Labels that decode (Curriculum — Features), A live status line (the menu)
- Menu: Floating dock · footer: Say hello
- Behaviour: links — Scrambled labels; headlines, main button, between pages, whole site — none
- Pages: Home (hero → intro → case study with Before / after → process → about → testimonials → pricing → FAQ →
  closing CTA), Curriculum (feature grid → process → case study with Before / after → FAQ; its brief: "Show the eight
  weeks: what each module covers, the lessons in it, the real shot students grade that week, and what they hand in."),
  Enrol (pricing → FAQ → testimonials), Instructor (about → stats → testimonials), FAQ (FAQ → closing CTA)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

8 photos from Unsplash, picked by Claude with the Unsplash connector (sources and the brand check in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`; `suite.jpg` had the monitor maker's logo painted over (`media-src/retouch.py`). The three film clips are
the user's picks.

Film: the user's three clips (`media-src/clip-1..3.mp4`). Clip-1 (a night street) shows two readable brand signs
through the whole shot, so it is used only as one still cropped clear of them. From the clips Claude made the graded
stills `grade-1..3.jpg`, their flat "log" versions `log-1..3.jpg` (the before/after pairs), and `monitor.mp4` (clip-2,
8 s, 1280 px) for the console's monitor — commands in `media-src/SOURCES.md`.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-04)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for #11, #12 and #15. It
was given only: "work inside `examples/night-shift/` as the project root, never edit files outside it; read its
CLAUDE.md and AGENTS.md first; port 3001 is taken, use port 3010 for its dev server; never remove or change the
`turbopack.root` line in next.config.ts (`output: 'export'` and `images: { unoptimized: true }` may be added)" — then the
prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

The first screen is a grading console, built in code as a real-time 3D scene: a dark desk under a slate-grey room light, a monitor playing public/media/monitor.mp4 (a golden-hour shot), three colour wheels (lift, gamma, gain) and two scopes — a waveform and a vectorscope — glowing beside it. The wheels turn a little and the scopes shift as the pointer moves, and scrolling slowly pushes the camera in towards the monitor. If you can, let the scopes read the real frame on the monitor. The course name and one line sit over it in HTML, not inside the canvas. Render a poster of the scene for phones, reduced motion and slow connections.

The before/after pairs are in public/media/: log-1.jpg / grade-1.jpg (a night street), log-2.jpg / grade-2.jpg (a golden-hour portrait), log-3.jpg / grade-3.jpg (a dim room with mixed lamp and window light). The log one is the flat camera file, the grade one is the finished frame. Use them with the before/after slider: one pair on Home ("one shot, before and after") and all three on Curriculum, as the shots students grade.

My photos are in public/media/ (where each one comes from is in media-src/SOURCES.md):
- instructor.jpg — me, the colourist who teaches the course. For the Instructor page and the about part on Home.
- student-1.jpg, student-2.jpg — two students from the last cohort, for their quotes.
- suite.jpg — a grading suite at night; scope.jpg — a curve on a scope, close up. For the intro and the curriculum.
- set-1.jpg, set-2.jpg, set-3.jpg — film sets: where the footage comes from. Use them where they fit.

Night Shift is eight weeks, live on Tuesday and Thursday evenings, twelve students per cohort. Invent my name, my credits (feature films, series and ads I graded — made-up titles), the eight modules with their lessons, the price, the next cohort's date and the students' names and quotes — real-sounding, made up. The live status line in the menu says when the next cohort starts and how many seats are left.

I don't have a logo yet — make a simple one for Night Shift.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Prompt 1 stopped early (2026-10-04): the subagent's rewrite of `src/config/assets.ts` was rejected by the permission
check, and it stopped to wait for the user. Done by then: dependencies (three, @react-three/fiber, lenis, react-hook-form,
zod), shadcn/ui set up and restyled to the recipe, `tokens.css` and `globals.css`. Not yet built: pages, the 3D hero,
posters. The generated `assets.ts` did not compile — a kit bug: the 3D hero's "3D model or scene" row became the key
`3dModelOrScene`. Fixed in OpusKit (keys that would start with a digit get a word first: `asset3dModelOrScene`; a check
in `scripts/check.ts`).

On the user's "davam", Claude resumed the same subagent with this message, word for word:

```
The user said to continue ("davam"): rewrite src/config/assets.ts as you planned (every file in public/media/ plus the two console posters you will render), then carry on with the rest of the build — the logo, the five static pages from the ready sections, the R3F grading-console hero (scopes reading the real frame if you can, camera push-in on scroll), the posters, the dock with the live cohort status line, the enrol form, the motion — then the static export build, check 1440px and 390px in a real browser, start the dev server on port 3010 and reply as CLAUDE.md asks. Same rules as before: stay inside examples/night-shift/, never touch the turbopack.root line.
```

The session stopped again on an API limit (during the production build). On the user's "continue", Claude resumed the
same subagent with this message, word for word:

```
Your session was interrupted. Continue the build where you left off: check what's done against build/implementation-plan.md, finish the remaining steps, then run the production build, check 1440px and 390px in a real browser, start the dev server on port 3010 and reply as CLAUDE.md asks.
```

Result: every page built from the ready sections and kit pieces (Home, Curriculum, Enrol, Instructor, FAQ, a 404);
`next build` with `output: 'export'` passes, all routes static. Its own additions: the first screen as a real-time
three.js (R3F) grading console — a monitor playing the clip, three trackballs (lift, gamma, gain) on colour rings, a
waveform and a vectorscope that read the real frame (sampled from the video and graded with the same lift/gamma/gain the
pointer sets), the camera pushing in on scroll; posters rendered from the scene (`media-src/render-posters.mjs`) for
phones, reduced motion, weak devices and a lost GL context; a live status line (countdown to cohort 07 in Oslo time,
seats left, "Live now" during sessions); before/after pinned on Home and crossfading through three shots on Curriculum;
a dock menu; an enrol form that opens the visitor's mail app; a vectorscope-ring logo as the favicon. It reshaped ready
sections within the tokens (the case study as a pinned sequence) and changed no kit piece.

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): no console errors, no 4xx, no horizontal
overflow on any page; the console renders, its scopes move with the pointer. No fix round.

## 5. On OpusKit (2026-10-04)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names; the hero still is the poster rendered from the scene). `public/examples/night-shift` is a
symlink to this project's `public/`; the card is a 1440×900 screenshot of the live first screen with the console
running. `npm run examples` wrote its spec and `public/downloads/night-shift.zip`; the live export is in
`public/live/night-shift/` (code only, media paths pointed at `/examples/night-shift/media/`). Checked in a browser at
1440 px and 390 px: home, then the dock to Curriculum — no failed requests (only aborted prefetches); the monitor film
plays at 1440, phones get the poster. `npm run check` ✓. Clips: waiting for the user's recordings.

## 6. Fix round 1 — colours (2026-10-04)

The user did not like the colours (Wet Slate, a mid slate grey: the film looked muddy on it). Claude compared seven
palettes on the live export by swapping the colour tokens in the browser, and proposed one the library did not have:
**Grading Suite** — a grading-room black ground, warm white text, and the peach of the vectorscope's skin-tone line as
the one accent. The user agreed to add it to OpusKit ("əlavə et"); it was added to the library (technical-minimal,
dark-cinematic, film-inspired; `npm run check` ✓). The recipe was changed in the kit's way (palette → grading-suite) and
the package exported again into a scratch folder; only its recipe files went into this project — `recipe/color.md`,
`recipe/design.md`, `recipe/ui.md`, `CLAUDE.md`, two skills and `opuskit.json` — so the built `src/` stays the builder's.

### Prompt 2 (2026-10-04) — fix round 1

Sent to the same Claude Code subagent, word for word:

```
I changed the colours in OpusKit: the palette is now Grading Suite (recipe/color.md, CLAUDE.md and opuskit.json are updated). The slate grey made the films look muddy — a grading room is nearly black so the only colour on screen is the footage.

Apply it everywhere: src/styles/tokens.css and globals.css to the new tokens, and the 3D console too — the room, desk and monitor bezels should sit in the new near-black with only the screens, the colour rings and the scopes giving light, and the warm accent where the recipe says (the live dot, the active step, one word — never fills or buttons). Render the two posters again from the scene, and make sure nothing still uses the old slate colours.

Run the production build again, check 1440px and 390px, and start the dev server on port 3010.
```

## 7. Kit growth (2026-10-04)

The user agreed to the candidate from this build: the Curriculum section, written fresh for any course (React only,
tokens only): modules with a label, title, line, the lessons open on the page and one outcome each. Course sites'
Curriculum page now starts with it. This site keeps its own hand-built modules.

Result of Prompt 2: tokens, the shadcn theme and the favicon moved to Grading Suite; the console's room, desk, bezels and
trackballs now sit in near-black and the light comes from the screens (monitor spill takes the frame's colour), the hue
rings and the scopes; the waveform trace is warm white and the vectorscope's skin-tone line is the peach accent; both
posters rendered again. The accent sits only on the live dot, the active step and the skin line. Claude copied the
re-exported `build/verification.md` (it still named the old colours). Re-checked at 1440 px and 390 px; card, live export,
zip and `examples.ts` (Colors: Grading Suite) redone; `npm run check` ✓.
