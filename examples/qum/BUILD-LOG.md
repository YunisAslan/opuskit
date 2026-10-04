# Build log — QUM

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-examples.md §3).
Example #16 of docs/plan-examples.md §5: premium skincare shop — ecommerce · scandinavian-minimal (quiet) · subtle.

## 1. Recipe (2026-10-04)

Made with the kit's own functions (`start`, `setStyle`, `setBehaviour`, `addSection`, `removeSection`, `addPage`,
`renamePage`, `setPagePurpose`), the same calls the kit UI makes. The palette was chosen by comparing three in the kit's
live preview (Sage White, Wet Concrete — the kit's first by fit —, Mint Fresh). Approved by the user ("getdik").
- Kind of site: E-commerce · name "QUM" · about "Skincare made in small batches on the Absheron coast, with Caspian salt
  and saffron grown a few kilometres inland. Six products, one ritual." · goal: Buy
- Look: Scandinavian Minimal · colours Sage White · lettering Soft Wedge · shape Soft · layout Balanced · first screen:
  editorial image · movement: Subtle
- Big idea: A walk through named stops (the kit's recommendation) → named stops (The salt — Location), a live status
  line (Navigation)
- Menu: Centered logo · footer: Everything, listed
- Behaviour: headlines — Words that arrive; links — Filling underline; between pages — Soft fade
- Pages: Home (hero → intro → product grid → editorial story → process → testimonials → press → journal → newsletter),
  Shop (categories → product grid → trust), Product (product buy box → specs → process → testimonials → FAQ → product
  grid), Cart, Checkout, The salt (about → editorial story → timeline → location; its brief: "Where QUM comes from: the
  salt pans at Masazir, the saffron fields at Bilgah, the small lab in Mardakan, and the three people who make every
  batch."), Journal (journal → newsletter), Article (article → journal → newsletter), Help (FAQ)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`,
`--disable-git`). `next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's
`build/` folder; the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package
README says, `npm i motion`.

## 3. Media

23 photos from Pexels, picked by Claude (sources and the brand check in `media-src/SOURCES.md`). Originals in
`media-src/`; resized to at most 2400 px on the long side (JPEG q82) into `public/media/`. No film or sound.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-04)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context). It was given only: "work
inside `examples/qum/` as the project root, never edit files outside it; read its CLAUDE.md and AGENTS.md first; port
3001 is taken, use port 3013 for its dev server; never remove or change the `turbopack.root` line in next.config.ts
(`output: 'export'` and `images: { unoptimized: true }` may be added)" — then the prompt below, word for word.
(A first run was stopped within seconds when the user paused the session; it had changed nothing — the shipped code
still matched OpusKit's sources — so the build was started again from the same prompt.)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- hero.jpg — three amber bottles on white salt: the first screen.
- The six products, one photo each: cleanser.jpg (Salt Cleanser), toner.jpg (Mineral Toner), serum-1.jpg (Saffron Serum), cream.jpg (Day Cream), oil.jpg (Night Oil), scrub.jpg (Salt Scrub). balm.jpg is the Hand Balm, a small extra we sell beside them.
- serum-1.jpg to serum-4.jpg — the Saffron Serum from four angles, for its product page (the buy box). The other products' pages use the one photo each has.
- salt-lake.jpg, salt-aerial.jpg, salt-crystals.jpg — the salt pans at Masazir, where our salt comes from.
- saffron-field.jpg, saffron-close.jpg — the saffron fields at Bilgah.
- lab.jpg — our small lab in Mardakan.
- ritual-hands.jpg, ritual-face.jpg, bathroom.jpg — the ritual: for the ritual steps, the journal and the article.
- founder-1.jpg, founder-2.jpg, founder-3.jpg — the three of us who make every batch.

Prices are in manat (₼). There is no real checkout yet: the cart and checkout pages should look real and say plainly that orders open in spring.

I don't have a logo yet — make a simple wordmark for QUM.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: every page built from the ready sections and kit pieces; `next build` with `output: 'export'` passes (20 static
files: Home, Shop, seven product pages, Cart, Checkout, The salt, Journal + three articles, Help, 404). Its own additions:
a bag kept in the browser (localStorage) with "Add to bag" keeping quantity and scent; shop filters (kind, price, sort);
a validated checkout that says orders open in spring and sends nothing; a small "where you are" card naming the current
stop on every page; the live status line (Baku time and the lab's hours) in the menu, footer and Location; the QUM
wordmark in Petrona and a favicon. It changed four shipped sections, all taken into OpusKit's own sources the same day:
ProductBuy (`onAction` for a client-side bag, `name` may hold a heading animation, a swipeable photo row on phones),
Article (`title` may hold a heading animation), Location (`notes` may hold a component), Testimonials (the lead quote
was too narrow — `max-w-[46rem]`).

Reviewed by Claude on the static export at 1440 px and 390 px (Playwright): no horizontal overflow, no console errors, no
failed requests; click-through from the menu (The salt, Journal) and Shop → Saffron Serum → Add to bag → Cart works.
Live at `/live/qum`; registered in `src/data/examples.ts`; `npm run examples` and `npm run check` ✓.

