// Interaction craft: how every control, state and movement of a built site feels — press, hover, open and close,
// curves and times, reduced motion, phones, worst-case content. Adapted from Emil Kowalski's skills (MIT,
// https://github.com/emilkowalski/skills: emil-design-eng, animate, review-animations, mobile-native, break-ui,
// apple-design), rewritten for OpusKit's sites (decision 50 in docs/plan-library.md). The recipe decides *what* moves
// (recipe/motion.md); this decides *how*. One source for its numbers: MOTION_TOKENS, shipped in tokens.css.

import type { FamilyId, UniversalRecipe } from '@/types/domain'

export const MIT = 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'

/** Strong curves and UI times. The three curves override Tailwind's own, so `ease-out` / `ease-in-out` in a class name
 *  get them too. Built-in CSS easings are too weak to feel intentional. */
export const MOTION_TOKENS = {
  theme: {
    '--ease-out': 'cubic-bezier(0.23, 1, 0.32, 1)', // entering, exiting, answering a press
    '--ease-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)', // moving or morphing on screen
    '--ease-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)', // sheets and drawers
  },
  root: {
    '--duration-press': '140ms', // :active scale
    '--duration-popover': '180ms', // tooltips, small popovers
    '--duration-menu': '200ms', // dropdowns, selects, menus
    '--duration-dialog': '250ms',
    '--duration-sheet': '450ms', // with --ease-drawer
  },
}

/** The look's own section entrance (recipe/motion.md), when it is a CSS timing function. */
const entranceEasing = (r: UniversalRecipe) => {
  const e = r.motion.patterns.find((p) => p.id === 'fade-rise')?.easing
  return e && /^(cubic-bezier|steps)\(/.test(e) ? e : undefined
}

export function motionCss(r: UniversalRecipe) {
  const entrance = entranceEasing(r)
  return {
    theme: `  /* Motion — never ease-in on anything that enters, exits or answers the visitor (Interaction craft) */\n${Object.entries(MOTION_TOKENS.theme).map(([k, v]) => `  ${k}: ${v};`).join('\n')}${entrance ? `\n  --ease-entrance: ${entrance}; /* this look's section entrance — recipe/motion.md */` : ''}`,
    root: `  /* UI times — menus, popovers and dialogs stay under 300ms; section entrances may be longer (recipe/motion.md) */\n  ${Object.entries(MOTION_TOKENS.root).map(([k, v]) => `${k}: ${v};`).join(' ')}`,
  }
}

// ─── Seasoning: smooth loaders, micro-interactions, parallax — salt, not sauce (the user, 2026-10-08) ─────────────
// Every site gets all three, in a dose fitted to its motion level and look: nobody should be able to name them, and
// everyone would feel them missing.

/** Each family's own small answer to hover and press — the site's micro-interactions speak its look. */
const MICRO: Record<FamilyId, string> = {
  quiet: 'colour and opacity only — a link darkens, an arrow fades in beside it; nothing jumps or moves',
  minimal: 'a colour change and a 1px underline that draws from the left (180ms, var(--ease-out)); icons stay still',
  editorial: 'underlines draw from the left (200ms, var(--ease-out)); arrows lean 3px the way they point',
  cinematic: 'soft and slow — hovering one item of a list dims the others to 60% instead of moving it (200ms)',
  bold: 'hard and instant — a pressed button drops into its own shadow (2px, no easing); colours swap at once',
  raw: 'unpolished on purpose — hover steps in (steps(2)), a press offsets 2px; no curves',
  organic: 'a 2px lift on hover and a soft spring back on release (bounce 0.2)',
  experimental: 'a little play — a press squashes to 0.95 and springs back (bounce 0.3)',
  futuristic: 'precise — a label decodes once on hover (≤ 200ms), lines draw in; nothing bounces',
}

const PARALLAX: Record<UniversalRecipe['motion']['level']['id'], string> = {
  still: 'None — this site is still. Depth comes from layering and light in the pictures themselves.',
  subtle: 'At most one picture on the whole site drifts, and only slightly: 4–6% of its frame’s height across its pass through the screen.',
  dynamic: 'Up to two picture bands per page drift, 6–10% of their frame’s height (a first screen with depth counts as Home’s first).',
  immersive: 'Where the recipe places depth (the patterns above, the signature moments); everywhere else the dynamic dose — up to two bands a page, 6–10%. Depth is still a spice here.',
}

const PARALLAX_SHORT: Record<UniversalRecipe['motion']['level']['id'], string> = {
  still: 'none', subtle: 'one picture on the whole site, 4–6%', dynamic: 'up to two picture bands a page, 6–10%', immersive: 'where the recipe places depth, else up to two picture bands a page, 6–10%',
}

const has = (r: UniversalRecipe, re: RegExp) => r.pages.some((p) => re.test(p.type) || p.sections.some((s) => re.test(s.id)))

/** The site's seasoning, written into the recipe (recipe/motion.md and every recipe document). */
export function seasoning(r: UniversalRecipe) {
  const level = r.motion.level.id
  const family = r.metadata.familyIds[0]
  const preloader = r.pieces.some((p) => p.id === 'preloader')
  const film = r.assetRequirements.some((a) => a.asset === 'video')
  const micro = [
    `**Press and hover** — every button, link card and tile: ${MICRO[family]}. A press always answers — scale 0.97 at --duration-press, or this look’s own press where one is named here; hover waits for a pointer that can hover.`,
    ...(has(r, /reservation|contact|newsletter|sign-|order-online|catering|wholesale/) ? ['**Sending a form** — the button keeps its width and label, shows a small spinner inside it only after 300ms (and keeps it at least 500ms, so it never flickers), then ends in place: a tick that draws in (200ms) and one line saying what happens next. Errors appear under their field, in --color-error.'] : []),
    ...(has(r, /shop|product|cart|checkout|collection/) ? ['**Adding to the cart** — the cart’s count bumps once (scale 1 → 1.15 → 1, 200ms, var(--ease-out)) and the button reads “Added” for 1.5s; nothing flies across the page.'] : []),
    '**The phone menu** — its icon turns into a close (two lines rotate, 200ms, var(--ease-in-out)); the menu itself slides as a sheet (--duration-sheet, var(--ease-drawer)) and leaves the way it came.',
    ...(has(r, /contact/) ? ['**Copying an email or address** — a click copies it; the icon becomes a tick for 1.5s.'] : []),
    '**Numbers that change** (prices, counts, times) — they change in place, never re-layout: tabular figures where the face’s own look like it, else its normal figures in a box of fixed width.',
  ]
  const loaders = [
    '**Pictures** — the space is held by the asset’s own ratio, filled with --color-surface; each picture fades in over 300–400ms (opacity, var(--ease-out)) once it has loaded (next/image `onLoad`, or `placeholder="blur"` for imported files). Never pops in, never a spinner over a photo, nothing jumps.',
    `**Pages** — \`app/loading.tsx\` in the site's own tones: a quiet skeleton in the shapes of what is coming (a heading bar, picture blocks), its shimmer slow (linear 1.6s) and still under reduced motion. Moving between pages cross-fades in 150–200ms; nothing slides.`,
    '**Waiting on an action** — see Sending a form: the control that was used shows the wait, in place; the page around it never blocks.',
    ...(film ? ['**Film** — the poster paints first and is the first screen until the film can play; the film fades in over it (300ms) on `canplay`, never a black frame or a spinner.'] : []),
    '**Fonts** — through next/font (it sizes the fallback to the real face), so nothing reflows when the face arrives.',
    preloader ? '**The first visit** — the Preloader the owner picked follows real loading, is gone within 2.5s, plays once per session and lifts onto a complete first screen.' : '**The first visit** — no full-screen loader: the first screen is complete and readable before anything animates.',
  ]
  return `## Seasoning — smooth loaders, micro-interactions, parallax

Salt, not sauce. These three are on every page, in a small dose: nobody should be able to name them, and everyone would feel them missing. They never take the place of the page's remembered moment, and they never sit on words being read, on a form being filled or on anything the visitor compares. The curves and times are in tokens.css; how each one is built is in Interaction craft.

### Smooth loaders
${loaders.map((x) => `- ${x}`).join('\n')}

### Micro-interactions — this site's whole set
Use these few, the same way on every page; nothing else gets its own trick.
${micro.map((x) => `- ${x}`).join('\n')}

### Parallax — ${level === 'still' ? 'none' : 'the dose'}
- ${PARALLAX[level]}${level === 'still' ? '' : `
- Only a picture moves, never text, a form or a list: it sits in an overflow-hidden frame, scaled 1.1 so no edge ever shows, and travels linearly with the scroll — CSS scroll-driven animation (\`animation-timeline: view()\`) with Motion \`useScroll\` + \`useTransform\` on \`transform\` as the fallback.
- Never \`background-attachment: fixed\` (it breaks on phones), never scroll-jacking, never two layers fighting in one view.
- Phones: half the travel, or none where the crop is tight. Reduced motion: none — the picture stands still.`}
`
}

export const saltQa = (r: UniversalRecipe) =>
  `Seasoning, salt not sauce (recipe → Seasoning): pictures fade into space held for them and nothing pops or jumps while loading; a waiting button keeps its width and never flickers; the micro-interactions are this site’s small set, used the same way everywhere; parallax ${r.motion.level.id === 'still' ? 'is absent' : `stays in its dose (${PARALLAX_SHORT[r.motion.level.id]}) and only ever moves pictures`}.`

/** A short version for tools with a small context (Lovable's knowledge). */
export const craftBrief = (r: UniversalRecipe) =>
  `Feel: every pressable scales to 0.97 while pressed (140ms, cubic-bezier(0.23, 1, 0.32, 1)); hover only where a pointer can hover; nothing enters from scale(0) or with ease-in; menus, popovers and dialogs ≤ 300ms, popovers out of their trigger; reduced motion is gentler, not gone. Phones: first screens 100svh, fields ≥ 16px, zoom never disabled. Seasoning, salt not sauce: pictures fade into reserved space, the site's few micro-interactions (${MICRO[r.metadata.familyIds[0]]}) everywhere the same, parallax ${PARALLAX_SHORT[r.motion.level.id]}. Full guide: interaction-craft.md.`

/** Definition-of-done lines, in every package's verification list. */
export const CRAFT_QA = [
  'Feel: every button, link card and tappable tile answers the press (:active scale 0.97, --duration-press, --ease-out — or the look’s own press), and hover effects wait for a pointer that can hover: on a phone nothing stays hovered.',
  'Motion ingredients: no `transition: all`; nothing enters from scale(0); no ease-in on anything that enters, exits or answers; menus, popovers and dialogs take ≤ 300ms on the tokens.css curves; popovers grow out of their trigger, dialogs from the centre; an exit leaves the way it came, never slower; scroll reveals play once.',
  'Worst case: with the longest real words in the copy deck and one about 40% longer, a long email, one item and zero items in every list and a missing photo, at 320px and at 200% browser zoom — nothing overflows, squashes, reads “1 items” or leaves a blank band; numbers that change hold their width (tabular figures, unless the face’s tabular set changes their look — a slashed zero, a typewriter set — then a fixed-width box).',
]

export const PHONE_QA = 'Phone (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px; the first screen uses svh (never vh); fields are ≥ 16px so focusing one never zooms the page, and zoom is never disabled; fixed bars clear the notch and home bar (viewportFit cover + env(safe-area-inset-*)); no grey flash on tap; theme-color is the colour at the top of the page.'

export const REDUCED_QA = 'prefers-reduced-motion: every animation has its documented alternative — gentler, not gone: movement becomes a short fade, colour changes that explain stay, nothing loops, pins or springs.'

export const CRAFT_DESCRIPTION = 'How every control, state and movement of this site feels: press and hover, opening and closing, curves and times, reduced motion, phones, and worst-case content.'

export function craftGuide(r: UniversalRecipe) {
  const ground = r.visualSystem.palette.tokens[0].hex
  const entrance = entranceEasing(r)
  return `# Interaction craft

${CRAFT_DESCRIPTION} The recipe decides what moves (\`recipe/motion.md\`); this decides how. The values are tokens in \`src/styles/tokens.css\`. Most of it is never noticed one by one — together it is why the site feels made, not assembled.

## Before anything moves — decide in this order
1. **How often is it seen?** Something used all the time — the menu on every page, a filter, tabs, anything opened from the keyboard — answers at once or with a barely visible change. Occasional things (a dialog, a sheet, a toast, a photo opening large) get a standard animation. Rare moments (the first screen, the page's remembered moment, a sent form) are where delight belongs.
2. **Name its purpose**: feedback, where it came from or went, a change of state, bridging a jump, explaining, or delight (rare moments only). If it has none, it does not move. Words being read and prices being compared never move for style.
3. **Cheapest tool that works**: a CSS transition (hover, press, a state) → \`@starting-style\` (entering on mount) → a CSS animation (set motion that must stay smooth while the page loads) → \`element.animate()\` → Motion (springs, exits, layout, gestures, scroll-linked).
4. **Properties**: transform and opacity; clip-path for reveals; height only for an accordion. Never width, height, top, left, margin or padding. Never \`transition: all\` — name each property.
5. **Curve and time**:

| What | Curve | Time |
|---|---|---|
| A press | \`var(--ease-out)\` | \`--duration-press\` (140ms), \`scale(0.97)\` |
| Tooltip, small popover | \`var(--ease-out)\` | \`--duration-popover\` (180ms) |
| Dropdown, select, menu | \`var(--ease-out)\` | \`--duration-menu\` (200ms) |
| Dialog | \`var(--ease-out)\` | \`--duration-dialog\` (250ms), from the centre |
| Sheet, drawer, the phone menu | \`var(--ease-drawer)\` | \`--duration-sheet\` (450ms) |
| Hover, colour | \`ease\` | 150ms |
| Moving on screen (a tab's marker, a reorder) | \`var(--ease-in-out)\` | 250ms |
| Marquee, progress, a hold-to-confirm fill | \`linear\` | as long as it lasts |
| Section entrances | ${entrance ? `\`var(--ease-entrance)\`` : 'the look’s own'} | as \`recipe/motion.md\` says — the site speaking, not UI, so it may be longer |

Never ease-in on anything that enters, exits or answers the visitor: it starts slow at the very moment they are watching. UI motion stays under 300ms; a 180ms menu feels faster than a 400ms one.

6. **Interruptions and exits**: transitions, not keyframes, for anything fired twice in a second (toggles, menus, toasts) — a transition turns back from where it is, a keyframe restarts. Springs for anything dragged: \`{ type: 'spring', duration: 0.5, bounce: 0 }\`, bounce up to 0.2–0.3 only after a flick. An exit leaves the way it came in, as fast or faster. Slow where the visitor decides (hold to confirm: 2s linear), fast where the site answers (200ms).

## Every control
- **Press**: every button, link card and tappable tile — \`transition: transform var(--duration-press) var(--ease-out)\`, \`:active { transform: scale(0.97) }\` (0.95–0.98). A look with its own press (a hard shadow that collapses) uses that instead.
- **Nothing appears from nothing**: never \`scale(0)\` — start at \`scale(0.95)\` with \`opacity: 0\`.
- **Out of the trigger**: popovers, dropdowns, selects and tooltips scale from where they were opened — keep shadcn's \`origin-(--radix-…-content-transform-origin)\` classes. Dialogs are not anchored: they stay centred.
- **Tooltips** wait before the first one opens; after that, neighbours open at once, with no animation.
- **Hover only where hover exists**: Tailwind v4's \`hover:\` already waits for \`(hover: hover)\`; in plain CSS wrap it in \`@media (hover: hover) and (pointer: fine)\`. Whatever a hover reveals is also reachable by tap.
- **Toasts** are sonner (shadcn's toast) — never hand-rolled.
- **Numbers that change or line up** (prices, counters, times): \`tabular-nums\` — but look at them first: some faces switch to another style for it (Zalando Sans: a slashed zero, typewriter widths). Then keep the face's own figures and hold the width with a box (\`min-width\` in \`ch\`).
- **A crossfade that shows two things swapping**: add \`filter: blur(2px)\` during the swap; never blur more than 20px (Safari).
- **Groups** stagger 30–80ms apart and never block a click while they play.
- **Scroll reveals** play once (\`once: true\`) and only on the site's story parts — never on the menu, a form, the cart or anything visited again and again.
- **Under load** (an entrance playing while the page still loads): prefer CSS, or Motion's full \`transform\` string over its \`x\` / \`y\` shorthands, which run on the main thread. Set a transform on the element itself, never through a CSS variable on its parent.

## Salt, not sauce
Smooth loaders, micro-interactions and parallax are on every page in a small dose — this site's dose and its whole set of micro-interactions are in the recipe (Seasoning). Use only that set, the same way everywhere; a trick that appears once looks like a mistake, a small set repeated looks like a system.

## Reduced motion
Gentler, not gone. Movement becomes a 150–200ms fade; colour and opacity changes that explain stay; parallax, pins, springs, loops and scrubbed films stop on a good frame. The press keeps its colour change and drops its scale.

## Phones
Set once (\`app/layout.tsx\`, the global CSS):
\`\`\`ts
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '${ground}' }
\`\`\`
theme-color is the colour at the very top of the page (the menu's own colour if it differs from the ground). Never \`maximumScale\` or \`userScalable: false\`: zoom stays possible.
\`\`\`css
html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; }
button, a, [role="button"] { touch-action: manipulation; }
\`\`\`
- The grey tap flash is gone, so every tappable thing needs its \`:active\` press.
- Controls are \`select-none\`; body text never is (people copy addresses and prices).
- First screens: \`min-height: 100svh\`, never \`100vh\` (it runs under the URL bar). A full-height layer — the phone menu, a sheet — is \`100dvh\`.
- Fields, selects and text areas are 16px or larger on phones, or iOS zooms the page on focus and never zooms back. Give each the right keyboard: \`type="email"\` / \`"tel"\`, \`inputMode="numeric"\`, \`autoComplete\`, \`enterKeyHint\`.
- Fixed bars (a sticky Book button, a bottom bar, toasts, sheets) pad with \`env(safe-area-inset-bottom, 0px)\` (top for a top bar).
- Scroll inside a layer (the phone menu, a sheet) is \`overscroll-behavior: contain\`; never lock the page with touchmove listeners.
- Rails that scroll sideways use native snap (\`snap-x snap-mandatory\`, \`snap-start\`); a rail dragged by script gets \`touch-action: pan-y\`.
- Big pointer effects (a cursor follower, a hover preview) are off on touch; what they showed is still reachable.
- The browser's phone view cannot show a sticky hover, the tap delay, the keyboard or the notch: name in your final reply what still needs a real phone.

## The worst case
The copy deck is kind data. Before a part is done, feed it the worst real content through its props or content files — never by editing the part:
- the longest name or title in the copy deck, and one about 40% longer (a translated line, a real long name such as “Aleksandra Wiśniewska-Kowalczyk”, a product name on two lines);
- a long email: \`bartholomew.fitzgerald@northwind-studio-holdings.example.com\`; a one-word name;
- one item and zero items in every list (one product, no events this month, an empty cart);
- a missing photo; a four-digit price.
Look at 320px, 390px and 1440px, and at 200% browser zoom.

| What you see | Fix |
|---|---|
| Text runs out of its box in a flex or grid row | \`min-w-0\` on the text column (\`minmax(0, 1fr)\` in a grid) |
| An email or link runs past the edge | \`overflow-wrap: anywhere\` on it |
| An icon or picture squashed | \`shrink-0\` on it |
| A button pushed off its row | \`min-w-0\` on the middle, \`shrink-0\` on the button |
| “1 items”, “0 item” | \`Intl.PluralRules\`, or one string per count |
| \`1284\`, \`NaN\`, \`undefined\` | \`Intl.NumberFormat\`; leave out what is missing |
| A broken picture or a jump when it loads | the asset layer's fallback, \`object-cover\`, a fixed aspect ratio |
| An empty list as a blank band | an empty state in the site's own voice, with the next step |
| A longer label breaks a fixed-width button | width from its content, with a min-width |
| A heading split mid-word | \`overflow-wrap: anywhere\`, never \`break-all\`; \`text-wrap: balance\` on headings |

Wrap, truncate or clamp — per field: names and titles wrap (two lines is fine); secondary details truncate at the end with the full text reachable; card previews use \`line-clamp\`; prices, dates and anything compared are never cut.

## Before a part is done
- Play each animation 3–5× slower (DevTools → Animations): it grows from the right place, its properties move together, no two states show at once.
- Look at it again after the next part, with fresh eyes.

## Never ship
| Never | Instead |
|---|---|
| \`transition: all\` | the exact properties |
| entering from \`scale(0)\` | \`scale(0.95)\` + \`opacity: 0\` |
| ease-in on UI | \`var(--ease-out)\` |
| motion on a keyboard shortcut or the always-used menu | an instant change |
| UI motion over 300ms | the tokens' times |
| a popover growing from its centre | its trigger's transform origin (dialogs excepted) |
| keyframes on toggles, menus, toasts | transitions |
| animating width, height, top, left, margin, padding | transform, opacity, clip-path |
| hover without a hover-capable pointer | \`(hover: hover)\` — Tailwind's \`hover:\` |
| no reduced-motion version | a gentler one, not none |
| everything arriving at once | 30–80ms stagger |
| \`100vh\` first screens, fields under 16px, disabled zoom | \`100svh\`, 16px, zoom on |

---
Adapted from Emil Kowalski's skills — https://github.com/emilkowalski/skills. MIT License, Copyright (c) 2026 Emil Kowalski.

${MIT}
`
}
