# Implementation plan

Work through every step in order, in one pass — no pausing for review between steps. After each step, run the `visual-qa` skill on what you built, fix, and continue.

## Step 1
Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.

## Step 2
Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Sofia Sans Extra Condensed → --font-sofia-sans-extra-condensed, Sofia Sans → --font-sofia-sans, Sofia Sans Condensed → --font-sofia-sans-condensed). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.

## Step 3
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.

## Step 4
Build static layout for all 5 pages (14 sections plus navbar and footer) with real copy — no motion yet.

## Step 5
Build the hero: Scroll-controlled video.

## Step 6
Build each photo part as its own Photos line says (recipe/layout.md): Featured Work — Photo story.

## Step 7
Make every section responsive (mobile first, then tablet and desktop).

## Step 8
Add motion in order of importance: Clip reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.

## Step 9
Season every page (recipe → Seasoning): smooth loaders everywhere, this site’s few micro-interactions used the same way on every page, parallax only in its dose — salt, not sauce; how each feels is in Interaction craft.

## Step 10
Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Film-inspired (recipe/design.md → What Film-inspired is known for).

## Step 11
Add reduced-motion variants, then run the visual QA checklist against this recipe.

## Implementation Guide

**Recommended stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion, Lenis

### Dependencies
- `motion` — Viewport reveals, hover and layout animations — and the kit pieces in src/components/pieces/
- `lenis` — Smooth scroll for the SmoothScroll kit piece (MIT; mouse and trackpad only)
- `shadcn/ui` — Accessible, themeable controls and forms (Radix primitives) — see UI components

### Suggested file structure
```
src/
  app/            — routes; layout.tsx loads fonts via next/font
  components/     — StatementBlock, Gallery, ReservationForm, Accordion, MediaAsset
  config/assets.ts — asset reference layer (every image/video by key)
  components/pieces/ — your kit, ready to use: SmoothScroll, PageCurtain
  styles/tokens.css — palette + type tokens as CSS variables
  lib/motion.ts   — Lenis setup, reduced-motion guard
public/media/     — optimised images and videos
```

### Implementation sequence
1. Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.
2. Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Sofia Sans Extra Condensed → --font-sofia-sans-extra-condensed, Sofia Sans → --font-sofia-sans, Sofia Sans Condensed → --font-sofia-sans-condensed). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.
3. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.
4. Build static layout for all 5 pages (14 sections plus navbar and footer) with real copy — no motion yet.
5. Build the hero: Scroll-controlled video.
6. Build each photo part as its own Photos line says (recipe/layout.md): Featured Work — Photo story.
7. Make every section responsive (mobile first, then tablet and desktop).
8. Add motion in order of importance: Clip reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.
9. Season every page (recipe → Seasoning): smooth loaders everywhere, this site’s few micro-interactions used the same way on every page, parallax only in its dose — salt, not sauce; how each feels is in Interaction craft.
10. Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Film-inspired (recipe/design.md → What Film-inspired is known for).
11. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(4rem, 13vw, 12.5rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.
- First screens are min-height 100svh, never 100vh (it runs under the phone’s URL bar); a full-height layer — the phone menu, a sheet — is 100dvh.
- Fields are 16px or larger on phones, so iOS never zooms the page on focus; zoom is never disabled.
- The viewport export sets viewportFit: 'cover' and themeColor #040404 (the colour at the top of the page); fixed bars pad with env(safe-area-inset-*).

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Video: pause control, no autoplay with sound, captions if speech.
- Check contrast: body text must pass AA (17.1:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate only transform, opacity and clip-path (all compositor-friendly); never layout properties such as width, height, top or margin.
- Self-host fonts with next/font; Sofia Sans Extra Condensed / Sofia Sans — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Target: LCP < 2.5s on a mid-range phone, measured on the poster still — the LCP element: it is a plain <img> with priority, painted before any script; the film, the scroll pin and the motion library load after it. CLS < 0.1, INP < 200ms.
