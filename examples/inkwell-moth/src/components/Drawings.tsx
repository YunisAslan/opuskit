// Every drawing on the site, in one hand: navy line, paper fills, one blue ink, and red used once (a moth's eye-spot).
// The hero is split into depth layers so they can drift apart on scroll (see Hero.tsx).
import type { CSSProperties, ReactNode } from 'react'

const ink = { fill: 'none', stroke: 'var(--color-text)', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function Moth({ x = 0, y = 0, s = 1, r = 0, spot = false, delay = 0 }: { x?: number; y?: number; s?: number; r?: number; spot?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className="wings" style={{ animationDelay: `${delay}s` } as CSSProperties}>
        {[1, -1].map((side) => (
          <g key={side} transform={`scale(${side} 1)`}>
            <path d="M-2 -4 C -16 -30, -44 -39, -55 -25 C -61 -12, -47 2, -4 3 Z" fill="var(--color-surface)" />
            <path d="M-2 5 C -18 6, -37 18, -31 32 C -25 41, -8 28, -2 11 Z" fill="var(--color-secondary)" />
            <path d="M-10 -6 C -22 -14, -34 -20, -47 -23 M-12 -1 C -25 -5, -37 -8, -50 -12 M-8 12 C -14 18, -20 24, -25 30" />
            <circle cx="-31" cy="-15" r="4.5" fill={spot ? 'var(--color-accent)' : 'none'} />
          </g>
        ))}
      </g>
      <path d="M0 -12 C 5 -6, 5 14, 0 27 C -5 14, -5 -6, 0 -12 Z" fill="var(--color-text)" />
      <path d="M-1 -11 C -4 -22, -10 -29, -19 -29 M1 -11 C 4 -22, 10 -29, 19 -29" />
    </g>
  )
}

function Star({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M-7 1 C -3 0, 3 -1, 7 0 M0 -7 C 1 -3, -1 3, 0 7" />
}

const VIEW = '0 0 600 720'
function Layer({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <svg viewBox={VIEW} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full overflow-visible" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <g {...ink}>{children}</g>
    </svg>
  )
}

/** Back layer: the moon, a few stars, two far-off moths. */
export function HeroBack() {
  return (
    <Layer>
      <circle cx="360" cy="250" r="170" fill="var(--color-secondary)" stroke="none" />
      <circle cx="365" cy="245" r="170" strokeWidth="1.6" />
      <circle cx="410" cy="200" r="16" strokeWidth="1.6" />
      <circle cx="318" cy="318" r="10" strokeWidth="1.6" />
      <circle cx="446" cy="320" r="7" strokeWidth="1.6" />
      <Star x={86} y={118} /><Star x={142} y={300} s={0.7} /><Star x={540} y={70} s={0.8} /><Star x={568} y={430} s={0.6} />
      <Star x={62} y={470} s={0.8} /><Star x={520} y={570} s={0.7} /><Star x={196} y={44} s={0.6} />
      <path d="M150 210 l7 -6 l7 6 M480 470 l6 -5 l6 5" strokeWidth="1.8" />
    </Layer>
  )
}

/** Middle layer: the inkwell, its dip pen, a drip, and the dotted paths the moths took out of it. */
export function HeroInkwell() {
  return (
    <Layer label="A drawing of an inkwell with a dip pen in it, and moths flying up out of the ink towards the moon">
      <g strokeDasharray="2 9" strokeWidth="2.2">
        <path d="M298 436 C 292 410, 262 404, 250 380" />
        <path d="M306 436 C 322 398, 350 364, 362 318" />
        <path d="M294 436 C 262 396, 196 312, 212 228" />
        <path d="M310 436 C 372 360, 440 250, 404 160" />
      </g>
      <ellipse cx="304" cy="660" rx="138" ry="12" strokeWidth="1.6" />
      <path d="M176 672 H 236 M 252 676 H 300 M 372 672 H 434" strokeWidth="1.6" />
      <path d="M214 652 C 198 616, 196 574, 214 540 C 230 510, 262 498, 272 474 L 272 446 L 328 446 L 328 474 C 338 498, 370 510, 386 540 C 404 574, 402 616, 386 652 C 330 661, 270 661, 214 652 Z" fill="var(--color-surface)" />
      <path d="M206 604 C 236 594, 266 606, 300 598 C 334 590, 364 602, 398 594 C 400 616, 396 636, 386 652 C 330 661, 270 661, 214 652 C 206 636, 203 620, 206 604 Z" fill="var(--color-primary)" />
      <path d="M228 610 C 225 624, 227 636, 233 645" stroke="var(--color-surface)" strokeWidth="4" />
      <path d="M368 548 l12 13 M374 572 l13 12 M378 598 l10 10" strokeWidth="1.8" />
      <path d="M246 532 L 354 524 L 358 562 L 250 570 Z" fill="var(--color-background)" strokeWidth="2" />
      <path d="M262 549 C 274 540, 286 556, 300 546 S 328 541, 342 548" strokeWidth="2" />
      <path d="M314 448 L 440 238 L 452 246 L 326 454 Z" fill="var(--color-secondary)" />
      <path d="M432 252 L 444 260 M424 266 L 436 274" strokeWidth="2" />
      <path d="M440 238 L 462 204 C 468 196, 476 202, 470 210 L 452 246" fill="var(--color-background)" />
      <ellipse cx="300" cy="446" rx="37" ry="9" fill="var(--color-surface)" />
      <ellipse cx="300" cy="447" rx="24" ry="4.5" fill="var(--color-text)" />
      <path d="M272 474 C 284 481, 316 481, 328 474" />
      <path d="M327 454 C 333 470, 325 482, 331 500" strokeWidth="2.2" />
      <path d="M331 498 C 337 508, 337 515, 331 518 C 325 515, 325 508, 331 498 Z" fill="var(--color-primary)" strokeWidth="2" />
    </Layer>
  )
}

/** Front layers: the moths. Split left/right so they can spread apart as the page scrolls. */
export function HeroMothsLeft() {
  return <Layer><Moth x={240} y={352} s={0.8} r={-18} delay={0.2} /><Moth x={212} y={204} s={0.62} r={-28} delay={0.7} /></Layer>
}
export function HeroMothsRight() {
  return <Layer><Moth x={370} y={290} s={1.05} r={14} spot /><Moth x={404} y={138} s={0.5} r={22} delay={0.45} /><Moth x={300} y={66} s={0.36} r={-6} delay={0.9} /></Layer>
}

/** Small spot drawings that mark sections: a moth, a nib, an ink drop. Decorative. */
export function Spot({ kind, className }: { kind: 'moth' | 'nib' | 'drop'; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={`spot inline-block h-12 w-12 overflow-visible ${className ?? ''}`}>
      <g {...ink} strokeWidth={2.4}>
        {kind === 'moth' && <Moth x={32} y={34} s={0.5} r={-12} />}
        {kind === 'nib' && <>
          <path d="M32 6 L 46 30 C 46 40, 39 50, 32 58 C 25 50, 18 40, 18 30 Z" fill="var(--color-secondary)" />
          <path d="M32 30 V 57" /><circle cx="32" cy="28" r="3" fill="var(--color-background)" />
          <path d="M22 18 L 42 18" strokeWidth="1.8" />
        </>}
        {kind === 'drop' && <>
          <path d="M32 6 C 39 20, 49 30, 49 41 C 49 51, 41 57, 32 57 C 23 57, 15 51, 15 41 C 15 30, 25 20, 32 6 Z" fill="var(--color-primary)" />
          <path d="M23 40 C 22 46, 25 50, 29 52" stroke="var(--color-surface)" strokeWidth="3" />
        </>}
      </g>
    </svg>
  )
}

/** The logo's mark: a small inkwell with a moth leaving it. Also the favicon (src/app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <g {...ink} strokeWidth={2.2}>
        <path d="M11 45 C 8 39, 8 33, 12 29 C 15 26, 19 25, 20 22 V 19 H 28 V 22 C 29 25, 33 26, 36 29 C 40 33, 40 39, 37 45 Z" fill="var(--color-primary)" />
        <path d="M18 19 H 30" />
        <g transform="translate(24 9.5) rotate(-10) scale(0.24)" strokeWidth={8}>
          <path d="M-2 -4 C -16 -30, -44 -39, -55 -25 C -61 -12, -47 2, -4 3 Z M2 -4 C 16 -30, 44 -39, 55 -25 C 61 -12, 47 2, 4 3 Z" fill="var(--color-surface)" />
          <path d="M0 -12 C 5 -6, 5 14, 0 27 C -5 14, -5 -6, 0 -12 Z" fill="var(--color-text)" />
        </g>
      </g>
    </svg>
  )
}
