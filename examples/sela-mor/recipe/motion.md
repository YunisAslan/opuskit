## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis

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

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

### Smooth scroll
- **Purpose:** Make scroll-linked sequences feel continuous and cinematic.
- **Trigger:** Always on (desktop pointer devices)
- **Behavior:** Inertial scroll with lerp ~0.1; native scroll position preserved.
- **Duration:** Continuous
- **Easing:** lerp
- **Implementation:** Lenis (or the SmoothScroll kit piece); Motion useScroll reads the native scroll position Lenis keeps, so no extra syncing is needed.
- **Performance:** Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- **Reduced motion:** Disable Lenis entirely.

### Pinned story sequence
- **Purpose:** Tell one story in steps while the visual stays in place.
- **Trigger:** Section reaches top of viewport; pinned for 200–400vh
- **Behavior:** Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- **Duration:** Scroll-linked (scrub 0.5)
- **Easing:** linear scrub with eased keyframes
- **Implementation:** CSS position: sticky for the pin (a tall outer block, a 100svh sticky frame); Motion useScroll on the outer block → useTransform per chapter.
- **Performance:** Limit to one or two pinned sections per page; the outer block height is the pin length; test on mobile Safari.
- **Reduced motion:** Unpin: render chapters as a normal vertical list with static media.

### Scroll-driven type
- **Purpose:** Make words themselves the moving image.
- **Trigger:** Scroll progress
- **Behavior:** Headlines drift horizontally (translateX ±20vw) or shift weight via font-variation-settings.
- **Duration:** Scroll-linked
- **Easing:** linear scrub
- **Implementation:** Motion useScroll + useTransform, or CSS scroll-driven animations where supported.
- **Performance:** Variable-font axis animation triggers text re-layout — limit to one headline at a time.
- **Reduced motion:** Static type at final position.

### Page transition
- **Purpose:** Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- **Trigger:** Route change
- **Behavior:** Shared element morphs between pages; others crossfade.
- **Duration:** 400–600ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- **Performance:** Keep transitions short; never block navigation on animation.
- **Reduced motion:** Instant navigation.

## Signature Moments

The small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.

### Chapters that open with a giant word — Listen — Intro
- **What visitors experience:** Each main chapter opens on one word set huge — wider than the screen, cropped at the edges — before its content starts, so the page reads like a printed magazine with loud covers.
- **How:** A full-width divider before the section: one word (the chapter’s subject, not a slogan) in the display face at 18–26vw, line-height 0.8, tight tracking, allowed to overflow and clip (overflow: hidden on the band). On enter it slides 8% sideways over the band’s scroll range (Motion useScroll + useTransform on x). The same word is the section’s h2 for screen readers (visually the band, aria-hidden duplicate).
- **Mobile:** Same word at 28–32vw, still cropped; no sideways drift.
- **Reduced motion:** The word stands still.

### Proof, one at a time — Home — Featured Work
- **What visitors experience:** The section holds still while the visitor scrolls, and its 4–6 proofs (projects, figures, quotes) replace each other one at a time, with a small counter — each one gets the whole screen for a moment.
- **How:** An outer block of (items × 70vh) with a sticky inner frame (top: 0, height: 100svh). Motion useScroll on the outer block gives progress; the active index = floor(progress × items). Items crossfade with a short vertical travel (≤ 24px); the counter (03 / 05) in the utility face. Each item is a real element in the DOM, in order, for screen readers.
- **Mobile:** No pinning: the items stack, each at least one screen tall, with the counter beside each.
- **Reduced motion:** Plain stacked list.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Photos follow the cursor — Home → Featured Work
Moving across a section leaves a short trail of photos.
- **Code:** `src/components/pieces/ImageTrail.tsx` → `import { ImageTrail } from '@/components/pieces/ImageTrail'`
- **Use:** `<ImageTrail photos={photos.map((p) => p.src)} className="min-h-[70svh]"><h2>…</h2></ImageTrail>`
- One section only, with a large headline over it.
- Mouse only — touch visitors see the section without it.

### Rolling links — Every page — menu, footer and text links
On hover, each letter of a link rolls over to a fresh copy.
- **Code:** `src/components/pieces/TextRoll.tsx` → `import { TextRoll } from '@/components/pieces/TextRoll'`
- **Use:** `<a href="/work"><TextRoll>Work</TextRoll></a>`
- Navigation and footer links only.
- The link keeps its normal focus outline.

### Magnetic button — Every page — the main action
The main button leans toward the cursor when it comes near.
- **Code:** `src/components/pieces/Magnetic.tsx` → `import { Magnetic } from '@/components/pieces/Magnetic'`
- **Use:** `<Magnetic><a href="/contact" className="btn">Start a project</a></Magnetic>`
- One or two primary actions per page — never every button.

### Soft fade between pages — Whole site — every internal link; mount once in app/layout.tsx
The page dims into its own colour and the next one fades in — quiet, half a second.
- **Code:** `src/components/pieces/PageFade.tsx` → `import { PageFade } from '@/components/pieces/PageFade'`
- **Use:** `// app/layout.tsx, inside <body>:
<PageFade />`
- Mount once in the root layout; it handles every internal link.
- About half a second in all — calm, never a wait.

### Sound, with a mute — Whole site — mount once in app/layout.tsx
A quiet sound loop visitors can turn on — the switch is always in view.
- **Code:** `src/components/pieces/AmbientSound.tsx` → `import { AmbientSound } from '@/components/pieces/AmbientSound'`
- **Use:** `// app/layout.tsx, inside <body>:
<AmbientSound src="/media/ambientSound.mp3" />`
- Off until the visitor turns it on; never autoplays.
- One calm loop (30–90 s, seamless); the site works fully without it.
- The switch never covers text or another fixed bar: put it in the menu bar (`placement=""`) or keep the page clear of the corner it sits in.

### Tap to open large — Works → Gallery (its photo layout)
Any photo opens full screen; arrows and swipe move between them.
- **Code:** `src/components/pieces/Lightbox.tsx` → `import { Lightbox } from '@/components/pieces/Lightbox'`
- **Use:** `const [open, setOpen] = useState<number | null>(null)
// each photo: <button onClick={() => setOpen(i)}>…</button>
<Lightbox photos={photos} index={open} onIndex={setOpen} />`
- Every photo opens from a real <button> with the photo’s caption or alt as its name.
- Captions travel with the photo into the viewer.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
