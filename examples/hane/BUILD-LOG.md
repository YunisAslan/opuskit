# Build log — Hane

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #6 of docs/plan-for-fit.md §5: quiet / japanese-minimal, editorial-image first screen, calm movement, clinic.

## 1. Recipe (2026-10-02)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`), the same calls the kit UI makes.
Approved by the user.
- Kind of site: Health & wellness · name "Hane" · about "A small physiotherapy and slow-movement studio — hands-on
  treatment, then exercises you can keep doing at home." · goal: Book or reserve
- Look: Japanese Minimal · colours Pink Plaster (the look's own) · lettering Private Collection (the row's fresh pick, §5) ·
  shape Soft · first screen: One big photo · movement: Subtle
- Big idea: A walk through named stops (the kit's recommendation) → guided stops (Home — Location), a live status line
  (Navigation)
- Menu: Classic bar · footer: Say hello · behaviour: links — Filling underline; headlines, main button, between pages and
  whole site — none
- Pages (the clinic defaults): Home (hero → services → how it works → team → testimonials → pricing → location →
  reservation), Treatments (services → process → pricing → FAQ), Practitioners (team → testimonials), Book an appointment
  (reservation → location → FAQ), FAQ (FAQ → closing CTA)
- Not used: "photo filter that moves" (plan-vibe D1, put aside by the user).
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder.
Then `npm install` and, as the package README says, `npm i motion`.

## 3. Media

8 photos from Unsplash, picked by Claude with the Unsplash connector (sources and what was rejected in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`. `location.jpg` lost its top 6% (the cut-off edge of a house-number tile) before resizing.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-02)

Run at the user's go-ahead ("subagent ilə et") by a fresh Claude Code subagent started from the OpusKit session (no
OpusKit context). It was given only: "work inside `examples/hane/` as the project root; read its CLAUDE.md and AGENTS.md
first; port 3000 is taken, use port 3011 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- hero.jpg — hands treating a patient's lower back on pale linen, in soft daylight. This is the first screen.
- step-1.jpg — our bright treatment room at the start of a session, for the first step of How it works (the first visit: we listen and assess).
- step-2.jpg — hands treating an arm and shoulder, close up, for the second step (the treatment).
- step-3.jpg — stretching on a mat at home, for the third step (exercises you keep doing at home).
- team-1.jpg, team-2.jpg, team-3.jpg — our three practitioners, for the team on Home and on Practitioners.
- location.jpg — our entrance, for the Location section.

I don't have a logo yet — make a simple one for Hane.

Booking has no backend yet: the booking form can open the visitor's mail app with the details filled in.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: the whole site built — Home, Treatments, Practitioners, Book an appointment (`/book`), FAQ and a 404, from the
ready sections and the kit piece. Its own additions: a doorway logo (`Logo.tsx`, `icon.svg`); the walk ("The way in" on
Home: The door → The front room → Room 2, a pinned photo per stop with a small card and a stop index); a stop name per
chapter on every page (right edge on desktop, a sticky bottom bar with phone and "Book an appointment" on phones); a live
status line in Europe/London time ("Closed, opens tomorrow at 09:00"); a booking form (treatment, calendar day, time,
details) that opens the visitor's mail app; a five-session price switch; .webp copies of each photo (800, 1600). It
invented the address (8 Calder Mews, London N1), a fiction-reserved phone number, `hello@hane.example`, hours, the three
practitioners (Ines Calder, Tom Reyes, Ruth Hale), prices, FAQ and quotes. It reported that the ready Reservation and FAQ
sections used a plain browser input and a hand-made accordion, which the recipe forbids, so it rebuilt them with shadcn
parts; and that the man treating in the hero and step photos is not one of the three practitioners. `next build` with
`output: 'export'` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px (Playwright, scrolled through Home): no horizontal overflow,
no console errors, no failed requests; every page renders. The walk, prices, team and booking read as one calm set.
