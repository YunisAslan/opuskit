# Implementation plan

Work through every step in order, in one pass — no pausing for review between steps. After each step, run the `visual-qa` skill on what you built, fix, and continue.

## Step 1
Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.

## Step 2
Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Gloock → --font-gloock, Figtree → --font-figtree). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.

## Step 3
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.

## Step 4
Build static layout for all 3 pages (11 sections plus navbar and footer) with real copy — no motion yet.

## Step 5
Build the hero: Full-bleed photo with depth.

## Step 6
Build each photo part as its own Photos line says (recipe/layout.md): Gallery — Even grid.

## Step 7
Make every section responsive (mobile first, then tablet and desktop).

## Step 8
Add motion in order of importance: Spring settle, Image clip reveal, Parallax drift, Page transition.

## Step 9
Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Retro Seventies (recipe/design.md → What Retro Seventies is known for).

## Step 10
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
  components/     — MenuList, Gallery, MediaSection, ReservationForm, MediaAsset
  config/assets.ts — asset reference layer (every image/video by key)
  components/pieces/ — your kit, ready to use: DragPhotos, TextEffect
  styles/tokens.css — palette + type tokens as CSS variables
public/media/     — optimised images and videos
```

### Implementation sequence
1. Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.
2. Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (Gloock → --font-gloock, Figtree → --font-figtree). If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.
3. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.
4. Build static layout for all 3 pages (11 sections plus navbar and footer) with real copy — no motion yet.
5. Build the hero: Full-bleed photo with depth.
6. Build each photo part as its own Photos line says (recipe/layout.md): Gallery — Even grid.
7. Make every section responsive (mobile first, then tablet and desktop).
8. Add motion in order of importance: Spring settle, Image clip reveal, Parallax drift, Page transition.
9. Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of Retro Seventies (recipe/design.md → What Retro Seventies is known for).
10. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- Type: display scales with clamp() — clamp(3rem, 8vw, 7rem); re-break headlines manually on mobile.
- Grid: 12 columns; 24px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Check contrast: body text must pass AA (14.1:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate only transform, opacity and clip-path (all compositor-friendly); never layout properties such as width, height, top or margin.
- Self-host fonts with next/font; Gloock / Figtree — subset display faces.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
