'use client'
// Animated mini-previews for design and component options, drawn in the user's own palette and type.
// Pure CSS keyframes (globals.css, `od-*`), so dozens can run on one screen; reduced-motion freezes them.

import type { CSSProperties, ReactNode } from 'react'
import { img, type ImageKey } from '@/data/images'
import type { PaletteColors, ShapeStyle, TypographyPairing } from '@/types/domain'

type Props = { id: string; colors: PaletteColors; type: TypographyPairing; shape?: ShapeStyle; className?: string }

const PHOTOS: ImageKey[] = ['fashion', 'interior', 'ceramics', 'landscape', 'product', 'portrait', 'food', 'architecture', 'studio', 'sea', 'stone', 'botanical']

export function OptionDemo({ id, colors: c, type, shape, className = '' }: Props) {
  const display: CSSProperties = { fontFamily: `'${type.display.family}', serif`, fontWeight: type.display.weight, letterSpacing: type.display.letterSpacing, lineHeight: 0.95 }
  const r = { button: shape?.button ?? '6px', card: shape?.card ?? '8px', media: shape?.media ?? '6px' }
  const ctx: Ctx = { c, display, r, shape }
  return (
    <div aria-hidden className={`od @container relative isolate overflow-hidden select-none ${className}`}
      style={{ background: c.background, color: c.text, containerType: 'inline-size', aspectRatio: '16 / 10' }}>
      {render(id, ctx)}
    </div>
  )
}

type Ctx = { c: PaletteColors; display: CSSProperties; r: { button: string; card: string; media: string }; shape?: ShapeStyle }

// ─── primitives (all sizes in cqw so every demo scales with its card) ────────

const Photo = ({ k, style, className = '' }: { k: ImageKey; style?: CSSProperties; className?: string }) =>
  // eslint-disable-next-line @next/next/no-img-element -- tiny decorative thumbnail inside an animated schematic
  <img src={img(k, 360)} alt="" loading="lazy" className={`absolute object-cover ${className}`} style={style} />

const Bar = ({ x, y, w, h = 1.4, color, o = 1, className = '', style }: { x: number; y: number; w: number; h?: number; color: string; o?: number; className?: string; style?: CSSProperties }) =>
  <span className={`absolute rounded-full ${className}`} style={{ left: `${x}cqw`, top: `${y}cqw`, width: `${w}cqw`, height: `${h}cqw`, background: color, opacity: o, ...style }} />

const Box = ({ x, y, w, h, style, className = '', children }: { x: number; y: number; w: number; h: number; style?: CSSProperties; className?: string; children?: ReactNode }) =>
  <div className={`absolute overflow-hidden ${className}`} style={{ left: `${x}cqw`, top: `${y}cqw`, width: `${w}cqw`, height: `${h}cqw`, ...style }}>{children}</div>

const Cursor = ({ className, style }: { className: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 12 16" className={`absolute z-20 ${className}`} style={{ width: '3cqw', height: '4cqw', filter: 'drop-shadow(0 .3cqw .4cqw rgb(0 0 0 / .35))', ...style }}>
    <path d="M1 1l9 8.5-4.2.4 2.6 5.3-1.9.8-2.6-5.4L1 13.5z" fill="#fff" stroke="#111" strokeWidth="1" />
  </svg>
)

/** A simple top bar: logo + links. */
const TopBar = ({ c, dark = false }: { c: PaletteColors; dark?: boolean }) => (
  <>
    <Bar x={5} y={5} w={9} h={1.8} color={dark ? '#fff' : c.text} />
    {[62, 72, 82].map((x) => <Bar key={x} x={x} y={5.2} w={7} h={1.3} color={dark ? '#fff' : c.muted} />)}
  </>
)

/** Headline + two lines of text. */
const Copy = ({ x, y, c, display, word = 'Hello', size = 7 }: { x: number; y: number; c: PaletteColors; display: CSSProperties; word?: string; size?: number }) => (
  <>
    <span className="absolute" style={{ ...display, left: `${x}cqw`, top: `${y}cqw`, fontSize: `${size}cqw`, color: c.text }}>{word}</span>
    <Bar x={x} y={y + size + 2} w={30} color={c.muted} o={0.6} />
    <Bar x={x} y={y + size + 5} w={22} color={c.muted} o={0.6} />
  </>
)

function render(id: string, { c, display, r, shape }: Ctx): ReactNode {
  const card: CSSProperties = { background: c.surface, borderRadius: r.card, border: `${shape?.border ?? '1px'} solid ${shape?.id === 'brutal' ? c.text : c.border}`, boxShadow: shape?.shadow === 'none' ? undefined : shape?.shadow?.replace('var(--color-text)', c.text) }
  const media: CSSProperties = { borderRadius: r.media, width: '100%', height: '100%', position: 'relative' }
  switch (id) {
    // ── menu styles ──
    case 'nav:classic-bar': return <>
      <Box x={0} y={0} w={100} h={13} style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }} />
      <TopBar c={c} /><Box x={86} y={3.6} w={10} h={4.4} style={{ background: c.primary, borderRadius: r.button }} />
      <Copy x={6} y={26} c={c} display={display} word="Welcome" />
      <Box x={58} y={22} w={36} h={34} style={{ borderRadius: r.media }}><Photo k="interior" className="inset-0 h-full w-full" /></Box>
    </>
    case 'nav:floating-pill': return <>
      <Photo k="landscape" className="inset-0 h-full w-full" />
      <div className="od-pill absolute z-10 flex items-center justify-between" style={{ left: '20cqw', top: '4cqw', width: '60cqw', height: '7cqw', borderRadius: '99cqw', background: `${c.surface}d9`, backdropFilter: 'blur(4px)', padding: '0 3cqw' }}>
        <span className="rounded-full" style={{ width: '7cqw', height: '1.6cqw', background: c.text }} />
        <span className="flex" style={{ gap: '2cqw' }}>{[0, 1, 2].map((i) => <span key={i} className="rounded-full" style={{ width: '6cqw', height: '1.2cqw', background: c.muted }} />)}</span>
      </div>
      <span className="od-scroll absolute right-[3cqw] top-[20cqw] rounded-full" style={{ width: '1cqw', height: '10cqw', background: '#fff', opacity: 0.7 }} />
    </>
    case 'nav:fullscreen-menu': return <>
      <TopBar c={c} /><span className="absolute" style={{ right: '5cqw', top: '4cqw', fontSize: '2.2cqw', color: c.text }}>Menu</span>
      <Copy x={6} y={24} c={c} display={display} word="Studio" />
      <div className="od-menu absolute inset-0 z-10" style={{ background: c.text, padding: '9cqw 7cqw' }}>
        {['Work', 'About', 'Contact'].map((w, i) => <div key={w} className="od-stagger" style={{ ...display, color: c.background, fontSize: '8.5cqw', animationDelay: `${i * 0.12}s` }}>{w}</div>)}
      </div>
    </>
    case 'nav:centered-logo': return <>
      <Box x={0} y={0} w={100} h={14} style={{ borderBottom: `1px solid ${c.border}` }} />
      {[6, 16].map((x) => <Bar key={x} x={x} y={6} w={7} h={1.3} color={c.muted} />)}
      <span className="absolute" style={{ ...display, left: '50%', top: '3.4cqw', transform: 'translateX(-50%)', fontSize: '4.4cqw' }}>Maison</span>
      {[76, 86].map((x) => <Bar key={x} x={x} y={6} w={7} h={1.3} color={c.muted} />)}
      <Box x={6} y={20} w={42} h={36} style={{ borderRadius: r.media }}><Photo k="fashion" className="inset-0 h-full w-full" /></Box>
      <Box x={52} y={20} w={42} h={36} style={{ borderRadius: r.media }}><Photo k="portrait" className="inset-0 h-full w-full" /></Box>
    </>
    case 'nav:card-menu': return <>
      <div className="absolute flex items-center justify-between" style={{ left: '6cqw', top: '4cqw', width: '88cqw', height: '8cqw', background: c.surface, borderRadius: r.card, padding: '0 3cqw', border: `1px solid ${c.border}` }}>
        <span className="rounded-full" style={{ width: '9cqw', height: '1.8cqw', background: c.text }} />
        <span className="flex flex-col" style={{ gap: '.8cqw' }}><span style={{ width: '4cqw', height: '.5cqw', background: c.text }} /><span style={{ width: '4cqw', height: '.5cqw', background: c.text }} /></span>
      </div>
      {(['studio', 'ceramics', 'food'] as ImageKey[]).map((k, i) => (
        <div key={k} className="od-drop absolute overflow-hidden" style={{ left: `${6 + i * 30}cqw`, top: '15cqw', width: '28cqw', height: '40cqw', background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, animationDelay: `${i * 0.15}s` }}>
          <Photo k={k} className="inset-x-0 top-0 h-[60%] w-full" />
          <Bar x={2.5} y={27} w={14} color={c.text} /><Bar x={2.5} y={31} w={10} h={1.1} color={c.muted} />
        </div>
      ))}
    </>
    case 'nav:bottom-dock': return <>
      <Bar x={5} y={5} w={9} h={1.8} color={c.text} />
      <Copy x={6} y={16} c={c} display={display} word="Hi, I’m Sam" size={6.5} />
      <div className="absolute flex items-end" style={{ left: '50%', bottom: '4cqw', transform: 'translateX(-50%)', gap: '1.6cqw', padding: '1.4cqw 2cqw', background: c.surface, borderRadius: '3cqw', border: `1px solid ${c.border}` }}>
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className="od-dock block" style={{ width: '5cqw', height: '5cqw', borderRadius: '1.4cqw', background: i === 4 ? c.accent : c.secondary, animationDelay: `${i * 0.35}s` }} />)}
      </div>
    </>
    case 'nav:side-index': return <>
      <Box x={0} y={0} w={24} h={100} style={{ borderRight: `1px solid ${c.border}` }} />
      <Bar x={4} y={5} w={10} h={1.8} color={c.text} />
      {[0, 1, 2, 3, 4].map((i) => <Bar key={i} x={4} y={16 + i * 5} w={12} h={1.2} color={c.muted} />)}
      <span className="od-spy absolute rounded-full" style={{ left: '2cqw', top: '16cqw', width: '1.2cqw', height: '1.2cqw', background: c.accent }} />
      <Box x={29} y={6} w={65} h={30} style={{ borderRadius: r.media }}><Photo k="architecture" className="inset-0 h-full w-full" /></Box>
      <Bar x={29} y={41} w={40} h={2.4} color={c.text} /><Bar x={29} y={46} w={55} color={c.muted} o={0.6} /><Bar x={29} y={50} w={48} color={c.muted} o={0.6} />
    </>

    // ── shapes ──
    case 'shape:sharp': case 'shape:soft': case 'shape:round': case 'shape:pill': case 'shape:brutal': case 'shape:outline': {
      const filled = shape?.id !== 'outline'
      return <>
        <Box x={6} y={8} w={40} h={46} style={card}>
          <div style={{ ...media, height: '60%', overflow: 'hidden', borderRadius: `${r.media} ${r.media} 0 0` }}><Photo k="ceramics" className="inset-0 h-full w-full" /></div>
          <Bar x={3} y={31} w={22} h={2} color={c.text} /><Bar x={3} y={36} w={30} color={c.muted} o={0.6} />
        </Box>
        <Box x={52} y={8} w={42} h={20} style={card}><Bar x={3} y={4} w={20} h={2} color={c.text} /><Bar x={3} y={9} w={32} color={c.muted} o={0.6} /><Bar x={3} y={13} w={26} color={c.muted} o={0.6} /></Box>
        <div className="od-press absolute flex items-center justify-center" style={{ left: '52cqw', top: '34cqw', width: '22cqw', height: '8cqw', borderRadius: r.button, background: filled ? c.primary : 'transparent', color: filled ? c.background : c.text, border: `${shape?.border ?? '1px'} solid ${c.text}`, fontSize: '2.4cqw', boxShadow: card.boxShadow }}>Get started</div>
        <div className="absolute flex items-center justify-center" style={{ left: '76cqw', top: '34cqw', width: '18cqw', height: '8cqw', borderRadius: r.button, border: `${shape?.border ?? '1px'} solid ${c.text}`, fontSize: '2.4cqw' }}>Learn</div>
        <div className="absolute" style={{ left: '52cqw', top: '47cqw', width: '42cqw', height: '7cqw', borderRadius: r.button, border: `1px solid ${c.muted}`, background: c.surface }} />
      </>
    }

    // ── signature moments ──
    case 'sig:hover-preview-list': case 'photo:hover-reveal': return <>
      {['Crossing Hoodie', 'Star Sling', 'Cobalt Cap', 'Field Pant'].map((t, i) => (
        <div key={t} className="absolute flex justify-between" style={{ left: '8cqw', top: `${12 + i * 11}cqw`, width: '84cqw', borderBottom: `1px solid ${c.border}`, paddingBottom: '2cqw', fontSize: '3.2cqw' }}>
          <span style={display}>{t}</span><span style={{ color: c.muted }}>€{96 + i * 11}</span>
        </div>
      ))}
      <div className="od-follow absolute z-10" style={{ width: '16cqw', height: '20cqw', borderRadius: r.media, overflow: 'hidden' }}>
        <Photo k="fashion" className="inset-0 h-full w-full" /><Cursor className="left-[-2cqw] top-[-2cqw]" />
      </div>
    </>
    case 'sig:magnetic-button': return <>
      <Copy x={8} y={10} c={c} display={display} word="Let’s talk" />
      <div className="od-magnet absolute flex items-center justify-center" style={{ left: '38cqw', top: '38cqw', width: '24cqw', height: '10cqw', borderRadius: r.button, background: c.primary, color: c.background, fontSize: '2.8cqw' }}>Start a project</div>
      <Cursor className="od-cursor-near" />
    </>
    case 'sig:rolling-links': return <>
      <Bar x={6} y={6} w={10} h={2} color={c.text} />
      <div className="absolute flex" style={{ left: '42cqw', top: '4.6cqw', gap: '5cqw', fontSize: '3.4cqw' }}>
        {['Work', 'About', 'Contact'].map((w, i) => (
          <span key={w} className="relative overflow-hidden" style={{ height: '4.2cqw', lineHeight: '4.2cqw' }}>
            <span className={i === 0 ? 'od-roll block' : 'block'}>{w}<br /><span style={{ color: c.accent }}>{w}</span></span>
          </span>
        ))}
      </div>
      <Cursor className="left-[45cqw] top-[9cqw]" />
      <Box x={6} y={20} w={88} h={34} style={{ borderRadius: r.media }}><Photo k="studio" className="inset-0 h-full w-full" /></Box>
    </>
    case 'sig:image-trail': return <>
      <span className="absolute z-10" style={{ ...display, left: '8cqw', top: '38cqw', fontSize: '9cqw' }}>Archive</span>
      {(['fashion', 'portrait', 'studio', 'stone', 'sea'] as ImageKey[]).map((k, i) => (
        <Photo key={k} k={k} className="od-trail" style={{ left: `${10 + i * 16}cqw`, top: `${8 + (i % 2) * 10}cqw`, width: '14cqw', height: '18cqw', borderRadius: r.media, animationDelay: `${i * 0.35}s` }} />
      ))}
      <Cursor className="od-cursor-lr" style={{ top: '22cqw' }} />
    </>
    case 'sig:horizontal-gallery': case 'photo:horizontal-rail': return <>
      <div className="od-slide absolute flex" style={{ left: '6cqw', top: '10cqw', gap: '3cqw' }}>
        {PHOTOS.slice(0, 6).map((k) => <div key={k} className="relative overflow-hidden" style={{ width: '34cqw', height: '40cqw', borderRadius: r.media, flex: 'none' }}><Photo k={k} className="inset-0 h-full w-full" /></div>)}
      </div>
      <span className="od-scroll absolute right-[3cqw] top-[14cqw] rounded-full" style={{ width: '1cqw', height: '10cqw', background: c.muted }} />
    </>
    case 'sig:stacking-cards': return <>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`absolute od-stack-${i}`} style={{ ...card, left: '14cqw', top: `${8 + i * 4}cqw`, width: '72cqw', height: '40cqw', background: [c.surface, c.secondary, c.primary][i], padding: '4cqw' }}>
          <div style={{ ...display, fontSize: '5cqw', color: i === 2 ? c.background : c.text }}>{['Listen', 'Design', 'Build'][i]}</div>
        </div>
      ))}
    </>
    case 'sig:velocity-marquee': case 'photo:marquee-rows': {
      const photos = id.startsWith('photo')
      return <>
        {[0, 1].map((row) => (
          <div key={row} className={`absolute flex whitespace-nowrap ${row ? 'od-marquee-rev' : 'od-marquee-fast'}`} style={{ top: `${12 + row * 22}cqw`, left: 0, gap: '3cqw' }}>
            {[...Array(12)].map((_, i) => photos
              ? <div key={i} className="relative overflow-hidden" style={{ width: '20cqw', height: '18cqw', borderRadius: r.media, flex: 'none' }}><Photo k={PHOTOS[(i + row * 3) % PHOTOS.length]} className="inset-0 h-full w-full" /></div>
              : <span key={i} style={{ ...display, fontSize: '9cqw', color: row ? c.accent : c.text }}>{row ? 'Studio ✳' : 'Make it ✳'}</span>)}
          </div>
        ))}
      </>
    }
    case 'sig:reading-highlight': return (
      <p className="absolute" style={{ ...display, left: '8cqw', top: '10cqw', width: '84cqw', fontSize: '6cqw', lineHeight: 1.15 }}>
        {'We make fewer things, and make them to last a lifetime.'.split(' ').map((w, i) => <span key={i} className="od-ink" style={{ animationDelay: `${i * 0.25}s` }}>{w} </span>)}
      </p>
    )
    case 'sig:curtain-reveal': return <>
      {(['fashion', 'portrait'] as ImageKey[]).map((k, i) => (
        <div key={k} className="od-curtain absolute overflow-hidden" style={{ left: `${8 + i * 44}cqw`, top: '8cqw', width: '40cqw', height: '46cqw', borderRadius: r.media, animationDelay: `${i * 0.4}s` }}><Photo k={k} className="od-settle inset-0 h-full w-full" /></div>
      ))}
    </>
    case 'sig:tilt-cards': return <>
      {(['product', 'ceramics'] as ImageKey[]).map((k, i) => (
        <div key={k} className={`absolute overflow-hidden ${i === 0 ? 'od-tilt' : ''}`} style={{ ...card, left: `${10 + i * 42}cqw`, top: '8cqw', width: '36cqw', height: '46cqw' }}>
          <Photo k={k} className="inset-x-0 top-0 h-[72%] w-full" />
          <span className="od-glare absolute inset-0" />
          <Bar x={3} y={36} w={18} h={1.8} color={c.text} /><Bar x={3} y={40} w={10} color={c.muted} />
        </div>
      ))}
      <Cursor className="od-cursor-small left-[26cqw] top-[26cqw]" />
    </>
    case 'sig:zoom-into-image': return (
      <div className="od-zoom absolute inset-0 overflow-hidden"><Photo k="landscape" className="inset-0 h-full w-full" />
        <span className="od-late absolute" style={{ ...display, left: '8cqw', bottom: '8cqw', fontSize: '7cqw', color: '#fff' }}>Step inside</span></div>
    )
    case 'sig:reveal-footer': return <>
      <div className="absolute inset-x-0 bottom-0 flex items-end" style={{ height: '100%', background: c.text, padding: '4cqw 6cqw' }}>
        <span style={{ ...display, fontSize: '15cqw', color: c.background, lineHeight: 0.8 }}>Studio</span>
      </div>
      <div className="od-lift absolute inset-0 z-10" style={{ background: c.background, borderBottom: `1px solid ${c.border}` }}>
        <Box x={6} y={6} w={88} h={30} style={{ borderRadius: r.media }}><Photo k="interior" className="inset-0 h-full w-full" /></Box>
        <Bar x={6} y={40} w={40} h={2.2} color={c.text} /><Bar x={6} y={45} w={60} color={c.muted} o={0.6} />
      </div>
    </>
    case 'sig:add-to-bag-fly': return <>
      <div className="absolute flex items-center justify-center" style={{ right: '5cqw', top: '4cqw', width: '8cqw', height: '8cqw', borderRadius: '99cqw', background: c.surface, border: `1px solid ${c.border}` }}>
        <span className="od-bump block" style={{ width: '3.4cqw', height: '3.8cqw', border: `.5cqw solid ${c.text}`, borderRadius: '0 0 .8cqw .8cqw' }} />
      </div>
      <Box x={10} y={12} w={36} h={42} style={card}><Photo k="product" className="inset-x-0 top-0 h-[70%] w-full" /></Box>
      <Photo k="product" className="od-fly z-10" style={{ left: '20cqw', top: '18cqw', width: '14cqw', height: '14cqw', borderRadius: r.media }} />
      <div className="absolute flex items-center justify-center" style={{ left: '52cqw', top: '36cqw', width: '32cqw', height: '9cqw', borderRadius: r.button, background: c.primary, color: c.background, fontSize: '2.8cqw' }}>Add to bag</div>
    </>
    case 'sig:spotlight-cursor': return <>
      <Photo k="stone" className="inset-0 h-full w-full" />
      <span className="absolute z-10" style={{ ...display, left: '8cqw', top: '34cqw', fontSize: '9cqw', color: '#fff' }}>After dark</span>
      <div className="od-spot absolute inset-0 z-20" />
    </>
    case 'sig:number-ticker': return <>
      {[['0 60 180 240', 'customers'], ['0 9 24 38', '% faster'], ['0 3 8 12', 'years']].map(([steps, label], i) => (
        <div key={label} className="absolute" style={{ left: `${6 + i * 31}cqw`, top: '16cqw' }}>
          <div className="overflow-hidden" style={{ ...display, fontSize: '11cqw', height: '11cqw', lineHeight: '11cqw', fontVariantNumeric: 'tabular-nums' }}>
            <div className="od-tick" style={{ animationDelay: `${i * 0.15}s` }}>{steps.split(' ').map((n) => <div key={n}>{n}</div>)}</div>
          </div>
          <div style={{ fontSize: '2.6cqw', color: c.muted, marginTop: '1.5cqw' }}>{label}</div>
        </div>
      ))}
    </>
    case 'sig:glow-cards': return <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute overflow-hidden" style={{ ...card, left: `${6 + (i % 2) * 45}cqw`, top: `${6 + Math.floor(i / 2) * 25}cqw`, width: '43cqw', height: '22cqw' }}>
          <span className="od-glow absolute" style={{ width: '40cqw', height: '40cqw', borderRadius: '50%', background: `radial-gradient(circle, ${c.accent}66, transparent 60%)`, animationDelay: `${-i * 0.6}s` }} />
          <Bar x={3} y={4} w={6} h={6} color={c.accent} o={0.8} /><Bar x={3} y={13} w={20} h={1.8} color={c.text} /><Bar x={3} y={17} w={28} color={c.muted} o={0.6} />
        </div>
      ))}
    </>
    case 'sig:word-rotate': return <>
      <div className="absolute" style={{ ...display, left: '8cqw', top: '16cqw', fontSize: '8cqw' }}>Websites for</div>
      <div className="absolute overflow-hidden" style={{ ...display, left: '8cqw', top: '26cqw', fontSize: '8cqw', height: '8.4cqw' }}>
        <div className="od-words">{['cafés', 'studios', 'shops', 'cafés'].map((w, i) => <div key={i} style={{ height: '8.4cqw' }}>{w}</div>)}</div>
      </div>
    </>
    case 'sig:text-pressure': return (
      <div className="absolute flex" style={{ ...display, left: '8cqw', top: '18cqw', fontSize: '15cqw' }}>
        {'PLAY'.split('').map((l, i) => <span key={i} className="od-press-letter inline-block origin-bottom" style={{ animationDelay: `${i * 0.18}s` }}>{l}</span>)}
        <Cursor className="od-cursor-lr" style={{ top: '14cqw' }} />
      </div>
    )
    case 'sig:product-lens': return <>
      <Box x={20} y={6} w={60} h={50} style={{ borderRadius: r.media }}><Photo k="product" className="inset-0 h-full w-full" /></Box>
      <div className="od-lens absolute z-10 overflow-hidden" style={{ top: '16cqw', width: '20cqw', height: '20cqw', borderRadius: '50%', border: '.5cqw solid #fff', boxShadow: '0 1cqw 3cqw rgb(0 0 0 / .3)' }}>
        <Photo k="product" className="od-lens-img" style={{ width: '150cqw', height: '125cqw' }} />
      </div>
    </>
    case 'sig:before-after': return <>
      <Box x={8} y={6} w={84} h={50} style={{ borderRadius: r.media }}>
        <Photo k="interior" className="inset-0 h-full w-full" style={{ filter: 'grayscale(1) brightness(.8)' }} />
        <div className="od-compare absolute inset-y-0 left-0 overflow-hidden" style={{ borderRight: '.5cqw solid #fff' }}><Photo k="interior" className="inset-y-0 left-0 h-full" style={{ width: '84cqw' }} /></div>
      </Box>
    </>
    case 'sig:scroll-device': return (
      <div className="absolute inset-0" style={{ perspective: '60cqw' }}>
        <div className="od-device absolute" style={{ left: '15cqw', top: '6cqw', width: '70cqw', height: '44cqw', background: '#111', borderRadius: '2cqw', padding: '1.6cqw', transformOrigin: 'bottom' }}>
          <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: '1cqw', background: c.surface }}>
            <Bar x={3} y={3} w={16} h={1.8} color={c.text} /><Bar x={3} y={8} w={30} h={10} color={c.secondary} /><Bar x={36} y={8} w={27} h={10} color={c.accent} o={0.7} />
            <Bar x={3} y={21} w={60} h={12} color={c.secondary} o={0.6} />
          </div>
        </div>
        <Box x={10} y={50} w={80} h={2} style={{ background: '#222', borderRadius: '0 0 2cqw 2cqw' }} />
      </div>
    )
    case 'sig:timeline-line': return <>
      <span className="absolute" style={{ left: '14cqw', top: '6cqw', width: '.6cqw', height: '50cqw', background: c.border }} />
      <span className="od-draw absolute origin-top" style={{ left: '14cqw', top: '6cqw', width: '.6cqw', height: '50cqw', background: c.accent }} />
      {['1998 · First shop', '2009 · The workshop', '2026 · Today'].map((t, i) => (
        <div key={t} className="absolute flex items-center" style={{ left: '12.6cqw', top: `${8 + i * 17}cqw`, gap: '3cqw', fontSize: '3cqw' }}>
          <span className="od-dot block rounded-full" style={{ width: '3.4cqw', height: '3.4cqw', background: c.background, border: `.6cqw solid ${c.accent}`, animationDelay: `${i * 0.9}s` }} /><span style={display}>{t}</span>
        </div>
      ))}
    </>
    case 'sig:expandable-cards': return <>
      {[1, 2].map((i) => <Box key={i} x={8 + (i - 1) * 44} y={30} w={40} h={24} style={card}><Bar x={3} y={16} w={20} h={1.8} color={c.text} /></Box>)}
      <div className="od-expand absolute z-10 overflow-hidden" style={{ ...card }}>
        <Photo k="food" className="inset-x-0 top-0 h-[62%] w-full" />
        <Bar x={3} y={36} w={24} h={2} color={c.text} /><Bar x={3} y={41} w={40} color={c.muted} o={0.6} />
      </div>
    </>
    case 'sig:pixel-transition': return (
      <Box x={24} y={6} w={52} h={50} style={{ borderRadius: r.media }}>
        <Photo k="abstract3d" className="inset-0 h-full w-full" /><Photo k="tech" className="od-swap inset-0 h-full w-full" />
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">{[...Array(64)].map((_, i) => <span key={i} className="od-px" style={{ background: c.accent, animationDelay: `${((i * 37) % 64) * 0.012}s` }} />)}</div>
      </Box>
    )

    // ── photo presentations ──
    case 'photo:single-feature': return <div className="absolute inset-[6cqw] overflow-hidden" style={{ borderRadius: r.media }}><Photo k="landscape" className="od-kenburns inset-0 h-full w-full" /></div>
    case 'photo:editorial-sequence': return <>
      <Box x={6} y={6} w={50} h={28} style={{ borderRadius: r.media }}><Photo k="interior" className="inset-0 h-full w-full" /></Box>
      <Bar x={62} y={12} w={30} h={2.2} color={c.text} /><Bar x={62} y={18} w={28} color={c.muted} o={0.6} /><Bar x={62} y={22} w={24} color={c.muted} o={0.6} />
      <Bar x={6} y={42} w={30} h={2.2} color={c.text} /><Bar x={6} y={48} w={26} color={c.muted} o={0.6} />
      <Box x={44} y={38} w={50} h={20} style={{ borderRadius: r.media }}><Photo k="ceramics" className="inset-0 h-full w-full" /></Box>
    </>
    case 'photo:lookbook-spreads': return <>
      {(['fashion', 'portrait'] as ImageKey[]).map((k, i) => <Box key={k} x={10 + i * 41} y={5} w={39} h={52} style={{ borderRadius: r.media }}><Photo k={k} className="inset-0 h-full w-full" /></Box>)}
    </>
    case 'photo:masonry-gallery': return <>
      {[[6, 4, 28, 22], [6, 28, 28, 30], [36, 4, 28, 34], [36, 40, 28, 18], [66, 4, 28, 16], [66, 22, 28, 36]].map(([x, y, w, h], i) => (
        <Box key={i} x={x} y={y} w={w} h={h} className="od-pop" style={{ borderRadius: r.media, animationDelay: `${i * 0.12}s` }}><Photo k={PHOTOS[i]} className="inset-0 h-full w-full" /></Box>
      ))}
    </>
    case 'photo:uniform-grid': return <>
      {[...Array(6)].map((_, i) => <Box key={i} x={6 + (i % 3) * 30} y={6 + Math.floor(i / 3) * 27} w={28} h={25} style={{ borderRadius: r.media }}><Photo k={PHOTOS[i + 3]} className="inset-0 h-full w-full" /></Box>)}
    </>
    case 'photo:swipe-carousel': return (
      <div className="od-carousel absolute flex items-center" style={{ left: '4cqw', top: '6cqw', gap: '3cqw', height: '50cqw' }}>
        {PHOTOS.slice(0, 7).map((k) => <div key={k} className="relative overflow-hidden" style={{ width: '40cqw', height: '46cqw', borderRadius: r.card, flex: 'none' }}><Photo k={k} className="inset-0 h-full w-full" /></div>)}
      </div>
    )
    case 'photo:tilted-grid': return (
      <div className="absolute" style={{ left: '-10cqw', top: '-20cqw', width: '120cqw', transform: 'rotate(-12deg)' }}>
        <div className="od-rise-grid grid grid-cols-4" style={{ gap: '2cqw' }}>{[...PHOTOS, ...PHOTOS].map((k, i) => <div key={i} className="relative overflow-hidden" style={{ height: '18cqw', borderRadius: r.media }}><Photo k={k} className="inset-0 h-full w-full" /></div>)}</div>
      </div>
    )
    case 'photo:card-stack': return <>
      {(['fashion', 'food', 'sea'] as ImageKey[]).map((k, i) => (
        <div key={k} className={`od-deck-${i} absolute overflow-hidden`} style={{ left: '30cqw', top: '6cqw', width: '40cqw', height: '50cqw', borderRadius: r.card, boxShadow: '0 1cqw 3cqw rgb(0 0 0 / .25)' }}><Photo k={k} className="inset-0 h-full w-full" /></div>
      ))}
    </>
    case 'photo:infinite-canvas': return (
      <div className="od-pan absolute grid grid-cols-6" style={{ left: '-20cqw', top: '-20cqw', width: '160cqw', gap: '3cqw' }}>
        {[...PHOTOS, ...PHOTOS, ...PHOTOS].map((k, i) => <div key={i} className="relative overflow-hidden" style={{ height: '20cqw', borderRadius: r.media, marginTop: i % 2 ? '8cqw' : 0 }}><Photo k={k} className="inset-0 h-full w-full" /></div>)}
      </div>
    )
    case 'photo:ring-3d': return (
      <div className="absolute inset-0" style={{ perspective: '80cqw' }}>
        <div className="od-ring absolute" style={{ left: '40cqw', top: '14cqw', width: '20cqw', height: '26cqw', transformStyle: 'preserve-3d' }}>
          {PHOTOS.slice(0, 8).map((k, i) => (
            <div key={k} className="absolute inset-0 overflow-hidden" style={{ transform: `rotateY(${i * 45}deg) translateZ(30cqw)`, borderRadius: r.media, backfaceVisibility: 'hidden' }}><Photo k={k} className="inset-0 h-full w-full" /></div>
          ))}
        </div>
      </div>
    )
    case 'photo:dome-gallery': return (
      <div className="absolute inset-0" style={{ perspective: '50cqw' }}>
        <div className="od-dome absolute grid grid-cols-5" style={{ left: '0cqw', top: '2cqw', width: '100cqw', gap: '2cqw', transformStyle: 'preserve-3d' }}>
          {[...PHOTOS.slice(0, 10), ...PHOTOS.slice(2, 7)].map((k, i) => (
            <div key={i} className="relative overflow-hidden" style={{ height: '16cqw', borderRadius: r.media, transform: `rotateY(${((i % 5) - 2) * -18}deg) translateZ(${Math.abs((i % 5) - 2) * -4}cqw)` }}><Photo k={k} className="inset-0 h-full w-full" /></div>
          ))}
        </div>
      </div>
    )
    case 'photo:liquid-glass': return <>
      <div className="od-carousel absolute flex items-center" style={{ left: '4cqw', top: '8cqw', gap: '3cqw' }}>
        {PHOTOS.slice(3, 10).map((k) => <div key={k} className="relative overflow-hidden" style={{ width: '38cqw', height: '44cqw', borderRadius: r.card, flex: 'none' }}><Photo k={k} className="inset-0 h-full w-full" /></div>)}
      </div>
      <div className="absolute z-10" style={{ left: '30cqw', top: '44cqw', width: '40cqw', height: '9cqw', borderRadius: '99cqw', background: 'rgb(255 255 255 / .25)', backdropFilter: 'blur(6px) saturate(1.6)', border: '1px solid rgb(255 255 255 / .5)' }} />
    </>
  }
  return <Copy x={8} y={20} c={c} display={display} />
}
