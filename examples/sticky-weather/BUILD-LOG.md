# Build log — Sticky Weather

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #4 of docs/plan-for-fit.md §5: experimental / sticker studio, orbiting stickers, lively, studio.

## 1. Recipe (2026-10-02)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `toggleSitePiece`), the same calls the
kit UI makes. Approved by the user.
- Kind of site: Studio · name "Sticky Weather" · about "A small design studio for brands that want to be picked up — identities, packaging and websites that feel like stickers on a laptop." · goal: contact
- Look: Cheeky Sticker Studio, with the row's fresh picks (§5): colours Bubblegum, lettering Stack · first screen: Sticker orbit · movement: Dynamic
- Big idea: A playful way in (also the kit's recommendation) → A playful way in (Home — Hero — Sticker orbit), Each item brings its own colours (Home — Featured Work)
- Menu: Split pill · footer: Signature columns · shape: Sharp
- Behaviour: headlines — Text effect; links — Wavy links; main button — Magnetic button; between pages — Blob transition; whole site — Designed preloader, Brand cursor, Smooth scroll
- Pages (the studio's defaults): Home (hero → featured work → manifesto → journal → closing CTA),
  Practice (featured work → editorial story → gallery → closing CTA), About (about → team → process → closing CTA),
  Contact (closing CTA → location)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, App Router, src/, `--skip-install`). `next.config.ts`
got the `turbopack.root` pin before the first install. Then `npm install` and, as the package README says,
`npm i motion lenis`. create-next-app's `/build` line was removed from `.gitignore` so the recipe's `build/` folder is kept.

The first export showed a kit bug: the title read "Cheeky Sticker Studio Studio Site" (the look's name already ends in the
kind of site). Fixed in OpusKit's engine (`composeRecipe`, with a check in `scripts/check.ts`) and the package was
exported again.

## 3. Media

14 photos from Unsplash, picked by Claude with the Unsplash connector (sources and the brand check in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`. The orbiting stickers on the first screen have no files: Claude Code draws them in code.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-02)

Run, under the user's go-ahead for #4 ("başla 4-ə"), by a fresh Claude Code subagent started from the OpusKit session
(no OpusKit context). It was given only: "work inside `examples/sticky-weather/` as the project root; read its
CLAUDE.md and AGENTS.md first; port 3000 is taken and another session may use 3002–3004, use port 3006 for its dev
server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- work-1.jpg to work-6.jpg — six of our projects, one photo each: packaging for a juice brand (the orange box), a shop identity (the pink bag with the star pattern), skincare packaging (the peach boxes), a sticker set for a café (the latte-art stickers), a colour system for a paper mill (the folded blue and orange card), business cards for a florist (the box of lilac cards). Use them for Featured Work, the Practice page and anywhere else our work is shown. The clients are made up — invent names that fit.
- studio-1.jpg to studio-5.jpg — our studio: a desk with material samples, paper swatches, screen printing, a desk of markers and watercolours, a fan of colour cards. Use them for the Practice page's story and gallery and for the About page.
- team-1.jpg, team-2.jpg, team-3.jpg — portraits of the three of us, for the Team section.

The stickers that orbit on the first screen have no files — draw them in code.

I don't have a logo yet — make a simple one for Sticky Weather.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

The session that ran Prompt 1 was interrupted mid-build (pages, components and a first `out/` were already written).
Claude resumed the same subagent with this message, word for word:

```
Your session was interrupted. Continue the build where you left off: check what's done against build/implementation-plan.md, finish the remaining steps, then run the production build, check 1440px and 390px in a real browser, start the dev server on port 3006 and reply as CLAUDE.md asks.
```

Result: every page built from the ready sections and kit pieces (Home, Practice, About, Contact, plus Privacy and a 404);
`next build` with `output: 'export'` passes, all routes static. Its own additions: a "Hold to peel" gate on the first
visit of a session (Skip and Esc work; reduced motion gets a plain "Enter"), 10 stickers drawn in code from a new cloud
logo, Featured Work as a list of names that reveal photos and turn the section each project's colour, a Contact section
that recolours with the project type, and the footer name landing letter by letter. It fixed one thing in a shipped kit
piece (TextEffect rendered spaces so a wrapped line started indented — fixed in OpusKit's own source too) and added one
token, `--color-paper: #FFFFFF` (the white menu pill and the stickers' white edge). Known gaps it listed: the form opens
the visitor's email app (a static site can't send), the Select is not a bottom sheet under 640 px.

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): no horizontal overflow, no console errors, no
failed requests on any page. One fault: at 390 px the orbiting stickers sit on top of the hero's text (the umbrella over
"A small…", "Hello!" over "brands").

### Prompt 2 (2026-10-02) — fix round 1

Sent to the same Claude Code subagent, word for word:

```
One fix: on a phone (390px) the orbiting stickers land on top of the hero's words — the umbrella covers the start of "A small design studio for brands" and the "Hello!" bubble covers "brands". On mobile, keep every sticker clear of the text and the button the whole time (also while the ring turns on scroll), so all the words stay readable. Desktop is fine as it is.

Run the production build again when you're done.
```

Result: under 768 px the stickers now travel in two measured lanes, one above the words and one below, and change lanes
only past the screen edges; the ring no longer drifts up on phones (turning with scroll stays, at half the distance).
Desktop unchanged. `next build` passes again, all routes static. Re-checked by Claude at 390 px, at rest and scrolled:
every word and the button stay clear, no console errors.

## 5. On OpusKit (2026-10-02)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names). `public/examples/sticky-weather` is a symlink to this project's `public/`; the card and
`media/poster.jpg` are a 1440×900 screenshot of the live first screen after the gate. `npm run examples` wrote its spec
and `public/downloads/sticky-weather.zip`; the live export is in `public/live/sticky-weather/` (code only, media paths
pointed at `/examples/sticky-weather/media/`). Checked in a browser at 1440 px and 390 px: home, then the menu to
Practice, renders with no 404s (only aborted prefetches); every route returns 200. Clips: waiting for the user's
recordings.
