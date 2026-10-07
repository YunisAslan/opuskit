# Build log — Fieldhouse

How this site was made, step by step, so "it came out of OpusKit" can be checked (see docs/plan-examples.md §3).
Example #17 of docs/plan-examples.md §5: an architecture studio that restores old barns — studio · Modern Heritage
(a look no example had yet) · dynamic. The first example made the **Library + Build** way, not in the kit.

## 1. Recipe (2026-10-06)

Made through the Library flow in a real browser, as a user would, with OpusKit's own screens:
- Library → **Or start blank** → Studio.
- Brand — name "Fieldhouse"; one sentence "An architecture studio that turns old barns into houses — keeping the
  timber, the stone and the light."; Look: **Modern Heritage**; Colours: **Warm Black** (four compared in Brand's
  sample: Espresso, Limestone, Warm Black, Bottle Green — the dark ground with an ochre accent reads as old oak and
  straw); Lettering: **Moonlit Italic** (Cormorant with Karla — the look's own first pick).
- Pages — Home: first screen changed to **Photo with depth** (Other first screens), Journal removed, Testimonials
  added, then ordered: first screen → Featured Work → Manifesto → Testimonials → Closing CTA. "Practice" renamed
  **Work** (Featured Work → Gallery). Project (Case Study → Gallery → Specs → Featured Work), About (About → Process →
  Team) and Contact (Closing CTA → Location) kept as the kind of site gives them.
- Menu Side index · footer Signature columns · shape Soft · layout Editorial — all the look's own. No effects picked.
- Next: Recipe → saved. Approved by the user ("aha başlaya").
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`,
`--disable-git`). `next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's
`build/` folder; the create-next-app placeholder SVGs in `public/` were removed. Then `npm install`.

## 3. Media

2026-10-06: none yet (Pexels showed a "verify you are human" check to the automated browser; the Unsplash connector
needed re-authorising), so the build started with temporary pictures (Prompt 1).

2026-10-07: 28 photos found and picked by Claude through the Unsplash connector, by the shot list in
`recipe/media.md`: the first screen (desktop 16:9 and a 4:5 phone crop), four projects, a gallery of ten (wide views,
details, hands at work), four case-study moments (before, drawing, making, after), two About pictures, four team
portraits, two for Location. Two first picks for About were swapped out because a cap and a T-shirt carried a brand
mark. One shared grade, crops by the shot list's ratios, sizes and sources in `media-src/SOURCES.md`; originals in
`media-src/`, the copies the site uses in `public/media/`. So the build no longer needs temporary pictures (Prompt 2).

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-06)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context). So that it saw nothing of
OpusKit (the user asked), the project was moved outside the OpusKit repository for the build and moved back after; this
log was kept outside the project until then. It was given only: "work inside the project folder as its root, never
read or edit anything outside it; read its CLAUDE.md and AGENTS.md first; ports 3000 and 3001 are taken, use port 3017
for its dev server; never remove or change the `turbopack.root` line in next.config.ts" — then the prompt below, word
for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, a calm tone from the palette with the key written small in a corner, saved in public/media/ under the name the asset layer expects. Mark them all as temporary in assets/manifest.json. When my photos arrive I will only replace those files.
```

Stopped on 2026-10-06 at the user's request (work continues the next day on another computer), early in step 1 of the
implementation plan: it had set up shadcn/ui (`components.json`, `src/components/ui/`, `src/lib/utils.ts`,
`src/app/globals.css`) and was reading the reference sections; no page was written yet. To go on: a fresh subagent,
built the same way (outside the repo, sees only the project), with the same prompt plus "Continue where the last
build stopped: shadcn/ui is set up, no pages yet." — logged here as Prompt 2.

### Prompt 2 (2026-10-07)

A fresh Claude Code subagent, run the same way as Prompt 1 (the project moved outside the OpusKit repository, this log
and the photo originals kept outside it until the build ended; the same four rules, port 3017), with:

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md. Continue where the last build stopped: shadcn/ui is set up, no pages yet.

My photos are ready, so no temporary pictures are needed: they are in public/media/. Each file name says the part it is for (hero and hero-mobile, project-1 to project-4, gallery-1 to gallery-10, case-1 to case-4, about and about-2, team-1 to team-4, location-1 and location-2), and media-src/SOURCES.md says what each one shows. Use them through src/config/assets.ts and record them in assets/manifest.json.
```

### Prompt 2, resumed (2026-10-07)

The session ended while Prompt 2 was running (it had written the layout, menu, footer, first screen and shared
components; no inner pages yet). The same subagent was resumed with:

```
continue where you left off
```

The resumed run stopped once more on the account's usage limit and was resumed again with the same words
("continue where you left off"); it then finished the site: Home, Work, four project pages (`/work/{slug}`), About,
Contact, Privacy and a not-found page, every word in `src/content/site.ts` (invented facts marked `PLACEHOLDER`), a
barn-gable logo it drew (`src/components/Logo.tsx`, also the favicon), all 28 photos through `src/config/assets.ts`.
Its own notes: the enquiry form has no server (it opens the visitor's mail app); all four project pages share the four
"how it was made" photos; Featured Work is "large and small pictures" on Work and "names that reveal photos" on Home and
the project pages; form errors use the brass accent (the palette has no error colour).

## 5. Review (2026-10-07)

Production build clean (12 routes). Every page at 1440 and 390 in Chromium, and Home on an emulated touch phone: no
console errors, no failed requests (only the 404 page's own 404), no sideways scroll; the pinned sideways galleries,
the menu's section index and the touch thumbnails in the project list all work.

## 6. Fix round 1 (2026-10-07)

From the review: Home shows almost no pictures after the first screen (on a computer the projects' photos appear only
on hover), and each project page's main photo sits small beside the text. The same subagent, resumed the same way
(the project outside the repository, this log and the photo originals kept outside it), was sent:

```
Two things to fix, both about pictures.

1. Home: after the first screen the page is almost all words. On a computer the four barns' photos only appear when you hover a name, so most visitors never see them. This studio is shown by its buildings: let the photos of the four barns be seen on Home without hovering, large, while keeping the list of names.

2. Project pages: each barn's main photo sits small, half the width, beside the text. Make it the page's big picture — wide and large, before the story and the facts.
```

Result: Home now keeps the list of names beside one large photo that holds its place and shows the barn in view
(`src/components/BarnIndex.tsx`, new; on phones each name has its own full-width photo); each project page opens with
its title, then the main photo full width (16:9, 3:2 on phones), then the facts and story
(`src/components/sections/CaseStudy.tsx`). Build and lint pass.
