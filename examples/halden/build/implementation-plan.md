# Implementation plan

Work through every step in order, in one pass — no pausing for review between steps. After each step, run the `visual-qa` skill on what you built, fix, and continue.

## Step 1
Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.

## Step 2
Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.

## Step 3
Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.

## Step 4
Build static layout for all 6 pages (16 sections plus navbar and footer) with real copy — no motion yet.

## Step 5
Build the hero: Scroll-controlled video.

## Step 6
Make every section responsive (mobile first, then tablet and desktop).

## Step 7
Add motion in order of importance: Clip reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.

## Step 8
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
  components/     — ServiceList, MediaSection, ReservationForm, Accordion, MediaAsset
  config/assets.ts — asset reference layer (every image/video by key)
  components/pieces/ — your kit, ready to use: SmoothScroll, ScrollProgress
  styles/tokens.css — palette + type tokens as CSS variables
  lib/motion.ts   — Lenis setup, reduced-motion guard
public/media/     — optimised images and videos
```

### Implementation sequence
1. Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.
2. Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.
3. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.
4. Build static layout for all 6 pages (16 sections plus navbar and footer) with real copy — no motion yet.
5. Build the hero: Scroll-controlled video.
6. Make every section responsive (mobile first, then tablet and desktop).
7. Add motion in order of importance: Clip reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.
8. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(4.5rem, 14vw, 13rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Video: pause control, no autoplay with sound, captions if speech.
- Check contrast: body text must pass AA (17.0:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Imbue / Hanken Grotesk — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
