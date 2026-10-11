# Recording the Library's media

How the Library's stills and clips are made, and what we learned making them (2026-10-10/11, with the user). Read
this before recording anything new. The tools are in `scripts/capture/`; they run against `npm run dev` on :3000.

## What gets recorded at all

- **Only what is special.** The Library offers a site's own ideas, not the basics any AI builder does anyway
  (`NOT_OFFERED` in `src/data/takeables.ts`). Nothing is recorded for a design that is not offered.
- **A component is shown as a component.** Anything that can be a piece (a button, a link hover, a cursor, a page
  change, a menu, a footer) is shown as the piece itself on OpusKit's dark card ground — live when it moves by itself,
  a clip of it being used when it only moves on hover, a drag, a click or a scroll. A part whose worth is a site's own
  photographs and words (a first screen, a showcase) is shown as that site has it.
- **Moving things are clips, still things are stills.** Standing still, a button that pulls to the cursor says nothing.
  But a clip of a page that barely moves is worse than a still (Pip & Kiln's product part: a still).
- **Look before you label.** Brasshand's "index of big titles" was not on its site at all; its home holds one project
  at a time. Read the site's own code (`examples/{slug}/src`) to learn what a part does — Inkwell & Moth's "drawn first
  screen" is a drawing in layers that come apart as you scroll, so it is named and recorded as that.

## The tools

| Script | Makes | Where it goes |
|---|---|---|
| `demo-clips.mjs [id …]` | a piece being used, on its stage `/library/demo/{id}` | `public/library/demos/{id}.mp4`, `src/data/demo-clips.generated.json` |
| `site-clips.mjs [slug:section …]` | a site's part that moves (scroll, pointer, arrival) | `examples/{slug}/public/media/clips/{section}.mp4` → its `sectionClips` |
| `site-clips.mjs slug:site slug:full` | the whole site: its first screen then down through home (~12 s), and the landing page top to footer at a reading pace | `clips/site.mp4` → `clip`, `clips/full.mp4` → `fullClip` |
| `section-stills.mjs [slug:section …]` | a site's part standing still, framed | `examples/{slug}/public/media/stills/{section}.jpg` → its `sectionStills` |
| `hand.mjs` + `mouse.py` | the Mac's own pointer (shared) | — |

Each clip's plan (where, what the pointer does, how far it scrolls) lives in its script (`CLIPS`, `SHOTS`), so a clip
can be recorded again and comes out the same. `npm run check` fails when a piece's code changed after its clip (its
source hash in `demo-clips.generated.json`): record it again with the command the failure names.

## Once, on a new machine

- Cap (cap.so) with its CLI at `~/.local/bin/cap`; Screen Recording allowed for Cap and for the terminal or editor
  that runs the script; Accessibility allowed for it too (the pointer). A quarantined, translocated VS Code cannot be
  granted Screen Recording: remove the quarantine (`xattr`, needs App Management for the terminal) first.
- `uv` (runs `mouse.py` with pyobjc), `ffmpeg`, Google Chrome. `playwright-core` is a dev dependency.

## Lessons

**Never the screen.** Cap records only Chrome's own window (`cap record start --window`), found by a title the script
sets for that recording. A full-screen recording once showed the user's desktop and file names. The window list lags a
new title: look again for a few seconds, and try a take twice before giving up.

**The pointer never leaves the window.** A tap on an element below the fold once sent the pointer to the screen's
bottom-right corner; macOS opened a Quick Note (a hot corner) over the Chrome window and the recording showed the
user's private notes. Now `hand.mjs` clamps every point inside the page (`within`, set by `screenOf`), a tap scrolls
its element into view first, and the pointer is parked away from every corner. Turn hot corners off while recording
(System Settings → Desktop & Dock → Hot Corners), and look at every frame of a pointer clip before keeping it.

**Nothing may come over the window.** Cap records the window's area, so anything that covers it is recorded too: a
Quick Note, a notification banner, another app brought forward. A booking form that sends by `mailto:` opened the Mail
app over the window and the clip showed the user's own drafts and bookmarks. So: never press a button that sends mail
or calls (fill the form, don't send — mail and phone links are blocked during a recording), turn on Do Not Disturb, and
check every clip end to end — a frame sheet that stops before the clip's last second missed exactly that frame.

**A laptop-shaped window.** Chrome as an app window (no tabs, no address bar, `--enable-automation` dropped so there is
no automation bar), 1210×923 points. A page too wide and too short read as "cut". The title bar and the window's 1px
frame are cropped away after export.

**Zoom with the browser, never with CSS.** A piece is made large by Chrome's own pixel ratio
(`--force-device-scale-factor=3`); a page uses 1.68 (a 1440-wide page). CSS `zoom` or a `transform: scale` put the page
and the pointer in different pixels: a dragged photo drifted away from the cursor.

**Measure where the pointer lands.** `screenOf` puts the pointer at two points in the window's top-left corner and
asks the page where it saw them, then maps page pixels to screen points. Calibrate away from the piece — an image
trail started there once opened the clip.

**A hand, not a robot.** `mouse.py` moves the real pointer like a hand: quick aimed moves that slow to land, a slight
arc, a small overshoot it corrects, a little tremor; short hops become one smooth stroke. Even speed and straight lines
looked robotic. One `mouse.py` process serves a whole run (no start-up pause between moves). A click waits a beat
before pressing; a drag moves a little slower.

**The cursor as it was.** Cap's cursor smoothing made the drawn cursor trail behind a dragged photo: `raw: true`,
motion blur 0.3. A page's own drawn cursor (the brand cursor) needs `useSvg: false` so Cap shows the real bitmap.
Hide the cursor in clips with no pointer.

**Short loops.** The pointer starts just off the piece and stops just after the thing happens — no trip across the
screen to it and away (that was a second or two of a five-second loop). A scroll goes down and comes back up, so the
loop on the card has no jump. Clips run 2–8 s; a long scroll up to ~11 s.

**Cap starts late.** Recording begins about a second after `record start` returns: wait ~0.8–1.1 s before acting, then
cut the still lead-in (`freezedetect`, keeping 0.15–0.4 s). A film that never stands still hides that moment — then a
fixed cut, plus `late` for a film that answers the scroll late (Halden's).

**One even speed, never slow.** Every scroll moves at one constant speed with a short soft start and stop (~0.4 s):
an ease-in-out crawled and then rushed, and the user saw it (2026-10-11). Brisk, not slow: the whole page at ~520 px a
second, a site clip 3.4 screens in ~7 s. A page's own smooth scrolling made the same crawl-then-rush — it is turned off
for recording (below).

**Pages.** Wait for `load`, not `networkidle` — a page with a film never goes idle. Start at the top (`scrollTo(0, 0)`).
Skip a site's welcome (a gate, a preloader) by giving the page its sessionStorage key before it loads (`session`);
reload during the recording to catch an arrival (`reload`, stickers popping in). Before a still, scroll the whole page
once so everything that waits to be seen has been seen.

**Turn off the page's own scroll smoothing.** A page with `scroll-behavior: smooth` (Inkwell & Moth) or scroll snapping
(Qum's walk) fights a scroll moved every frame: it stood still, then jumped. The recorder adds a style that sets both
off for the recording.

**Framing.** 16:10, 1280 wide. A piece is cut to its stage plus a little air; a scrolled page keeps its width and its
top (a reading line lives there); something that opens over the whole screen keeps the whole window (`wide`, the
lightbox). Small things are shown large and centred, never at the edge where a site puts them.

**One ground.** Pieces and pure parts are recorded on OpusKit's dark card ground `#18181B` (`OPUSKIT_DARK`): rows of
white cards tired the eye, and one dark set reads well in both light and dark mode, so there is one set to maintain.

**Look at every take.** Make a contact sheet of frames (`ffmpeg … tile`) before wiring a clip in: wrong section, a
welcome screen, a black film layer, a cut-off photo and an idle start were all caught this way. After a run,
`cap record status` must list nothing alive (the scripts stop a recording in `finally`).
