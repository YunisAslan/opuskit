# Implementation plan

Work through the steps in order. After each step, run the `visual-qa` skill on what you built.

## Step 1
Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.

## Step 2
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.

## Step 3
Build static layout for all 19 pages (7 sections plus navbar and footer) with real copy — no motion yet.

## Step 4
Build the hero: Scroll-controlled video.

## Step 5
Make every section responsive (mobile first, then tablet and desktop).

## Step 6
Add motion in order of importance: Fade & rise reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.

## Step 7
Add reduced-motion variants, then run the visual QA checklist against this recipe.

## Implementation Guide

**Recommended stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion, Lenis, GSAP + ScrollTrigger

### Dependencies
- `motion` — Viewport reveals, hover and layout animations in React
- `gsap` — ScrollTrigger for pinned and scrubbed sequences (all plugins are free)
- `lenis` — Smooth scroll synced to ScrollTrigger (desktop only)

### Suggested file structure
```
src/
  app/            — routes; layout.tsx loads fonts via next/font
  components/     — Navigation, Hero, ProductCard, MediaSection, FeatureBlock, Accordion, Footer, MediaAsset, SectionHeader
  config/assets.ts — asset reference layer (every image/video by key)
  styles/tokens.css — palette + type tokens as CSS variables
  lib/motion.ts   — ScrollTrigger/Lenis setup, reduced-motion guard
public/media/     — optimised images and videos
```

### Implementation sequence
1. Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.
2. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.
3. Build static layout for all 19 pages (7 sections plus navbar and footer) with real copy — no motion yet.
4. Build the hero: Scroll-controlled video.
5. Make every section responsive (mobile first, then tablet and desktop).
6. Add motion in order of importance: Fade & rise reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.
7. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(2.5rem, 7vw, 6rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Visible focus states using the accent color (2px outline, 2px offset).
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Video: pause control, no autoplay with sound, captions if speech.
- Check contrast: body text must pass AA (7.7:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Unbounded / Onest — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Import only the GSAP plugins you use; kill ScrollTriggers on unmount.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
