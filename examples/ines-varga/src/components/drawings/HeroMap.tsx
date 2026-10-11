'use client'
// The first screen's key visual: a map drawn in three layers, in the page's own line and colours.
//   back  — pencil: hill contours, the coast, water lines (muted, thin)
//   mid   — ink: the river, the lake, the old town's streets, the trail around the lake (dashed)
//   front — marker: three notes and their arrows (the one accent), the compass and scale in ink
// It pencils itself in once on load (pure CSS, so it plays at first paint and never hides without JS), then the
// three layers drift apart at three depths as the page scrolls. Phones get a portrait crop of the town and lake.
// Reduced motion: a short fade, no drift.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useId, useRef, type CSSProperties } from 'react'

type Labels = { town: string; trail: string; book: string; north: string; scale: string }

const s = (d: number, t = 900) => ({ '--d': `${d}ms`, '--t': `${t}ms` }) as CSSProperties

const CONTOURS = [
  'M40 170 C 30 65, 140 -2, 250 8 C 370 18, 420 105, 400 190 C 382 270, 280 315, 170 305 C 80 296, 46 240, 40 170 Z',
  'M80 165 C 75 90, 160 40, 240 48 C 330 56, 370 120, 355 180 C 340 240, 260 275, 180 265 C 110 255, 84 220, 80 165 Z',
  'M120 160 C 120 110, 180 80, 230 85 C 290 90, 320 130, 310 170 C 300 210, 240 235, 190 225 C 140 215, 120 190, 120 160 Z',
  'M160 160 C 165 135, 200 120, 228 125 C 258 130, 268 155, 258 175 C 246 192, 210 196, 186 188 C 168 180, 157 172, 160 160 Z',
]
const WATER = ['M590 450 C 610 445, 625 452, 640 448', 'M620 500 C 640 495, 660 503, 680 497', 'M660 420 C 675 416, 690 422, 705 418', 'M740 0 C 760 35, 800 58, 850 64', 'M810 0 C 822 20, 846 32, 878 36']
const ISLANDS = [
  'M860 30 C 875 15, 905 18, 912 34 C 918 50, 896 62, 878 56 C 864 50, 852 42, 860 30 Z',
  'M940 60 C 950 50, 972 52, 976 66 C 980 80, 962 88, 950 82 C 940 76, 934 68, 940 60 Z',
  'M905 85 C 912 80, 922 82, 922 90 C 921 97, 910 98, 906 93 C 903 90, 902 88, 905 85 Z',
]
const STREETS = [
  'M400 120 C 450 140, 520 150, 600 140 C 630 136, 650 130, 680 120',
  'M410 200 C 470 205, 540 215, 640 205',
  'M420 270 C 480 262, 540 268, 600 280',
  'M450 90 C 455 150, 452 210, 460 280',
  'M530 95 C 528 160, 534 220, 528 285',
  'M610 100 C 600 150, 612 200, 605 250',
  'M460 200 C 490 180, 510 160, 530 150',
  'M478 160 L 516 158 L 518 192 L 480 194 Z',
  'M560 160 L 590 158 L 592 185 L 562 187 Z',
  'M470 220 L 505 222 L 503 250 L 468 248 Z',
  'M545 225 L 585 223 L 588 255 L 548 257 Z',
  'M494 186 L 494 166 L 499 156 L 504 166 L 504 186',
  'M680 120 C 740 112, 800 124, 858 150 C 900 168, 940 200, 1000 210',
  'M600 140 C 612 120, 626 104, 640 92',
  'M410 200 C 380 196, 352 190, 322 176',
  'M545 104 L 575 102 L 577 128 L 547 130 Z',
  'M618 214 L 640 212 L 642 238 L 620 240 Z',
  'M560 300 L 572 316 M584 296 L 594 312 M606 292 L 616 308',
]
const RIVER = ['M326 -10 C 346 90, 356 200, 396 270 C 436 330, 506 362, 562 402', 'M342 -10 C 362 88, 372 196, 410 262 C 448 322, 514 352, 568 396']
const LAKE = 'M560 400 C 600 360, 700 350, 740 390 C 790 430, 780 500, 740 540 C 700 580, 610 590, 570 550 C 530 515, 520 440, 560 400 Z'
const TRAIL = 'M528 285 C 525 310, 522 340, 520 370 C 560 315, 720 300, 800 350 C 870 400, 860 560, 770 610 C 690 650, 560 640, 510 580 C 465 525, 475 425, 520 370'
const TREES: [number, number][] = [[830, 450], [846, 468], [824, 482], [842, 496], [812, 430]]

export function HeroMap({ labels, className = '' }: { labels: Labels; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const back = useTransform(scrollYProgress, [0, 1], [0, -24])
  const mid = useTransform(scrollYProgress, [0, 1], [0, -60])
  const front = useTransform(scrollYProgress, [0, 1], [0, -110])
  const note = 'font-(family-name:--font-heading) fill-(--color-accent) [font-size:28px] [font-weight:700]'
  const pen = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const, pathLength: 1, 'data-stroke': '' }

  const map = (view: string, crop: string, k: string) => (
    <svg viewBox={view} preserveAspectRatio="xMidYMid meet" aria-hidden className={`draw-load h-full w-full ${crop.includes('overflow-hidden') ? '' : 'overflow-visible'} ${crop}`}>
      <defs>
        <mask id={`${id}-trail-${k}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="800">
          <path d={TRAIL} {...pen} stroke="#fff" strokeWidth={10} vectorEffect={undefined} style={s(900, 1200)} />
        </mask>
      </defs>
      <motion.g style={reduce ? undefined : { y: back }} className="text-(--color-muted)" strokeWidth={1}>
        {CONTOURS.map((d, i) => <path key={d} d={d} {...pen} style={s(i * 120, 1000)} opacity={0.7} />)}
        {WATER.map((d, i) => <path key={d} d={d} {...pen} style={s(500 + i * 80, 500)} opacity={0.7} />)}
        <path d="M700 0 C 720 50, 770 85, 840 92 C 900 98, 940 130, 1000 150" {...pen} style={s(300, 900)} />
      </motion.g>
      <motion.g style={reduce ? undefined : { y: mid }} className="text-(--color-text)" strokeWidth={1.6}>
        {RIVER.map((d) => <path key={d} d={d} {...pen} style={s(200, 1100)} />)}
        <path d={LAKE} {...pen} style={s(450, 1000)} strokeWidth={1.8} />
        {ISLANDS.map((d, i) => <path key={d} d={d} {...pen} style={s(700 + i * 90, 500)} />)}
        {STREETS.map((d, i) => <path key={d} d={d} {...pen} style={s(500 + i * 45, 450)} strokeWidth={i < 7 ? 1.6 : 1.1} />)}
        {TREES.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} {...pen} strokeWidth={1.2} style={s(1300 + i * 40, 250)} />)}
        <path d={TRAIL} fill="none" stroke="currentColor" strokeWidth={2} strokeDasharray="7 9" strokeLinecap="round" mask={`url(#${id}-trail-${k})`} />
      </motion.g>
      <motion.g style={reduce ? undefined : { y: front }}>
        <g className="text-(--color-accent)" strokeWidth={2}>
          <path d="M642 82 C 628 96, 616 110, 606 128" {...pen} style={s(1500, 300)} />
          <path d="M598 118 L 606 131 L 617 122" {...pen} style={s(1750, 150)} />
          <path d="M790 655 C 790 640, 786 628, 778 614" {...pen} style={s(1600, 300)} />
          <path d="M770 622 L 777 611 L 788 619" {...pen} style={s(1850, 150)} />
          <path d="M842 186 C 852 150, 866 118, 880 92" {...pen} style={s(1700, 300)} />
          <path d="M870 99 L 880 89 L 888 101" {...pen} style={s(1950, 150)} />
        </g>
        <text data-note x={648} y={78} className={note} style={s(1450)}>{labels.town}</text>
        <text data-note x={742} y={688} className={note} style={s(1550)} transform="rotate(-4 742 688)">{labels.trail}</text>
        <text data-note x={712} y={212} className={note} style={s(1650)} transform="rotate(3 712 212)">{labels.book}</text>
        <g className="text-(--color-text)" strokeWidth={1.4}>
          <path d="M895 772 L 895 690" {...pen} style={s(1200, 300)} />
          <path d="M884 706 L 895 688 L 906 706" {...pen} style={s(1400, 200)} />
          <path d="M660 730 L 810 730 M660 722 L 660 738 M735 724 L 735 736 M810 722 L 810 738" {...pen} style={s(1300, 400)} />
        </g>
        <text data-note x={888} y={680} className="font-(family-name:--font-heading) fill-(--color-text) [font-size:26px] [font-weight:700]" style={s(1450)}>{labels.north}</text>
        <text data-note x={660} y={762} className="font-(family-name:--font-heading) fill-(--color-muted) [font-size:22px]" style={s(1500)}>{labels.scale}</text>
      </motion.g>
    </svg>
  )

  return (
    <div ref={ref} className={className}>
      {map('0 0 1000 800', 'hidden sm:block', 'wide')}
      {map('390 60 560 720', 'sm:hidden overflow-hidden', 'tall')}
    </div>
  )
}

/** A marker circle drawn round one word — scribbled, overshooting where the pen closes it. */
export function Circled({ children, delay = 1600 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg aria-hidden viewBox="0 0 200 100" preserveAspectRatio="none" className="draw-load pointer-events-none absolute -inset-x-[0.22em] -inset-y-[0.05em] h-[calc(100%+0.1em)] w-[calc(100%+0.44em)] overflow-visible text-(--color-accent)">
        <path data-stroke pathLength={1} d="M150 14 C 110 2, 40 4, 14 30 C -8 54, 20 88, 90 92 C 160 96, 196 72, 192 44 C 188 18, 140 6, 92 10 C 70 12, 52 16, 40 22"
          fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={s(delay, 650)} />
      </svg>
    </span>
  )
}
