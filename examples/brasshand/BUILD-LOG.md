# Build log — Brasshand

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #2 of docs/plan-for-fit.md §5: bold / typography-first, kinetic type, lively, agency.

## 1. Recipe (2026-10-01)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `toggleSitePiece`), the same calls the
kit UI makes. Approved by the user.
- Kind of site: Agency · name "Brasshand" · about "A small branding agency in Baku — names, identities and campaigns for food, music and culture." · goal: contact
- Look: Typography First, with the row's fresh picks (§5): colours Lido Blue, lettering Poster Caps (Bayon / Reddit Sans) · first screen: Kinetic type · movement: Dynamic
- Big idea: Chapters in giant words (also the kit's recommendation) → Chapters that open with a giant word (Home — Manifesto), Proof, one at a time (Home — Featured Work)
- Menu: Full-screen menu (the look's own) · footer: Big name · shape: Sharp
- Behaviour: headlines — Cut-out headline; links — Rolling links; main button — Magnetic button; between pages — Curtain between pages; whole site — Designed preloader, Smooth scroll
- Pages (the agency's defaults): Home (hero → manifesto → featured work → services → clients → journal → closing CTA),
  Case Studies, Services, About (about → team → stats → closing CTA), Contact
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app` project (TypeScript, Tailwind, App Router, src/). `next.config.ts` got the `turbopack.root`
pin before the first install. Then `npm install` and, as the package README says, `npm i motion lenis`.

## 3. Media

10 photos from Unsplash, picked by Claude with the Unsplash connector at the user's request (sources and the brand check in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into `public/media/`.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-01)

Run, at the user's go-ahead ("davam et brasshand-a başlayaq"), by a fresh Claude Code subagent started from the OpusKit
session (no OpusKit context). It was given only: "work inside `examples/brasshand/` as the project root; read its
CLAUDE.md and AGENTS.md first; ports 3000 and 3002 are taken, use port 3004 for its dev server" — then the prompt below,
word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- work-1.jpg to work-6.jpg — six of our projects, one photo each: menus for a restaurant, a festival poster campaign, coffee packaging, a record label, wayfinding for a culture space, a bakery. Use them for Featured Work, the Case Studies page and anywhere else our work is shown. The clients are made up — invent names that fit Baku.
- studio.jpg — a hand lettering on tracing paper, for the About page.
- team-1.jpg, team-2.jpg, team-3.jpg — portraits of the three of us, for the Team section.

I don't have a logo yet — make a simple one for Brasshand.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: every page built from the ready sections and kit pieces; `next build` with `output: 'export'` passes (17 routes,
all static). Its own additions: six case-study pages (`/work/[slug]`), three journal entries, a 404. It fixed two bugs in
the shipped kit pieces (PageCurtain showed doubled letters for TextRoll links; Magnetic hydration mismatch under reduced
motion) — fixed in OpusKit's own sources too. It flagged that `work-4.jpg` showed a real label's logo ("grp"): Claude
replaced the file with a brandless cassette photo (same name, `media-src/SOURCES.md`). Claude also un-ignored the recipe's
`build/` folder in `.gitignore` (create-next-app's `/build` line kept it out of git).

Reviewed by Claude on the static export at 1440 px and 390 px (Playwright): no horizontal overflow, no console errors, no
failed requests; the proof chapter holds while the six projects replace each other (01 / 06 … 06 / 06); the footer ends on
BRASSHAND across the full width.

### Prompt 2 (2026-10-01) — fix round 1

Sent to the same Claude Code subagent, word for word:

```
Two fixes:

1. I replaced public/media/work-4.jpg — the old record photo had a real label's logo on it. The new one is a white cassette with its tape pulled out, on an orange ground. Update its alt text, and anything in the copy that describes the photo.
2. When the giant chapter words scroll under the top bar, the logo and "Menu" sit right on top of the black letters and get hard to read. Keep the bar readable over them (for example the page blue behind it once the page has scrolled).

Run the production build again when you're done.
```

Result: the cassette photo has new alt text and the Mugham Tapes copy now speaks of a tape label (cassettes, inlays);
the top bar now always has the page blue behind it, so the logo and "Menu" stay readable over the chapter words.
`next build` passes again (17 static routes).
