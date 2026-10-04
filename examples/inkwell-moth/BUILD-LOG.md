# Build log — Inkwell & Moth

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #11 of docs/plan-for-fit.md §11: raw / scrapbook, illustrated first screen, lively, portfolio.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `addSection`, `togglePiece`,
`renamePage`, `setPagePurpose`), the same calls the kit UI makes, then loaded into `/kit` and shown to the user.
Approved by the user ("davam et").
- Kind of site: Portfolio · name "Inkwell & Moth" · about "The picture-book studio of illustrator Nell Arden: ink,
  watercolour and small night creatures, drawn by hand in an old bakery in Sheki." · goal: contact
- Look: Scrapbook · colours Legal Pad · lettering Cut and Paste · shape Sharp (the look's own) · first screen:
  Illustrated hero · movement: Dynamic
- Big idea: A playful way in → A playful way in (Home — Hero — Illustrated hero), Each item brings its own colours
  (Home — Featured Work)
- Menu: Side index · footer: One quiet line
- Behaviour: links — Hand-drawn underline; headlines, main button, between pages, whole site — none
- Pages (the portfolio defaults, plus three parts): Home (hero → featured work → gallery with Prints on a desk → closing
  CTA), Books (featured work → case study → gallery with Tilted scroll grid → clients → closing CTA), About (about →
  process → stats → testimonials → closing CTA), Commissions (closing CTA → FAQ; its brief rewritten: "Tell publishers
  and authors how to commission a book or a cover: what Nell takes on, lead times, rough fees, and a short enquiry form.")
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

25 photos from Pexels, picked by Claude (the Unsplash connector needed a new sign-in; sources and the brand/signature
check in `media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/` (spread-7 cropped to leave out a branded paint box). No film. The first screen's illustration has no
file: Claude Code draws it in code.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run, under the user's go-ahead ("subagent ilə davam et"), by a fresh Claude Code subagent started from the OpusKit
session (no OpusKit context). It was given only: "work inside `examples/inkwell-moth/` as the project root, never edit
files outside it; read its CLAUDE.md and AGENTS.md first; port 3001 is taken, use port 3006 for its dev server; never
remove or change the `turbopack.root` line in next.config.ts (`output: 'export'` and `images: { unoptimized: true }` may be
added)" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- book-rooster.jpg, book-koi.jpg, book-sparrow.jpg, book-moths.jpg — four of my picture books, one painting from each: "The Loudest Rooster in Sheki", "Nine Koi and a Copper Moon", "Sparrow Keeps the Spring" and "The Moths Who Came to Tea" (the book the studio is named after). Use them for the books on Home and on the Books page. Invent the publishers, years and a line about each book that fit.
- moth-specimens.jpg — the old specimen plates I drew the moth book from. Use it with book-moths.jpg for the Books page's case study of "The Moths Who Came to Tea".
- desk-1.jpg to desk-5.jpg — sketches lying on my desk (rabbits, birds in flight, a cow, plants, loose drafts). They're the prints on the desk on Home.
- spread-1.jpg to spread-8.jpg — pages from other books and sketchbooks (a flamingo, hares under mimosa, strawberries, pumpkins, bamboo, a flower, small studies, a coral flower). They're the tilted grid on the Books page.
- process-1.jpg to process-4.jpg — how a book gets made: the pencil rough, the ink, the colour, the pages laid out. For the Process section on About.
- portrait.jpg — me, Nell Arden, for About.
- studio.jpg — my drawing table in the old bakery; sheki.jpg — the street outside in Sheki. For About and Commissions.

The first screen is a drawing, not a photo — draw it in code in the site's colours: an inkwell with a few moths flying out of it, in layers that move apart a little as you scroll. Small spot drawings in the same hand (a moth, a nib, an ink drop) can mark the sections.

The way into the site: it opens under a sheet of tracing paper, with the drawing showing faintly through it. Visitors lift the sheet away (drag it up or off) and the site is there. Keep the Skip link.

I don't have a logo yet — make a simple one for Inkwell & Moth.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

The session that ran Prompt 1 stopped mid-build on an API limit. Claude resumed the same subagent with this message,
word for word:

```
Your session was interrupted. Continue the build where you left off: check what's done against build/implementation-plan.md, finish the remaining steps, then run the production build, check 1440px and 390px in a real browser, start the dev server on port 3006 and reply as CLAUDE.md asks.
```

Result: every page built from the ready sections and kit pieces (Home, Books, About, Commissions, plus a 404);
`next build` with `output: 'export'` passes, all routes static. Its own additions: the tracing-paper gate (drag it up or
off, or "Lift the sheet"; Skip focused first, Esc; once per session; reduced motion gets a plain Enter), the inkwell
hero drawn in code in four layers that part on scroll (moths flutter and lean toward the pointer), spot drawings (moth,
nib, ink drop), an inkwell-and-moth logo and favicon, the four books turning the section each book's colours
(`ChapterColours`), a caption list and lightbox for the desk and the tilted grid, a mailto enquiry form, and the footer
name pasted together from cut-out paper letters. It reshaped some ready sections (featured work, case study, about,
process, closing CTA, clients) within the tokens, and fixed one kit piece: TiltedGrid stayed tilted under reduced motion
(now starts flat until load). Made-up details it listed for checking: publishers, years, co-authors, quotes, numbers,
fees (from €9,000 / €1,400 / €180), lead times, studio@inkwellandmoth.com. Known gaps: no Lighthouse run, photos served
at 2400 px, Select not a bottom sheet on phones, the phone bar doesn't hide on scroll.

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): gate lifts by dragging; no console errors, no
failed requests, no horizontal overflow on any page (a 2 px overflow on About at 390 px seen once, not reproduced); each
book turns the section its own colour as it arrives (rooster ochre, koi deep green, sparrow pink, moths ink blue).

## 5. On OpusKit (2026-10-03)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names). `public/examples/inkwell-moth` is a symlink to this project's `public/`; the card and
`media/poster.jpg` are a 1440×900 screenshot of the live first screen after the tracing paper is lifted.
`npm run examples` wrote its spec and `public/downloads/inkwell-moth.zip`; the live export is in
`public/live/inkwell-moth/` (code only, media paths pointed at `/examples/inkwell-moth/media/`). Checked in a browser at
1440 px and 390 px: home, lift the sheet, then the menu to Books, renders with no failed requests and no broken images
(only aborted prefetches). `npm run check` ✓. Clips: waiting for the user's recordings.

## 6. Kit growth (2026-10-03)

Asked the user after the build; they picked three of the four hand-built parts (not the cut-out footer wordmark).
Added to OpusKit as ready pieces, written fresh for any site (react + motion only, tokens only, reduced motion):
`EntryGate` (drag or hold; also a whole-site extra in Design → Behaviour), `ChapterColours` (data-ground / data-ink per
item), `Lightbox` (controlled; a new "Opening photos" slot; the Gallery wall photo layout brings it). The big idea's
"A playful way in" and "Each item brings its own colours" moments now ship their piece wherever they land.
This site keeps its own hand-built versions (built before the pieces existed).
