# Sticky Weather

The site of Sticky Weather, a small design studio in Bristol. Built from the OpusKit recipe in `recipe/` (start at `CLAUDE.md`).

- `npm install`, then `npm run dev` (this project uses port 3006: `npx next dev -p 3006`).
- `npm run build` writes a fully static site to `out/` (`output: 'export'` in `next.config.ts`). Serve that folder from any static host.
- Copy lives in `src/content/site.ts`; photos are keyed in `src/config/assets.ts` (sources: `media-src/SOURCES.md`); the logo and stickers are drawn in code (`src/components/Logo.tsx`, `src/components/Stickers.tsx`).
- The hello form has no server: it opens the visitor's email app addressed to hello@stickyweather.studio.
