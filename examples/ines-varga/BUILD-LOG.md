# Build log — Ines Varga

How this site is made, step by step (docs/plan-examples.md §3 and §5c). Example #28: a freelance cartographer who
draws illustrated maps for towns, trails and books — Personal brand / portfolio · Conceptual Sketch · **dynamic** ·
illustration. Its engine test (§5c): an **illustration lead** — does the shot list ask for drawings, not photos? A
commissions form with a brief and a budget, a work index, sketches drawn in the page's own line.

The user approved §5c on 2026-10-11 ("bəli gettik") and asked for this one first, with the session's new pieces in it,
and for the recipe to go into their Saved ("Mütləq saved-ə əlavə edərsən sonda").

## 1. Recipe (2026-10-11) — waiting for the user's approval

Made by Claude in a real browser (headless Chrome) with OpusKit's own screens, as a user would:
- **Library** — taken by name (decision 52): from **Inkwell & Moth** its first screen, *A drawing that comes apart
  as you scroll* (a map drawn in layers), and *Prints on a desk* (maps as prints to pick up); from **Fieldhouse** its
  idea *Names beside one photo held in place* (the work index: map titles beside one held map); from **Fennwood**
  the *Hand-drawn underline*. Then **Build my site**.
- **You** — name "Ines Varga"; one sentence "Illustrated maps for towns, trails and books, drawn by hand in ink and
  watercolour. Commissions open."; What are you making: **My work** (not read from the sentence — picked) →
  portfolio.
- **Direction (Make it yours)** — Look: **Conceptual Sketch** (Direction offered Scrapbook). Colours: **Gallery
  Grey** — pale grey, ink, vermilion: the watercolour maps glow on a neutral ground and the vermilion reads as a
  map's route line; previewed against **Chrome Silver** (dull mid-grey) and **Butter Yellow** (competes with the
  maps). Lettering: **Sketchbook** (Caveat Brush + Winky Sans) — hand lettering for a hand-drawn practice;
  previewed against **Letterpress Modern**, which Kelp Line already wears. Motion came out **dynamic** (Prints on a
  desk asks for it). Screens in `media-src/flow/`.
- Pages from the kind of site: Home (first screen, Featured Work, Closing CTA) · Selected Work (Featured Work,
  Clients) · Project (Case Study, Gallery, Specs, Featured Work) · About (About, Testimonials, Timeline) · Contact
  (Closing CTA, FAQ).
- **The session's new pieces, added by Claude at the user's request** (the Library cannot offer them until a built
  site shows them — this site will be the first): *A picture that becomes the next page* (`photo-morph`, Selected
  Work → the map grows into its project page), *A story told beside one held picture* (`scroll-story`, About — how a
  map is made, chapter by chapter), *Letters that gather into a sentence* (`letters-assemble`, Contact's invitation),
  *Shutter between pages* (`shutter-transition`, whole site — like a map's folds). The engine adds *Tap to open
  large* (the Project gallery's layout) and smooth scroll (the default for a dynamic recipe since 2026-10-11).
- **Next: Recipe** → generation `ed2dab59` in the flow's browser. The full spec is the link in
  `media-src/flow/link.txt` (`/studio/open?recipe=…`): opening it saves the recipe into that browser's Saved and shows
  it. Opened in the user's own browser on 2026-10-11 so it is in their Saved.
- The recipe page now shows these pieces too: a new **Also in your site** list under What you took (every piece the
  recipe has that was not taken from a site — the four new ones, Tap to open large, smooth scroll), each its live demo
  in the owner's brand (`RecipeDocument.tsx`). Screens: `media-src/flow/recipe-also.jpg`, `saved.jpg`.

**Approved by the user on 2026-10-11** ("davam et" after the recipe was shown).

## 2. Media (2026-10-11)

- **The shot list asks for illustrations, not photos** for the lead (engine test passed): `heroIllustration` (the
  first screen's key visual) and `spotIllustrations` (3–6 section accents) — drawn by the builder, in the page's line.
- Photos by Claude from Unsplash (`media-src/SOURCES.md`, 13 kept): four maps as the four projects
  (`featuredWork-1…4`), a portrait (`about.jpg`), four process photos for the story of how a map is made (walk, sketch,
  ink, colour) and four studio photos for the galleries. One left out: it carried a real metro logo.
- Missing on purpose: each project's own wide cover and gallery set — placeholders (the user: placeholders are fine).

## 3. Build Package and project (2026-10-11)

`create-next-app@16.3.8` in a scratch folder, moved in; the `turbopack.root` pin written before the first install;
`scripts/build-package.ts media-src/flow/spec.json` → 49 files (8 ready pieces: DragPhotos, DrawnLink, PhotoMorph,
ScrollStory, LettersAssemble, PageShutter, Lightbox, SmoothScroll); `build/` kept out of `.gitignore`; placeholder SVGs
removed; `npm install`, `npm i motion gsap lenis`. Photos resized into `public/media/` (≤ 2400 px).

## 4. Prompts to Claude Code

Fully isolated: a separate Claude Code session (`claude -p`, Claude Opus 5.5) started inside this folder, with only the
project's own settings (`--setting-sources project,local`), `--permission-mode acceptEdits` and
Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-11)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

The photos are in public/media/: featuredWork-1.jpg … featuredWork-4.jpg are four of my maps (one per project in the work list, in that order); about.jpg is my portrait; and process photos for the story of how a map is made — process-walk-sign.jpg (walking the place), process-sketch.jpg (the pencil sketch), desk-glasses-map.jpg (inking at the desk), process-watercolour.jpg (colour) — plus process-path.jpg, process-supplies.jpg, process-palette.jpg and work-vintage-stack.jpg for the project galleries and wherever a picture of the studio helps. Any picture the shot list asks for that is not here (each project's own wide cover and gallery set): make a plain placeholder image in the exact ratio and size the shot list gives, with its key written clearly on it, so I can drop real files in later.

The illustrations (the drawn first screen, the section accents) are not photos: draw them yourself as SVG in the page's own line and colours — a map drawn in layers for the first screen — never stock.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3028 for the dev server. Never remove or change the turbopack.root line in next.config.ts. Before your final reply stop any dev server you started — do not leave one running.
```

Stopped after 4 min (27 turns, $1.75 reported): the account's session limit ("resets 8:40pm"). It had set up
shadcn and the detector, nothing more. Resumed at 20:46 with `--continue` and "Continue where you left off." (logged
as the same prompt's run 2).

Run 2 finished in ~41 min (143 turns, $15.01 reported): Home, Selected Work, four project pages, About, Contact, a
designed 404 and a loading state; production build clean; checked by the builder at 320–1440 px, reduced motion,
keyboard, lint, types and the detector (clean); Lighthouse mobile 84–90 / 98–100 / 100 / 100, CLS 0, LCP 3.6–4.2 s
(not met — the size of the Next.js and animation code on slow 4G; on desktop the content appears in under 0.5 s). Its
moments: a three-layer map that draws itself and drifts apart (Home); a marker trail drawn down the work list from
"start here" to "your place next?" (Selected Work); margin notes with arrows on the map (Project); a small map that
gains a layer per chapter beside the held picture — walk, pencil, ink, colour (About); whatever is typed in "Where is
it?" written onto a sheet with a route drawn to it from "my desk" (Contact); 404 "You've walked off the map". It used
the barn-index idea for the project page's "More maps" and changed the letters-assemble piece to travel in full ink
(a faded letter fails contrast). It flagged: invented copy marked PLACEHOLDER in `src/content/site.ts`; the logo and
drawings stand in for the owner's own; project covers and galleries are placeholders.

### Review (Claude, 2026-10-11)

Production build clean (11 routes). Every page at 1440 and 390 in headless Chrome: no horizontal overflow, no failed
requests, no console errors (the 404 page's own status aside). One fault, in OpusKit's new piece: on Contact the
gathering headline sits in the first screen and stays scattered on load — its scroll range is already behind it
(Engine lesson 2). OpusKit's piece fixed (it gathers once on its own when it starts in view) and the builder's
full-ink change taken back into it (step 7).

### Prompt 2 — fix round 1 (2026-10-11)

```
One fix. On Contact the headline that gathers its letters ("Tell me where, and I'll draw the way.") sits in the first screen, so on load it stays scattered until the visitor scrolls — the scroll has nothing left to drive it. When the line already starts in the first screen, let it gather once on its own as the page opens (about 1.4s, an out-curve, the letters a little apart in time, starting after a short beat); everywhere else keep the scroll-driven gathering as it is. Keep your full-ink letters.

Run the production build, check Contact at 1440 and 390 on a fresh load, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3028 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one resumed run (9 turns, ~1.4 min): the line gathers once on its own when it starts in view (a short
beat, 1.4 s, letters a little apart), the scroll-driven path elsewhere unchanged; it also hid the letters until the
script places them, so the finished sentence never flashes before scattering (a small script in the layout marks that
scripts run; with scripts off or reduced motion the sentence just shows). Checked on a fresh load at both widths.

### Review 2 (Claude, 2026-10-11) — the live export

The export first showed the fallback font: Claude's own copy step had left out `_next/static/media` (the fonts) along
with the site's media — fixed by excluding only the top-level `/media` (no other export had the gap). Clicking through
the menu found the second fault, again in an OpusKit piece: choosing a page changed it but left the full-screen menu
open — `DrawnLink` dropped the onClick the menu's SheetClose hands it (Engine lesson 3). OpusKit's piece fixed (it
passes every other prop on) together with the builder's mouse-only hover.

### Prompt 3 — fix round 2 (2026-10-11)

```
One fix. Choosing a page in the full-screen menu changes the page but leaves the menu open over it. The menu's SheetClose hands its onClick to DrawnLink, and DrawnLink drops every prop it does not name, so the close never runs. Let DrawnLink pass everything else it is given (onClick, ref and the rest) on to the link, keeping its own pointer and focus handlers working alongside any it is given.

Run the production build, open the menu and choose each page at 1440 and 390 to check the menu closes and the page shows, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3028 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one resumed run (6 turns, ~1.5 min; the session's reported total is now $16.68): DrawnLink passes every
other prop on, its own handlers run after any it is given; checked at 1440 and 390 choosing each page.

## 5. Registration (2026-10-11)

`src/data/examples.ts` (title and summary from the site's own `<title>` and description; `choices` with the exact
option names), `public/examples/ines-varga` → `examples/ines-varga/public`, the card and poster from its first screen,
`npm run examples` (recipe, Your files samples, the zip), live export at `/live/ines-varga` (code only; media from the
one copy), clicked through from the menu at 1440 and 390: every page, the menu closes, the fonts load, no failed
requests, no errors. The four new pieces are named in the catalog with this site as `bestOn`, so the Library shows
them. `npm run check` ✓.

## Next

- [x] The user approves the recipe.  - [x] Media.  - [x] Project and Build Package.
- [x] Prompt 1 built it; reviewed at 1440 + 390.  - [x] Prompts 2 and 3 (fix rounds).  - [x] Registered, live.
- [x] Engine lesson 2 fixed: `letters-assemble` gathers once on its own when it starts in the first screen; letters
      travel in full ink (from the build).
- [x] Engine lesson 3 fixed: `DrawnLink` passes every other prop to its link (a menu's close reaches it).
- [ ] Open: the builder's no-flash guard for `letters-assemble` (letters hidden until placed) needs a layout script —
      a piece cannot ship one; worth a line in the piece's rules.
- [x] Engine lesson 1 fixed (2026-10-11, during Prompt 1): the shot list did not ask for the pictures `scroll-story`
      needs. Ready pieces that need their own pictures now put them in it (`PIECE_SHOTS` in `engine.ts`: the story's
      four chapter pictures, the window's one picture); check.ts. This build's prompt named the four process photos
      instead.
- [x] The new pieces have their Library cards on this site (catalog `bestOn: ines-varga`).
- [x] Clips (2026-10-12): the first takes opened on a finished map — the hero map draws itself on load and the
      recorder started 4 s after it. `site-clips.mjs` now replays the page's arrival inside the recording
      (docs/capture.md); `site.mp4` (11 s) and `full.mp4` (12 s) recorded again and registered (`clip`, `fullClip`).
- [x] The new pieces in use (2026-10-12): `shutter-transition`, `letters-assemble`, `scroll-story` recorded with
      `demo-clips.mjs`. letters-assemble's first take showed the line already whole (it sat in the demo's first screen,
      so it gathered once on load); its demo stage now has a screen of space above. `photo-morph` stays live.
