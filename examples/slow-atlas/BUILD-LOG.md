# Build log — Slow Atlas

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).

## 1. Recipe (2026-10-01)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `addPage`, `addSection`), the same calls the kit UI makes:
- Kind of site: Blog / magazine · name "Slow Atlas" · about "An independent magazine of long-form travel essays — one place, told slowly." · goal: subscribe
- Look: News Grid · first screen: Typographic statement · movement: Subtle · everything else the look's defaults
- Pages: Home, Articles, About, Newsletter (the blog's usual pages) + a custom "Article" page: Editorial Story → Journal → Closing CTA
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package exported the same way as the result page's Download (no uploads), unzipped into a fresh
`create-next-app` project. `next.config.ts` got the `turbopack.root` pin before the first install.

## 3. Media

The user's files in `media-src/` (sources in `media-src/SOURCES.md`), copied into `public/media/`.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-01)

Run by the user in their own terminal: `claude` in `examples/slow-atlas/`, prompt pasted as below.
Media copied first: the files in `media-src/` resized to at most 2400 px on the long side (JPEG q82) into `public/media/`; `story.avif` copied as is.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- story.avif — a lone red house on a hill. The lead image of the Editorial Story section on the Article page.
- article-1.jpg to article-6.jpg — one photo per essay: a foggy road by a lake, a misty harbour with two boats, an empty desert road, red wooden houses by a lake in snow, a cobbled street through an arch, a view from a train window. Use them for the essays wherever articles are shown (Journal, the Articles page, the Home page).
- team-1.jpg, team-2.jpg, team-3.jpg — portraits of the three editors, for the Team section.

I don't have a logo yet — make a simple one for Slow Atlas.
```

Result: all 5 pages and 7 essays built from the ready sections; `next build` passes (14 routes). Reviewed by Claude at
1440 px and 390 px (Playwright): no overflow, no console errors, no failed requests, mobile menu works.

### Prompt 2 (2026-10-01) — fix round 1

Run, at the user's request, by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context).
It was given only: "work inside `examples/slow-atlas/` as the project root; read its CLAUDE.md and AGENTS.md first;
a dev server already runs on port 3000" — then the prompt below, word for word.

```
Looks good. A few fixes:

1. The Home page says the same thing twice: the Intro ("One essay every second Sunday. One place per essay…") and the About block below it repeat the same sentence. Give the About block its own statement — about who makes the magazine, not the format again. The About page opens with that same sentence too; change it there as well.
2. On the About page, Marit's portrait appears twice — at the top and again in The editors. Show each portrait only once.
3. On the Home page there's a big empty gap between the subscribe form and the footer on desktop. Close it up.
4. On mobile, the menu sheet doesn't reach the bottom of the screen — the page shows through under the Subscribe button. Make it cover the whole screen.
5. I want to publish this as a static site (next build with output: 'export'). Right now /articles reads ?page= from the URL, so it can't be exported. Make the archive pages static (for example /articles/page/2) so the whole site exports.

Run the production build again when you're done.
```

Result: all five fixes in; every route static (`/articles` + `/articles/page/2`); `next build` passes. Reviewed by Claude
at 1440 px and 390 px: no overflow, no console errors, no failed requests, menu sheet covers the screen.
