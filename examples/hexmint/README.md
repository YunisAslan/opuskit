# Hexmint

Invoices, expenses and quarterly books for small studios. A static Next.js site built from an OpusKit recipe
(`CLAUDE.md`, `recipe/`, `build/`).

```bash
npm install
npm run dev -- -p 3007   # http://localhost:3007
npm run build            # static export to out/ (output: 'export'); upload out/ to any static host
npm run stills           # with the dev server running: re-render the hero poster and the supporting renders
```

- Copy lives in `src/content/site.ts`; client names, quotes and numbers there are stand-ins.
- Media is addressed by key through `src/config/assets.ts`. Every image in `public/media/` is rendered from the
  3D scene in code (`src/components/scene/`), so after changing the scene run `npm run stills`.
- The sign-up panel has no backend yet: wire `src/components/site/Signup.tsx` to your auth provider.
- The logo (`src/components/site/Logo.tsx`, `src/app/icon.svg`, `public/brand/`) is a stand-in.
