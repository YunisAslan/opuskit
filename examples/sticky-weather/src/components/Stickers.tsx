// Sticky Weather's own stickers, drawn in code: the cloud from the logo, the studio's slogans and its weather marks.
// Each one has a white die-cut edge and a plum outline, like a real vinyl sticker. Tokens only.
import type { ReactNode } from 'react'

const ink = 'var(--color-text)'
const paper = 'var(--color-paper)'
const display = { fontFamily: 'var(--font-display)', fontWeight: 600 } as const

// A shape drawn twice: a fat white edge behind, then the coloured face with an ink line.
function Cut({ d, fill, line = 4 }: { d: string; fill: string; line?: number }) {
  return (
    <>
      <path d={d} fill={paper} stroke={paper} strokeWidth={22} strokeLinejoin="round" />
      <path d={d} fill={fill} stroke={ink} strokeWidth={line} strokeLinejoin="round" />
    </>
  )
}

function Svg({ label, children }: { label: string; children: ReactNode }) {
  return <svg viewBox="0 0 200 200" role="img" aria-label={label} className="block h-auto w-full overflow-visible">{children}</svg>
}

const star = (() => {
  const pts: string[] = []
  for (let i = 0; i < 24; i++) {
    const r = i % 2 ? 66 : 92, a = (i / 24) * Math.PI * 2 - Math.PI / 2
    pts.push(`${(100 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`)
  }
  return `M${pts.join(' L')} Z`
})()

const CLOUD = 'M14 38 H31 L38 31 A9 9 0 0 0 37 20 A12 12 0 0 0 14 17 A10.5 10.5 0 0 0 14 38 Z'

export const stickers = {
  cloud: (
    <Svg label="Sticky Weather cloud sticker">
      <g transform="translate(4 4) scale(4)">
        <path d={CLOUD} fill={paper} stroke={paper} strokeWidth={5.5} strokeLinejoin="round" />
        <path d={CLOUD} fill="var(--color-accent)" stroke={ink} strokeWidth={1} strokeLinejoin="round" />
        <path d="M31 38 L38 31 L32 32 Z" fill={paper} stroke={ink} strokeWidth={1} strokeLinejoin="round" />
      </g>
    </Svg>
  ),
  hello: (
    <Svg label="Hello! sticker">
      <Cut d="M100 30 C150 30 180 58 180 92 C180 126 150 152 104 152 L66 180 L76 147 C42 139 20 119 20 92 C20 58 50 30 100 30 Z" fill="var(--color-chapter-3)" />
      <text x="100" y="106" textAnchor="middle" fontSize="44" fill={ink} style={display}>Hello!</text>
    </Svg>
  ),
  star: (
    <Svg label="Stick around sticker">
      <Cut d={star} fill="var(--color-secondary)" />
      <text x="100" y="94" textAnchor="middle" fontSize="30" fill={ink} style={display}>Stick</text>
      <text x="100" y="126" textAnchor="middle" fontSize="30" fill={ink} style={display}>around</text>
    </Svg>
  ),
  bolt: (
    <Svg label="Lightning bolt sticker">
      <Cut d="M116 12 L44 116 H94 L80 188 L160 78 H108 Z" fill={ink} />
    </Svg>
  ),
  sun: (
    <Svg label="Sunny sticker">
      <Cut d={Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2, b = a + Math.PI / 12, c = a - Math.PI / 12
        return `M${(100 + Math.cos(c) * 60).toFixed(1)} ${(100 + Math.sin(c) * 60).toFixed(1)} L${(100 + Math.cos(a) * 92).toFixed(1)} ${(100 + Math.sin(a) * 92).toFixed(1)} L${(100 + Math.cos(b) * 60).toFixed(1)} ${(100 + Math.sin(b) * 60).toFixed(1)} Z`
      }).join(' ')} fill="var(--color-chapter-3)" />
      <circle cx="100" cy="100" r="60" fill="var(--color-surface)" stroke={ink} strokeWidth={4} />
      <circle cx="82" cy="92" r="6" fill={ink} />
      <circle cx="118" cy="92" r="6" fill={ink} />
      <path d="M78 114 Q100 136 122 114" fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" />
    </Svg>
  ),
  badge: (
    <Svg label="Made by hand, stuck with care badge">
      <circle cx="100" cy="100" r="84" fill={paper} stroke={ink} strokeWidth={4} />
      <circle cx="100" cy="100" r="56" fill="none" stroke={ink} strokeWidth={2} />
      <defs><path id="sw-ring" d="M100 100 m-70 0 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" /></defs>
      <text fontSize="17" fill={ink} style={{ ...display, letterSpacing: '0.12em' }}><textPath href="#sw-ring">MADE BY HAND ✶ STUCK WITH CARE ✶</textPath></text>
      <g transform="translate(64 62) scale(1.5)"><path d={CLOUD} fill={ink} /></g>
    </Svg>
  ),
  umbrella: (
    <Svg label="Umbrella sticker">
      <Cut d="M20 104 C20 56 56 24 100 24 C144 24 180 56 180 104 C166 92 150 92 140 104 C128 92 112 92 100 104 C88 92 72 92 60 104 C50 92 34 92 20 104 Z" fill="var(--color-chapter-2)" />
      <path d="M100 104 V160 C100 178 76 178 76 160" fill="none" stroke={paper} strokeWidth={22} strokeLinecap="round" />
      <path d="M100 104 V160 C100 178 76 178 76 160" fill="none" stroke={ink} strokeWidth={8} strokeLinecap="round" />
    </Svg>
  ),
  label: (
    <Svg label="100% sticky label">
      <Cut d="M14 70 H186 V130 H14 Z" fill={ink} />
      <text x="100" y="111" textAnchor="middle" fontSize="30" fill="var(--color-background)" style={display}>100% sticky</text>
    </Svg>
  ),
  drop: (
    <Svg label="Raindrop sticker">
      <Cut d="M100 16 C128 64 160 98 160 130 A60 60 0 0 1 40 130 C40 98 72 64 100 16 Z" fill="var(--color-surface)" />
      <path d="M68 128 C68 112 76 100 84 92" fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" />
      <text x="100" y="150" textAnchor="middle" fontSize="26" fill={ink} style={display}>drip</text>
    </Svg>
  ),
  rainbow: (
    <Svg label="Good weather rainbow sticker">
      <path d="M58 150 A42 42 0 0 1 142 150" fill="none" stroke={paper} strokeWidth={70} />
      <path d="M44 150 A56 56 0 0 1 156 150" fill="none" stroke="var(--color-chapter-3)" strokeWidth={14} />
      <path d="M58 150 A42 42 0 0 1 142 150" fill="none" stroke="var(--color-chapter-2)" strokeWidth={14} />
      <path d="M72 150 A28 28 0 0 1 128 150" fill="none" stroke={ink} strokeWidth={14} />
    </Svg>
  ),
} satisfies Record<string, ReactNode>

export type StickerName = keyof typeof stickers
