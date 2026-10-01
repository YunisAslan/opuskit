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

---

# Rebuild — after docs/plan-vibe.md C (2026-10-01)

The user asked for Slow Atlas to be rebuilt so it shows the fresh OpusKit (real page anatomy, big idea, award vibe).
Built from scratch in `examples/slow-atlas-v2/`, next to the first build, so nothing is lost; it replaces
`examples/slow-atlas/` once the user approves.

## 5. Recipe (2026-10-01)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `addPage`, `addSection`, `setBehaviour`,
`toggleSitePiece`), the same calls the kit UI makes. Approved by the user.
- Kind of site: Blog / magazine · name "Slow Atlas" · about "An independent magazine of long-form travel essays — one place, told slowly." · goal: subscribe
- Look: News Grid (Cherry Red, Newsroom, Sharp, Classic bar, Signature columns footer) · first screen: Typographic statement · movement: Subtle
- Big idea: Loud covers, quiet reading (the kit's recommendation) → Chapters that open with a giant word (Home — Journal), Photos revealed like a curtain (Home — Editorial Story)
- Behaviour: headlines — Cut-out headline; between pages — Curtain between pages; whole site — Designed preloader, Smooth scroll
- Pages (the blog's new defaults): Home (hero → editorial story → journal → categories → newsletter), Articles (journal),
  About (about → team), Newsletter (newsletter → journal) + a custom "Article" page (editorial story → journal → newsletter)
- The exact spec: `opuskit.json`

## 6. Build Package

Claude Code package generated by the same adapter the result page's Download uses (no uploads), written into a fresh
`create-next-app` project (TypeScript, Tailwind, App Router, src/). `next.config.ts` got the `turbopack.root` pin before
the first install. Then `npm install` and, as the package README says, `npm i motion lenis`.

## 7. Media

The same 10 photos as the first build (`media-src/SOURCES.md`), already resized, copied into `public/media/`.

## 8. Prompts to Claude Code

### Prompt 1 (2026-10-01)

Run, at the user's request, by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context).
It was given only: "work inside `examples/slow-atlas-v2/` as the project root; read its CLAUDE.md and AGENTS.md first;
port 3000 is taken, use port 3002 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- story.avif — a lone red house on a hill. The lead image of the Editorial Story section.
- article-1.jpg to article-6.jpg — one photo per essay: a foggy road by a lake, a misty harbour with two boats, an empty desert road, red wooden houses by a lake in snow, a cobbled street through an arch, a view from a train window. Use them for the essays wherever articles are shown (Journal, the Articles page, the Home page) and for the Categories.
- team-1.jpg, team-2.jpg, team-3.jpg — portraits of the three editors, for the Team section.

I don't have a logo yet — make a simple one for Slow Atlas.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

The subagent stopped once, before writing any project file: the user blocked one of its tool calls (making preview copies
of the photos) and asked it to wait. The user then said "continue"; the subagent was resumed with the message below,
word for word.

```
Continue. Go ahead with your plan.
```

It would not resume on a relayed message, and asked for the user's own answer. The user was asked directly in the
OpusKit session and answered: go ahead; and yes, it may look at the photos. Relayed word for word:

```
The user answered directly (asked in the OpusKit session): "Yes, go ahead" with the build, and "It may look at the photos" — you may make preview copies (outside the project) to write the alt text. Continue with your plan.
```

Result: every page built from the ready sections and kit pieces; `next build` with `output: 'export'` passes (20 routes,
all static). Its own additions: one page per category (`/routes/[slug]`, the category tiles link there), `/colophon`
(privacy + photo credits), a 404. It fixed two bugs in the shipped kit pieces (the page curtain never ran — its click
listener fired after next/link had navigated; CutReveal and Preloader hydration mismatches under reduced motion); those
fixes were then made in OpusKit's own sources too. Still temporary: the logo (made by Claude Code), the newsletter
provider (the form only confirms), all copy (written by Claude Code).

Reviewed by Claude on the static export (`out/`, served as plain files) at 1440 px and 390 px (Playwright): no
horizontal overflow, no console errors, no failed requests; the menu click-through to About renders; scrolling the home
page reveals every section in order (hero → the red house story → "Dispatches" → journal → four ways to arrive → newsletter).

The user approved the rebuild (2026-10-01): `examples/slow-atlas-v2/` replaced `examples/slow-atlas/` (the first build
stays in git history). Clips are to be recorded by the user from the new live export.

### Prompt 2 (2026-10-01) — fix round 1

Found by Claude in the live export (`/live/slow-atlas/index.html`): the menu link to About went to
`/live/slow-atlas/live/slow-atlas/about` (404). Cause: the shipped PageCurtain piece pushed `url.pathname`, which already
carries the basePath. The piece was fixed in OpusKit's own source first (`src/pieces/PageCurtain.tsx`), and the prompt
hands Claude Code that updated piece — the same code a fresh Build Package now ships. Sent to the same Claude Code
subagent that built the site, after one line of context ("The project has moved: it is now
`/Users/yunis/Desktop/OpusKit/examples/slow-atlas/` — same files; work there."), word for word:

````
One fix. I'm publishing the site under a sub-path (basePath '/live/slow-atlas'). There, clicking About in the menu goes to /live/slow-atlas/live/slow-atlas/about and shows the 404 page — the page curtain pushes a path that already has the basePath in it.

OpusKit has fixed this piece: the curtain now holds the click, covers the page, then replays the click so next/link navigates by itself (basePath included, and menus get their normal click). Replace src/components/pieces/PageCurtain.tsx with this version, unchanged:

```tsx
'use client'
// OpusKit piece — page transition: clicking an internal link raises a plain panel over the page carrying the link's
// words, then the panel keeps rising off the top to reveal the next page (under 700 ms in all). Mount once in the root
// layout. Respects reduced motion (plain navigation). Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const EASE = [0.76, 0, 0.24, 1] as const

export function PageCurtain({ color = 'var(--color-text)' }: { color?: string }) {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [name, setName] = useState('')
  useEffect(() => {
    if (reduce) return
    let replaying = false
    const onClick = (e: MouseEvent) => {
      if (replaying) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return
      e.preventDefault()
      e.stopPropagation() // capture phase: hold the click before next/link sees it, then replay it once the page is covered
      const text = (a.textContent ?? '').trim().replace(/\s+/g, ' ')
      setName(text.length > 40 ? `${text.slice(0, 39)}…` : text)
      setPhase('cover')
      setTimeout(() => { replaying = true; a.click(); replaying = false }, 300) // next/link navigates (basePath, prefetch, its own handlers)
      // Same pathname (only the query changed) never fires the reveal below — lift the curtain anyway.
      setTimeout(() => setPhase((p) => (p === 'cover' ? 'reveal' : p)), 1200)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce])
  useEffect(() => { setPhase((p) => (p === 'cover' ? 'reveal' : p)) }, [path])
  if (phase === 'idle') return null
  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[100] grid place-items-center px-6" style={{ background: color }}
      initial={{ y: '100%' }} animate={{ y: phase === 'cover' ? '0%' : '-100%' }}
      transition={{ duration: phase === 'cover' ? 0.3 : 0.35, ease: EASE }}
      onAnimationComplete={() => { if (phase === 'reveal') setPhase('idle') }}>
      <span className="text-center font-(family-name:--font-display) text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight text-(--color-background)">{name}</span>
    </motion.div>
  )
}
```

Because the click now reaches next/link and your menus again, remove the workaround you added in the header for closing the mobile menu and dropdown if it is no longer needed (keep it if they still don't close).

To check: temporarily add basePath: '/live/slow-atlas' to next.config.ts, run next build, serve out/ so it answers under /live/slow-atlas, click through the menu, the Routes dropdown, the mobile menu and the footer at 1440 px and 390 px — then remove the basePath again and run the normal production build.
````

Result: PageCurtain replaced with OpusKit's fixed version; the header's menu-closing workaround removed (the menus close
by themselves again). Claude Code checked 12 click-throughs under the basePath at 1440 px and 390 px; the normal
production build passes (20 static routes). Reviewed by Claude on the new live export (`/live/slow-atlas/index.html`):
menu → About and → Essays land on the right pages, no failed requests, no console errors.
