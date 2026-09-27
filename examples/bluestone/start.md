# Future Film-inspired Fashion House

A fashion house with a film-inspired direction: bold display typography, a earthy palette, video leading the experience and immersive motion.

Complexity: advanced · Recipe id: b04811e7

---

## Creative Direction

**Mood:** Nostalgic, Warm, Dramatic, Futuristic

**Personality:** Futuristic — forward-looking, calm

### Visual principles
- Frame media like film
- Title cards between chapters
- Texture adds warmth

### Do
- Use 2.39:1 letterbox crops for key media
- Add subtle grain (≤ 4% opacity)
- Center title cards

### Avoid
- Heavy vintage filters
- Fake film UI (sprocket holes)
- Cold, clinical palettes

### Design principles
- Frame media like film
- Title cards between chapters
- Texture adds warmth
- Pinned, scroll-driven sequences where media and type are choreographed together.

---

## Color System — Earthy

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#EFE8DC` | The page ground | Body background and full-width sections | — |
| surface | `#E3D9C8` | Raised or contained areas | Cards, form fields, media placeholders, alternate sections | Text on surface: 10.73:1 — AAA |
| text | `#2B2620` | Primary reading color | Headlines and body copy | On background: 12.31:1 — AAA |
| muted | `#71685B` | Secondary information | Captions, metadata, helper text — never long paragraphs | On background: 4.50:1 — AA large text only |
| primary | `#3E4A32` | Brand ink | Olive for buttons and key links | On background: 7.73:1 — AAA |
| secondary | `#C9B89B` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#A65A3A` | The one signal | Terracotta for small highlights and tags | On background: 4.16:1 — AA large text only |
| border | `#D6CAB5` | Structure lines | Hairlines, dividers, input outlines | — |

```css
:root {
  --color-background: #EFE8DC;
  --color-surface: #E3D9C8;
  --color-text: #2B2620;
  --color-muted: #71685B;
  --color-primary: #3E4A32;
  --color-secondary: #C9B89B;
  --color-accent: #A65A3A;
  --color-border: #D6CAB5;
}
```

---

## Typography — Bold Display

| Role | Family | Weight | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| Display | Bricolage Grotesque | 800 | clamp(3.5rem, 12vw, 13rem) | 0.85 | -0.045em | Hero words, statements |
| Heading | Bricolage Grotesque | 700 | clamp(1.75rem, 3.5vw, 3rem) | 1 | -0.03em | Section headings |
| Body | Inter | 400 | 1.0625rem | 1.55 | 0 | Paragraphs |
| Utility | Space Mono | 400 | 0.75rem | 1.4 | 0.02em (uppercase) | Labels, counters |

Source: Google Fonts (Bricolage Grotesque, Inter, Space Mono)

**Why this pairing works:** Bricolage's quirky optical sizing gives giant type personality; a calm body face balances the noise.

---

## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. |
| Card proportions | Rare — use full-width project slides instead of cards |
| Media proportions | 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

---

## Page Structure

Navbar → Hero — Scroll-controlled video → Collection → Lookbook → Editorial Story → Product Grid → Journal → Footer

### 01 Navbar
- **Purpose:** Orientation and the primary action
- **Composition:** Single row, logo left, links right; transparent over hero, solid afterward
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Hide on scroll down, show on scroll up
- **Responsive:** Mobile: logo + menu button; full-screen menu with large links

### 02 Hero — Scroll-controlled video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 03 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third

### 04 Lookbook
- **Purpose:** Sell a mood through styled looks
- **Composition:** Magazine spreads: large + small image pairs with look numbers
- **Content:** Look number, pieces worn, links to products
- **Behavior:** Clip reveals; optional horizontal scroll on desktop
- **Responsive:** Vertical stack, one look per screen

### 05 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width

### 06 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile

### 07 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view

### 08 Footer
- **Purpose:** Practical information and a calm ending
- **Composition:** 3–4 columns: contact, links, social, legal
- **Content:** Address/email, links, copyright
- **Behavior:** Static
- **Responsive:** Stacked columns

---

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. | GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth. |
| LookbookSpread | Present a look like a magazine spread | One large + one small image, look number, credits | Image clip reveal |
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |

---

## Media Direction — Video-led

Moving image carries the atmosphere; motion in the footage is slow, continuous and intentional.

### Treatment
- Slow camera moves, no fast cuts in hero footage
- Always provide a poster frame
- Muted by default, captions if there is speech
- Pause off-screen to save battery

**Formats:** MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP

### Hero — Scroll-controlled video
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Requires:** 1 hero video (5–8s, single continuous camera move, all-intra or GOP ≤ 5); 1 poster image; Mobile 9:16 encode (recommended)
- **Fallback:** Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

---

## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis, GSAP + ScrollTrigger

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change; no layout shift.
- **Duration:** 120–180ms
- **Easing:** ease-out
- **Implementation:** CSS transitions on color, opacity, transform.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

### Fade & rise reveal
- **Purpose:** Give sections a calm entrance so content arrives in reading order.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** opacity 0→1, translateY 16px→0, children staggered 60ms.
- **Duration:** 500–700ms
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- **Performance:** Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- **Reduced motion:** Opacity only, 200ms, no translate.

### Image clip reveal
- **Purpose:** Create a visual transition into the next section; the image "opens" like a curtain.
- **Trigger:** Viewport entry
- **Behavior:** clip-path: inset(100% 0 0 0) → inset(0); inner image scales 1.15 → 1.
- **Duration:** 900–1200ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** CSS clip-path transition triggered by IntersectionObserver, or GSAP for scroll-linked scrub.
- **Performance:** clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- **Reduced motion:** Simple 200ms fade.

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) or with GSAP SplitText; animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

### Smooth scroll
- **Purpose:** Make scroll-linked sequences feel continuous and cinematic.
- **Trigger:** Always on (desktop pointer devices)
- **Behavior:** Inertial scroll with lerp ~0.1; native scroll position preserved.
- **Duration:** Continuous
- **Easing:** lerp
- **Implementation:** Lenis, synced to GSAP ticker (lenis.on("scroll", ScrollTrigger.update)).
- **Performance:** Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- **Reduced motion:** Disable Lenis entirely.

### Pinned story sequence
- **Purpose:** Tell one story in steps while the visual stays in place.
- **Trigger:** Section reaches top of viewport; pinned for 200–400vh
- **Behavior:** Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- **Duration:** Scroll-linked (scrub 0.5)
- **Easing:** linear scrub with eased keyframes
- **Implementation:** GSAP ScrollTrigger with pin: true and a timeline per chapter.
- **Performance:** Limit to one or two pinned sections per page; use pinSpacing and test on mobile Safari.
- **Reduced motion:** Unpin: render chapters as a normal vertical list with static media.

### Scroll-scrubbed video
- **Purpose:** Let the visitor control time — scroll moves the camera through the scene.
- **Trigger:** Pinned hero section scroll progress
- **Behavior:** video.currentTime = progress × duration, smoothed (scrub 0.5).
- **Duration:** Scroll-linked over ~300vh
- **Easing:** linear scrub
- **Implementation:** GSAP ScrollTrigger onUpdate → currentTime; encode with short GOP (ffmpeg -g 1 or ≤ 5) for smooth seeking.
- **Performance:** Preload metadata + first chunk; use requestVideoFrameCallback where supported; mobile encode ≤ 3MB.
- **Reduced motion:** Show poster image; play video only on user request.

### Hover media preview
- **Purpose:** Let an index/list reveal the project image on hover, keeping lists compact.
- **Trigger:** Pointer enters list item (pointer devices only)
- **Behavior:** Image appears near cursor or in a fixed slot, crossfades between items.
- **Duration:** 250ms fade, 0.15 lerp follow
- **Easing:** ease-out
- **Implementation:** Motion (useSpring for cursor follow) — pointer:fine only.
- **Performance:** Preload preview images at small size; disable on touch.
- **Reduced motion:** Show image in fixed slot without follow motion.

### Page transition
- **Purpose:** Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- **Trigger:** Route change
- **Behavior:** Shared element morphs between pages; others crossfade.
- **Duration:** 400–600ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- **Performance:** Keep transitions short; never block navigation on animation.
- **Reduced motion:** Instant navigation.

---

## Content Direction

- **Tone:** visionary, calm
- **Voice:** Describe what becomes possible, concretely.
- **Headline style:** Short, forward statements
- **Headline examples:** "Light, held still", "Films for the in-between hours", "Selected work, 2019—2026"
- **Paragraph length:** 2–4 sentences (40–80 words); never more than 65 characters per line
- **CTA style:** Understated text links — "Discover the collection", "Shop the look" — never loud buttons.
- **CTA examples:** "Start a conversation", "View the reel"
- **Content density:** Low — media carries meaning; text sets context in 1–2 lines
- **Words to avoid:** "Elevate your brand", "The future of…", "Seamless experiences", "Unlock your potential", "Built for modern teams", "Cutting-edge", "Revolutionary", "World-class"

---

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 3 families | required | All text | Bricolage Grotesque, Inter, Space Mono (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | Hero video | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⌕ Find it | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ✓ Have it | Mobile video encode | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⌕ Find it | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ✓ Have it | Secondary video | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ✓ Have it | Scrub-ready encode | 1 file | required | Scroll-controlled hero | ffmpeg -i hero.mp4 -g 1 -crf 23 -an hero-scrub.mp4 (all-intra for smooth seeking) |
| ○ Optional | Texture | 1–2 | optional | Subtle paper/grain overlay at ≤ 4% opacity | Seamless tile, 1024px, WebP |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh

---

## Curated Resources

- **Google Fonts** (fonts) — https://fonts.google.com
  Variable families such as Fraunces or Inter give a wide weight and optical range from one file, and next/font can self-host them. _License: Open-source licenses, mostly SIL OFL; free for commercial use_
- **Realtime Colors** (color) — https://www.realtimecolors.com
  Shows a palette applied to real UI with light and dark modes before tokens are committed. _License: Free web tool_
- **WebAIM Contrast Checker** (color) — https://webaim.org/resources/contrastchecker/
  Muted, low-contrast palettes common in quiet and editorial designs need checking to stay readable. _License: Free web tool_
- **Lucide** (icons) — https://lucide.dev
  Consistent 24px stroke icons with adjustable stroke width, so icons can match the weight of the chosen typeface. _License: ISC_
- **Pexels Videos** (video) — https://www.pexels.com/videos/
  Provides slow, atmospheric clips suitable for muted autoplay hero loops. _License: Free under the Pexels License; attribution not required_
- **Coverr** (video) — https://coverr.co
  Clips are often shot with web backgrounds in mind: steady framing and room for overlaid text. _License: Free downloads usable commercially without attribution; premium items separate_
- **FFmpeg** (developer-tools) — https://ffmpeg.org
  Encodes hero loops to small H.264, VP9 or AV1 files, strips audio and extracts poster frames in one command. _License: LGPL-2.1+ (some optional parts GPL)_
- **HandBrake** (developer-tools) — https://handbrake.fr
  A GUI alternative to FFmpeg for compressing background video to web-friendly sizes. _License: GPL-2.0_
- **Runway** (ai-media) — https://runway.com
  Generates custom hero loops or turns a still into short motion when stock footage does not fit the art direction. _License: Check terms per asset_
- **Kling AI** (ai-media) — https://kling.ai
  Image-to-video from a brand still produces short camera moves for hero sections. _License: Check terms per asset_
- **Motion** (motion) — https://motion.dev
  Layout animations, shared-element transitions and spring physics are declared directly on React components. _License: MIT_
- **GSAP** (motion) — https://gsap.com
  ScrollTrigger handles pinning, scrubbing and scroll-linked timelines, the core of most scroll-driven storytelling sites. _License: Free for all users including plugins, under GSAP's own standard license (Webflow-backed)_
- **Lenis** (motion) — https://lenis.dev
  Smooths native scroll while keeping it native, and syncs with GSAP ScrollTrigger for steady scroll-linked motion. _License: MIT_
- **Texturelabs** (textures) — https://texturelabs.org
  Film grain, paper and dust overlays add analog depth to flat layouts via blend modes. _License: Free for commercial use; credit not required; do not resell or redistribute as textures_
- **ambientCG** (textures) — https://ambientcg.com
  Stone, concrete and fabric materials with full map sets can be used for 3D surfaces or as flat background textures. _License: CC0_

---

## References

Study the principle. Build something original — never copy a referenced site.

### Video in web design (Awwwards)
https://www.awwwards.com/websites/video/
- **Study:** How hero footage is framed, when it loops vs. scrubs, and how poster frames hide loading.
- **Why it matters:** The strongest examples use one continuous camera move rather than edited cuts.
- **Principle:** One continuous shot per hero

### Storytelling websites (Awwwards)
https://www.awwwards.com/websites/storytelling/
- **Study:** Chapter structure — how sites divide a story into scroll "scenes".
- **Why it matters:** Scene-based pacing is what makes long scroll feel like film, not a long page.
- **Principle:** Scroll as timeline

### CSS Design Awards gallery (CSS Design Awards)
https://www.cssdesignawards.com/website-gallery
- **Study:** Look at dark sites: note how text is warm off-white, not pure white.
- **Why it matters:** Pure white on black causes halation; warm tints read more comfortably.
- **Principle:** Warm-tinted contrast

---

## Why It Works

### Why the visual direction works
Film conventions are instantly understood; they give a site narrative pacing and emotional warmth.

### Why the typography works
Bricolage's quirky optical sizing gives giant type personality; a calm body face balances the noise.

### Why the palette works
Olive and terracotta are found together in nature, so they feel harmonious and grounded rather than designed.

### Why the layout works
Edge-to-edge media removes the frame of the browser, making the content feel like an environment, not a page.

### Why the motion works
Choreographed sequences create the memorable moments people share — used once or twice, not everywhere. Here, fade & rise reveal and image clip reveal serve the story: give sections a calm entrance so content arrives in reading order.

### Why the chosen assets work
Footage communicates atmosphere and time in a way stills cannot — the visitor feels the place or product before reading.

---

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
  components/     — Navigation, Hero, LookbookSpread, ProductCard, MediaSection, Gallery, Footer, MediaAsset, SectionHeader
  config/assets.ts — asset reference layer (every image/video by key)
  styles/tokens.css — palette + type tokens as CSS variables
  lib/motion.ts   — ScrollTrigger/Lenis setup, reduced-motion guard
public/media/     — optimised images and videos
```

### Implementation sequence
1. Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.
2. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.
3. Build static layout for all sections (8) with real copy — no motion yet.
4. Build the hero: Scroll-controlled video.
5. Make every section responsive (mobile first, then tablet and desktop).
6. Add motion in order of importance: Fade & rise reveal, Image clip reveal, Line-by-line headline reveal, Smooth scroll, Pinned story sequence, Scroll-scrubbed video, Hover media preview, Page transition.
7. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Type: display scales with clamp() — clamp(3.5rem, 12vw, 13rem); re-break headlines manually on mobile.
- Grid: 12 columns for overlaid text; 24px.
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Visible focus states using the accent color (2px outline, 2px offset).
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Video: pause control, no autoplay with sound, captions if speech.
- Check contrast: body text must pass AA (12.3:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Bricolage Grotesque / Inter — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Import only the GSAP plugins you use; kill ScrollTriggers on unmount.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
