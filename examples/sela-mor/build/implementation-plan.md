# Implementation plan

Work through every step in order, in one pass — no pausing for review between steps. After each step, run the `visual-qa` skill on what you built, fix, and continue.

## Step 1
Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.

## Step 2
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.

## Step 3
Build static layout for all 6 pages (19 sections plus navbar and footer) with real copy — no motion yet.

## Step 4
Build the hero: Kinetic type hero.

## Step 5
Make every section responsive (mobile first, then tablet and desktop).

## Step 6
Add motion in order of importance: Fade & rise reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-driven type, Page transition.

## Step 7
Add reduced-motion variants, then run the visual QA checklist against this recipe.

## Implementation Guide

**Recommended stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion, Lenis

### Dependencies
- `motion` — Viewport reveals, hover and layout animations — and the kit pieces in src/components/pieces/
- `lenis` — Smooth scroll on desktop; Motion useScroll reads the scroll it keeps
- `shadcn/ui` — Accessible, themeable controls and forms (Radix primitives) — see UI components

### Suggested file structure
```
src/
  app/            — routes; layout.tsx loads fonts via next/font
  components/     — Navigation, Hero, StatementBlock, ProjectCard, MediaSection, CTA, Footer, MediaAsset, SectionHeader
  config/assets.ts — asset reference layer (every image/video by key)
  components/pieces/ — your kit, ready to use: ImageTrail, TextRoll, Magnetic, PageFade, AmbientSound, Lightbox
  styles/tokens.css — palette + type tokens as CSS variables
  lib/motion.ts   — Lenis setup, reduced-motion guard
public/media/     — optimised images and videos
```

### Implementation sequence
1. Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.
2. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.
3. Build static layout for all 6 pages (19 sections plus navbar and footer) with real copy — no motion yet.
4. Build the hero: Kinetic type hero.
5. Make every section responsive (mobile first, then tablet and desktop).
6. Add motion in order of importance: Fade & rise reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-driven type, Page transition.
7. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- Type: display scales with clamp() — clamp(2.75rem, 7vw, 6.5rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Check contrast: body text must pass AA (21.0:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Mona Sans / Mona Sans — subset display faces.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
