---
name: interaction-craft
description: "How every control, state and movement of this site feels: press and hover, opening and closing, curves and times, reduced motion, phones, and worst-case content. Use when building any button, link, card, menu, popover, dialog, sheet, form or animation, when checking a phone, and before calling a part done."
---

# Interaction craft

How every control, state and movement of this site feels: press and hover, opening and closing, curves and times, reduced motion, phones, and worst-case content. The recipe decides what moves (`recipe/motion.md`); this decides how. The values are tokens in `src/styles/tokens.css`. Most of it is never noticed one by one — together it is why the site feels made, not assembled.

## Before anything moves — decide in this order
1. **How often is it seen?** Something used all the time — the menu on every page, a filter, tabs, anything opened from the keyboard — answers at once or with a barely visible change. Occasional things (a dialog, a sheet, a toast, a photo opening large) get a standard animation. Rare moments (the first screen, the page's remembered moment, a sent form) are where delight belongs.
2. **Name its purpose**: feedback, where it came from or went, a change of state, bridging a jump, explaining, or delight (rare moments only). If it has none, it does not move. Words being read and prices being compared never move for style.
3. **Cheapest tool that works**: a CSS transition (hover, press, a state) → `@starting-style` (entering on mount) → a CSS animation (set motion that must stay smooth while the page loads) → `element.animate()` → Motion (springs, exits, layout, gestures, scroll-linked).
4. **Properties**: transform and opacity; clip-path for reveals; height only for an accordion. Never width, height, top, left, margin or padding. Never `transition: all` — name each property.
5. **Curve and time**:

| What | Curve | Time |
|---|---|---|
| A press | `var(--ease-out)` | `--duration-press` (140ms), `scale(0.97)` |
| Tooltip, small popover | `var(--ease-out)` | `--duration-popover` (180ms) |
| Dropdown, select, menu | `var(--ease-out)` | `--duration-menu` (200ms) |
| Dialog | `var(--ease-out)` | `--duration-dialog` (250ms), from the centre |
| Sheet, drawer, the phone menu | `var(--ease-drawer)` | `--duration-sheet` (450ms) |
| Hover, colour | `ease` | 150ms |
| Moving on screen (a tab's marker, a reorder) | `var(--ease-in-out)` | 250ms |
| Marquee, progress, a hold-to-confirm fill | `linear` | as long as it lasts |
| Section entrances | the look’s own | as `recipe/motion.md` says — the site speaking, not UI, so it may be longer |

Never ease-in on anything that enters, exits or answers the visitor: it starts slow at the very moment they are watching. UI motion stays under 300ms; a 180ms menu feels faster than a 400ms one.

6. **Interruptions and exits**: transitions, not keyframes, for anything fired twice in a second (toggles, menus, toasts) — a transition turns back from where it is, a keyframe restarts. Springs for anything dragged: `{ type: 'spring', duration: 0.5, bounce: 0 }`, bounce up to 0.2–0.3 only after a flick. An exit leaves the way it came in, as fast or faster. Slow where the visitor decides (hold to confirm: 2s linear), fast where the site answers (200ms).

## Every control
- **Press**: every button, link card and tappable tile — `transition: transform var(--duration-press) var(--ease-out)`, `:active { transform: scale(0.97) }` (0.95–0.98). A look with its own press (a hard shadow that collapses) uses that instead.
- **Nothing appears from nothing**: never `scale(0)` — start at `scale(0.95)` with `opacity: 0`.
- **Out of the trigger**: popovers, dropdowns, selects and tooltips scale from where they were opened — keep shadcn's `origin-(--radix-…-content-transform-origin)` classes. Dialogs are not anchored: they stay centred.
- **Tooltips** wait before the first one opens; after that, neighbours open at once, with no animation.
- **Hover only where hover exists**: Tailwind v4's `hover:` already waits for `(hover: hover)`; in plain CSS wrap it in `@media (hover: hover) and (pointer: fine)`. Whatever a hover reveals is also reachable by tap.
- **Toasts** are sonner (shadcn's toast) — never hand-rolled.
- **Numbers that change or line up** (prices, counters, times): `tabular-nums`.
- **A crossfade that shows two things swapping**: add `filter: blur(2px)` during the swap; never blur more than 20px (Safari).
- **Groups** stagger 30–80ms apart and never block a click while they play.
- **Scroll reveals** play once (`once: true`) and only on the site's story parts — never on the menu, a form, the cart or anything visited again and again.
- **Under load** (an entrance playing while the page still loads): prefer CSS, or Motion's full `transform` string over its `x` / `y` shorthands, which run on the main thread. Set a transform on the element itself, never through a CSS variable on its parent.

## Salt, not sauce
Smooth loaders, micro-interactions and parallax are on every page in a small dose — this site's dose and its whole set of micro-interactions are in the recipe (Seasoning). Use only that set, the same way everywhere; a trick that appears once looks like a mistake, a small set repeated looks like a system.

## Reduced motion
Gentler, not gone. Movement becomes a 150–200ms fade; colour and opacity changes that explain stay; parallax, pins, springs, loops and scrubbed films stop on a good frame. The press keeps its colour change and drops its scale.

## Phones
Set once (`app/layout.tsx`, the global CSS):
```ts
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#1F35D6' }
```
theme-color is the colour at the very top of the page (the menu's own colour if it differs from the ground). Never `maximumScale` or `userScalable: false`: zoom stays possible.
```css
html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; }
button, a, [role="button"] { touch-action: manipulation; }
```
- The grey tap flash is gone, so every tappable thing needs its `:active` press.
- Controls are `select-none`; body text never is (people copy addresses and prices).
- First screens: `min-height: 100svh`, never `100vh` (it runs under the URL bar). A full-height layer — the phone menu, a sheet — is `100dvh`.
- Fields, selects and text areas are 16px or larger on phones, or iOS zooms the page on focus and never zooms back. Give each the right keyboard: `type="email"` / `"tel"`, `inputMode="numeric"`, `autoComplete`, `enterKeyHint`.
- Fixed bars (a sticky Book button, a bottom bar, toasts, sheets) pad with `env(safe-area-inset-bottom, 0px)` (top for a top bar).
- Scroll inside a layer (the phone menu, a sheet) is `overscroll-behavior: contain`; never lock the page with touchmove listeners.
- Rails that scroll sideways use native snap (`snap-x snap-mandatory`, `snap-start`); a rail dragged by script gets `touch-action: pan-y`.
- Big pointer effects (a cursor follower, a hover preview) are off on touch; what they showed is still reachable.
- The browser's phone view cannot show a sticky hover, the tap delay, the keyboard or the notch: name in your final reply what still needs a real phone.

## The worst case
The copy deck is kind data. Before a part is done, feed it the worst real content through its props or content files — never by editing the part:
- the longest name or title in the copy deck, and one about 40% longer (a translated line, a real long name such as “Aleksandra Wiśniewska-Kowalczyk”, a product name on two lines);
- a long email: `bartholomew.fitzgerald@northwind-studio-holdings.example.com`; a one-word name;
- one item and zero items in every list (one product, no events this month, an empty cart);
- a missing photo; a four-digit price.
Look at 320px, 390px and 1440px, and at 200% browser zoom.

| What you see | Fix |
|---|---|
| Text runs out of its box in a flex or grid row | `min-w-0` on the text column (`minmax(0, 1fr)` in a grid) |
| An email or link runs past the edge | `overflow-wrap: anywhere` on it |
| An icon or picture squashed | `shrink-0` on it |
| A button pushed off its row | `min-w-0` on the middle, `shrink-0` on the button |
| “1 items”, “0 item” | `Intl.PluralRules`, or one string per count |
| `1284`, `NaN`, `undefined` | `Intl.NumberFormat`; leave out what is missing |
| A broken picture or a jump when it loads | the asset layer's fallback, `object-cover`, a fixed aspect ratio |
| An empty list as a blank band | an empty state in the site's own voice, with the next step |
| A longer label breaks a fixed-width button | width from its content, with a min-width |
| A heading split mid-word | `overflow-wrap: anywhere`, never `break-all`; `text-wrap: balance` on headings |

Wrap, truncate or clamp — per field: names and titles wrap (two lines is fine); secondary details truncate at the end with the full text reachable; card previews use `line-clamp`; prices, dates and anything compared are never cut.

## Before a part is done
- Play each animation 3–5× slower (DevTools → Animations): it grows from the right place, its properties move together, no two states show at once.
- Look at it again after the next part, with fresh eyes.

## Never ship
| Never | Instead |
|---|---|
| `transition: all` | the exact properties |
| entering from `scale(0)` | `scale(0.95)` + `opacity: 0` |
| ease-in on UI | `var(--ease-out)` |
| motion on a keyboard shortcut or the always-used menu | an instant change |
| UI motion over 300ms | the tokens' times |
| a popover growing from its centre | its trigger's transform origin (dialogs excepted) |
| keyframes on toggles, menus, toasts | transitions |
| animating width, height, top, left, margin, padding | transform, opacity, clip-path |
| hover without a hover-capable pointer | `(hover: hover)` — Tailwind's `hover:` |
| no reduced-motion version | a gentler one, not none |
| everything arriving at once | 30–80ms stagger |
| `100vh` first screens, fields under 16px, disabled zoom | `100svh`, 16px, zoom on |

---
Adapted from Emil Kowalski's skills — https://github.com/emilkowalski/skills. MIT License, Copyright (c) 2026 Emil Kowalski.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
