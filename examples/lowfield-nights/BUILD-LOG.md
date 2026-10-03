# Build log — Lowfield Nights

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #10 of docs/plan-for-fit.md §5: cinematic / cinematic-editorial, scroll-video-page first screen, immersive
movement, event.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`), the same calls the kit UI makes.
Asked for by the user ("write the next project's prompt too and build it in parallel").
- Kind of site: Event / wedding · name "Lowfield Nights" · about "Three nights of films and live scores in a disused
  hangar on the Absheron coast, 12–14 June." · goal: Book or reserve
- Look: Cinematic Editorial · colours **Graphite & Sand** (the row's fresh pick, §5) · lettering High and Low (the look's
  own) · shape Sharp · layout Full-bleed · first screen: Whole-page scroll video · movement: Immersive
- Big idea: A walk through named stops (the kit's recommendation; the row's "guided stops") → named stops on Venue &
  travel — Gallery, a live status line in the menu
- Menu: Centered logo · footer: **Big name** · behaviour: headlines — Words that arrive; between pages — Curtain between
  pages; links, main button and whole site — none
- Pages (the event defaults): Home (hero → intro → schedule → team → location → FAQ → reservation), RSVP (reservation →
  location → FAQ), Venue & travel (location → gallery → FAQ), FAQ (FAQ → closing CTA)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

Film: "Silhouette Walking Through Tunnel to Light" by Dominik Zítka on Pexels (3840×2160, 25.4 s, one shot, no cuts),
found and downloaded by Claude, then the package's own `bash scripts/prepare-video.sh media-src/hero.mp4 --no-upscale`:
`heroVideo.mp4` 1920×1080 3.8 MB, `scrubReadyEncode.mp4` 8.5 MB (keyframe every 6 frames, for scrubbing),
`mobileVideoEncode.mp4` 1080×1920 2.8 MB (CRF 32), posters. The first run stopped right after `heroVideo.mp4`: the
script's new size-budget helper ended on a false test, which `set -e` treats as a failure. Fixed in OpusKit; this project
(and Velmira, Saint Ashe) got the regenerated script.

Photos: 9 from Pexels (the Unsplash connector needed a new sign-in); sources in `media-src/SOURCES.md`.
Originals in `media-src/`; resized to at most 2400 px (JPEG q82) into `public/media/`. Cropped and graded to the
graphite-and-sand set: `venue-2` (the screen and the left-hand group only — a plaid blanket out; warmed), `venue-3`
(lower 60%, the stage and audience), `location` (left 5% with faded scrawls out; desaturated and warmed), `venue-1`
(slightly warmed).

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for the earlier examples.
It was given only: "work inside `examples/lowfield-nights/` as the project root; read its CLAUDE.md and AGENTS.md first;
port 3000 is taken, use port 3016 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My files are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- heroVideo.mp4 (1920×1080), scrubReadyEncode.mp4 (the same film with a keyframe every 6 frames, for scrubbing) and mobileVideoEncode.mp4 (1080×1920) — a silhouette walking out of a dark tunnel toward warm light, made by scripts/prepare-video.sh; the whole-page scroll film. posterImage.jpg and posterMobile.jpg are their first frames.
- artist-1.jpg … artist-4.jpg — the four composers and players this year, for the team section.
- venue-1.jpg — inside the hangar, venue-2.jpg — a screening outdoors, venue-3.jpg — the audience at a live score, venue-4.jpg — the coast at dusk; for the gallery on Venue & travel.
- location.jpg — the hangar from outside, for Location.

I don't have a logo yet — make a simple one for Lowfield Nights.

RSVP has no backend yet: the RSVP form can open the visitor's mail app with the details filled in.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: the whole site built — Home, RSVP, Venue & travel (`/venue-and-travel`), FAQ and a 404, from the ready sections and
kit pieces. Its own additions: the scroll film fixed behind every page, with four see-through gaps on Home where the film
plays alone with one message and a card naming the next stop (scene times in `src/config/scenes.ts`); the walk through
four named stops on Venue & travel (pinned photos, a hover-preview index, a swipe viewer); a stop index on every page; a
live status line in Baku time ("First night in 252 days", "Open now, until 01:00"); an RSVP form (calendar limited to the
three nights) that opens the visitor's mail app; an arch logo. It invented the dates (12–14 June 2027), a programme of four
public-domain silent films (Sevil 1929, Man with a Movie Camera, Sunrise, The Passion of Joan of Arc), four players, the
venue on the Zira coast road, shuttle times, contacts. It reported: `scrubReadyEncode.mp4` (8.5 MB) is over the 6 MB budget;
shadcn wrote imports from an npm package called `cn` and made `src/lib/utils.ts` import itself — it fixed both. `next
build` passes, every route static. (The run stopped once at an API usage limit and was resumed with "continue".)

Video budget: OpusKit's `prepare-video.sh` now budget-fits the scrub encode too (≤ 6 MB); re-run here: `scrubReadyEncode.mp4`
4.6 MB (CRF 24), same pixel size.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests. Seen:
on desktop the footer's full-width "Lowfield Nights" runs past the right edge ("Nights" cut off); on phones the fixed stop
label in the bottom-left corner ("The way in") sits on top of the footer's text and its RSVP button.

### Prompt 2 — fix round 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), given only: "work inside
`examples/lowfield-nights/` as the project root; read its CLAUDE.md and AGENTS.md first; port 3000 is taken, use port 3016
for its dev server" — then the prompt below, word for word.

```
A few fixes, please:

1. On desktop the big "Lowfield Nights" at the bottom of the footer runs past the right edge — "Nights" is cut off. It should fit the width exactly, whole, at any desktop size.

2. On phones, the small stop label in the bottom-left corner ("The way in") sits on top of the footer text and its RSVP button. Hide it once the footer comes into view, and make sure it never covers buttons or form fields.

3. I re-made scrubReadyEncode.mp4 smaller with scripts/prepare-video.sh (now 4.6 MB, same size in pixels, still a keyframe every 6 frames) — check the scroll film still scrubs smoothly with it.

Keep everything else as it is. When you're done, run the static build again and make sure it still passes.
```

Result: the footer's "Lowfield Nights" is sized to its real width in Newsreader (7.062 em, measured against a size
container), so it lands on the content edge at every width; the phone stop label fades out once the footer or any
control is under it; the 4.6 MB scrub film seeks within a frame (no code change). `next build` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests; the
footer name is whole on desktop and phone, and nothing sits over the footer's RSVP button.
