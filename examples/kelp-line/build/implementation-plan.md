# Implementation plan

Work through every step in order, in one pass — no pausing for review between steps. After each step, run the `visual-qa` skill on what you built, fix, and continue.

## Step 1
Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.

## Step 2
Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Hedvig Letters Serif → --font-hedvig-letters-serif, Hedvig Letters Sans → --font-hedvig-letters-sans). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.

## Step 3
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.

## Step 4
Build static layout for all 6 pages (25 sections plus navbar and footer) with real copy — no motion yet.

## Step 5
Build the hero: Editorial image hero.

## Step 6
Build each photo part as its own Photos line says (recipe/layout.md): Gallery — Photo story.

## Step 7
Make every section responsive (mobile first, then tablet and desktop).

## Step 8
Add motion in order of importance: Soft fade, Image clip reveal, Line-by-line headline reveal.

## Step 9
Season every page (recipe → Seasoning): smooth loaders everywhere, this site’s few micro-interactions used the same way on every page, parallax only in its dose — salt, not sauce; how each feels is in Interaction craft.

## Step 10
Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Coastal Calm (recipe/design.md → What Coastal Calm is known for).

## Step 11
Add reduced-motion variants, then run the visual QA checklist against this recipe.

## Implementation Guide

**Recommended stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion

### Dependencies
- `motion` — Viewport reveals, hover and layout animations — and the kit pieces in src/components/pieces/
- `shadcn/ui` — Accessible, themeable controls and forms (Radix primitives) — see UI components

### Suggested file structure
```
src/
  app/            — routes; layout.tsx loads fonts via next/font
  components/     — StatementBlock, ServiceList, Quote, MediaSection, MediaAsset
  config/assets.ts — asset reference layer (every image/video by key)
  components/pieces/ — your kit, ready to use: Lightbox
  styles/tokens.css — palette + type tokens as CSS variables
public/media/     — optimised images and videos
```

### Implementation sequence
1. Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.
2. Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Hedvig Letters Serif → --font-hedvig-letters-serif, Hedvig Letters Sans → --font-hedvig-letters-sans). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.
3. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.
4. Build static layout for all 6 pages (25 sections plus navbar and footer) with real copy — no motion yet.
5. Build the hero: Editorial image hero.
6. Build each photo part as its own Photos line says (recipe/layout.md): Gallery — Photo story.
7. Make every section responsive (mobile first, then tablet and desktop).
8. Add motion in order of importance: Soft fade, Image clip reveal, Line-by-line headline reveal.
9. Season every page (recipe → Seasoning): smooth loaders everywhere, this site’s few micro-interactions used the same way on every page, parallax only in its dose — salt, not sauce; how each feels is in Interaction craft.
10. Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Coastal Calm (recipe/design.md → What Coastal Calm is known for).
11. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- Type: display scales with clamp() — clamp(2.75rem, 6.5vw, 5.75rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #0F3F2E (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Check contrast: body text must pass AA (10.5:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate only transform, opacity and clip-path (all compositor-friendly); never layout properties such as width, height, top or margin.
- Self-host fonts with next/font; Hedvig Letters Serif / Hedvig Letters Sans — subset display faces.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
