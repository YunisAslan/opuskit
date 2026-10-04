'use client'
// Each menu style on a real-looking page: drawn at desktop proportions (760×475, real type sizes) in the user's own
// tokens, over a real first screen and the kit's real Featured work section — then scaled to its card. Nothing
// points: the menu simply does its thing on a loop (gains a background on scroll, hides and returns, opens, shrinks).

import { BookOpen, House, LayoutGrid, Mail, User } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview } from '@/components/SectionPreview'
import { img, type ImageKey } from '@/data/images'
import { shapeStyles } from '@/data/patterns'
import type { NavStyleId, PaletteColors, ShapeStyle, TypographyPairing } from '@/types/domain'
import { useLoop } from './LinkDemo'

const W = 760, H = 475, BAR = 76
const LINKS = ['Work', 'Services', 'Journal', 'About']
const ease = 'cubic-bezier(.65,0,.35,1)'
const BEATS: Record<NavStyleId, number> = { 'classic-bar': 5, 'floating-pill': 6, 'fullscreen-menu': 5, 'centered-logo': 4, 'card-menu': 4, 'bottom-dock': 7, 'split-pill': 5, 'side-index': 4, 'status-bar': 4 }

type Ctx = { c: PaletteColors; type: TypographyPairing; shape: ShapeStyle; display: CSSProperties; ui: CSSProperties; brand: string; b: number }

// eslint-disable-next-line @next/next/no-img-element -- decorative photo inside a scaled page
const Photo = ({ k, style }: { k: ImageKey; style: CSSProperties }) => <img src={img(k, 900)} alt="" className="absolute object-cover" style={style} />

/** The page under the menu — a first screen, then the kit's real Featured work — scrolled by `shift`. */
function Page({ c, type, shape, display, ui, shift = 0, top = BAR, k = 'interior' }: Ctx & { shift?: number; top?: number; k?: ImageKey }) {
  return (
    <div className="absolute inset-x-0" style={{ top, transform: `translateY(${-shift}px)`, transition: `transform .9s ${ease}` }}>
      <div className="relative" style={{ height: 360 }}>
        <p className="absolute" style={{ ...ui, left: 44, top: 44, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: c.muted }}>Identity · Print · Spaces</p>
        <p className="absolute" style={{ ...display, left: 44, top: 72, fontSize: 58, lineHeight: 0.98, color: c.text, width: 380 }}>Made slowly, built to last.</p>
        <p className="absolute" style={{ ...ui, left: 44, top: 210, fontSize: 15, lineHeight: 1.5, color: c.muted, width: 330 }}>A small studio for identities, books and the rooms they live in. Booking work for spring.</p>
        <span className="absolute" style={{ ...ui, left: 44, top: 282, fontSize: 14, background: c.primary, color: c.background, borderRadius: shape.button, padding: '11px 20px' }}>See the work</span>
        <Photo k={k} style={{ left: 452, top: 36, width: 264, height: 300, borderRadius: shape.media }} />
      </div>
      <SectionPreview id="featured-work" colors={c} type={type} shape={shape} width={W} auto />
    </div>
  )
}

const Link = ({ children, on, ui, color, size = 15 }: { children: ReactNode; on?: boolean; ui: CSSProperties; color: string; size?: number }) => (
  <span style={{ ...ui, fontSize: size, color, textDecoration: 'underline', textUnderlineOffset: 5, textDecorationThickness: 1, textDecorationColor: on ? 'currentColor' : 'transparent', transition: 'text-decoration-color .25s' }}>{children}</span>
)
const Logo = ({ display, brand, size = 26, color }: { display: CSSProperties; brand: string; size?: number; color?: string }) => <span style={{ ...display, fontSize: size, lineHeight: 1, color }}>{brand}</span>

function scene(id: NavStyleId, x: Ctx): ReactNode {
  const { c, shape, display, ui, brand, b } = x
  switch (id) {
    case 'classic-bar': {
      const scrolled = b === 2 || b === 3
      return <>
        <Page {...x} shift={scrolled ? 300 : 0} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between" style={{ height: BAR, padding: '0 44px', background: scrolled ? c.surface : c.background, borderBottom: `1px solid ${scrolled ? c.border : 'transparent'}`, boxShadow: scrolled ? '0 8px 24px rgb(0 0 0 / .07)' : 'none', transition: 'all .45s' }}>
          <Logo display={display} brand={brand} />
          <span className="flex items-center" style={{ gap: 30 }}>
            {LINKS.map((l, i) => <Link key={l} ui={ui} color={c.text} on={(b === 1 && i === 1) || (b === 3 && i === 2)}>{l}</Link>)}
            <span style={{ ...ui, fontSize: 14, background: c.primary, color: c.background, borderRadius: shape.button, padding: '10px 18px' }}>Start a project</span>
          </span>
        </div>
      </>
    }
    case 'floating-pill': {
      const hidden = b === 3, active = [0, 1, 2, 2, 2, 3][b]
      return <>
        <div className="absolute inset-0" style={{ transform: `translateY(${hidden ? -120 : 0}px)`, transition: `transform .9s ${ease}` }}>
          <Photo k="landscape" style={{ left: 0, top: 0, width: W, height: H + 140 }} />
          <div className="absolute inset-x-0 top-0" style={{ background: 'linear-gradient(to top, rgb(0 0 0 / .45), transparent 60%)', height: H + 140 }} />
          <p className="absolute" style={{ ...display, left: 44, top: 300, fontSize: 64, lineHeight: 0.95, color: '#fff', width: 520 }}>Out on the water, all summer.</p>
        </div>
        <div className="absolute flex items-center justify-between" style={{ left: 150, top: 20, width: 460, height: 54, borderRadius: 99, background: `${c.surface}e6`, backdropFilter: 'blur(10px)', padding: '0 8px 0 22px', boxShadow: '0 6px 20px rgb(0 0 0 / .12)', transform: `translateY(${hidden ? -100 : 0}px)`, transition: `transform .6s ${ease}` }}>
          <Logo display={display} brand={brand} size={21} color={c.text} />
          <span className="relative flex">
            <span className="absolute" style={{ left: active * 82, top: -8, width: 80, height: 36, borderRadius: 99, background: c.text, transition: `left .45s ${ease}` }} />
            {LINKS.map((l, i) => <span key={l} className="relative text-center" style={{ ...ui, fontSize: 14, width: 82, lineHeight: '20px', color: i === active ? c.background : c.text, transition: 'color .3s' }}>{l}</span>)}
          </span>
        </div>
      </>
    }
    case 'fullscreen-menu': {
      const open = b >= 1 && b <= 3
      return <>
        <Page {...x} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between" style={{ height: BAR, padding: '0 44px' }}>
          <Logo display={display} brand={brand} />
          <span className="flex items-center" style={{ ...ui, fontSize: 15, gap: 10, color: c.text }}>Menu<span className="flex flex-col" style={{ gap: 5 }}><span style={{ width: 22, height: 2, background: c.text }} /><span style={{ width: 22, height: 2, background: c.text }} /></span></span>
        </div>
        <div className="absolute inset-0" style={{ background: c.text, clipPath: open ? 'inset(0)' : 'inset(0 0 100% 0)', transition: `clip-path .75s ${ease}` }}>
          <div className="flex items-center justify-between" style={{ height: BAR, padding: '0 44px' }}>
            <Logo display={display} brand={brand} color={c.background} />
            <span style={{ ...ui, fontSize: 15, color: c.background }}>Close</span>
          </div>
          <div style={{ padding: '18px 44px' }}>
            {[...LINKS, 'Contact'].map((l, i) => (
              <p key={l} style={{ ...display, fontSize: 60, lineHeight: 1.04, color: c.background, opacity: open ? (b === 2 && i !== 2 ? 0.3 : 1) : 0, transform: `translate(${b === 2 && i === 2 ? 18 : 0}px, ${open ? 0 : 30}px)`, transition: `all .55s ${ease} ${b === 1 ? 0.25 + i * 0.07 : 0}s` }}>{l}</p>
            ))}
          </div>
          <p className="absolute" style={{ ...ui, left: 44, bottom: 28, fontSize: 13, color: c.background, opacity: 0.6 }}>hello@{brand.toLowerCase()}.studio · Baku</p>
        </div>
      </>
    }
    case 'centered-logo': {
      const small = b === 1 || b === 2
      return <>
        <Page {...x} shift={small ? 300 : 0} top={96} k="fashion" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between" style={{ height: small ? 60 : 96, padding: '0 44px', background: small ? c.surface : c.background, borderBottom: `1px solid ${c.border}`, transition: `all .55s ${ease}` }}>
          <span className="flex" style={{ gap: 26 }}><Link ui={ui} color={c.text}>Shop</Link><Link ui={ui} color={c.text} on={b === 2}>Collections</Link></span>
          <span className="absolute left-1/2 -translate-x-1/2" style={{ ...display, fontSize: small ? 26 : 40, lineHeight: 1, transition: `font-size .55s ${ease}` }}>{brand}</span>
          <span className="flex items-center" style={{ gap: 26 }}><Link ui={ui} color={c.text}>Journal</Link><Link ui={ui} color={c.text}>Bag (0)</Link></span>
        </div>
      </>
    }
    case 'card-menu': {
      const open = b === 1 || b === 2
      return <>
        <Page {...x} top={96} />
        <div className="absolute overflow-hidden" style={{ left: 22, right: 22, top: 16, height: open ? 330 : 60, background: c.surface, border: `1px solid ${c.border}`, borderRadius: shape.card, transition: `height .6s ${ease}`, boxShadow: open ? '0 18px 40px rgb(0 0 0 / .16)' : '0 2px 8px rgb(0 0 0 / .05)' }}>
          <div className="flex items-center justify-between" style={{ height: 60, padding: '0 22px' }}>
            <Logo display={display} brand={brand} size={23} />
            <span style={{ ...ui, fontSize: 14, background: open ? c.text : 'transparent', color: open ? c.background : c.text, border: `1px solid ${c.text}`, borderRadius: 99, padding: '7px 16px', transition: 'all .3s' }}>{open ? 'Close' : 'Menu'}</span>
          </div>
          <div className="flex" style={{ gap: 14, padding: '6px 18px' }}>
            {([['Work', 'studio', 'Identity · Print'], ['Services', 'ceramics', 'What we make'], ['Journal', 'botanical', 'Notes & essays']] as [string, ImageKey, string][]).map(([t, k, sub], i) => (
              <div key={t} className="relative flex-1 overflow-hidden" style={{ height: 238, background: c.background, borderRadius: shape.card, opacity: open ? 1 : 0, transform: `translateY(${open ? (b === 2 && i === 1 ? -6 : 0) : -14}px)`, transition: `all .5s ${ease} ${b === 1 ? 0.2 + i * 0.1 : 0}s`, boxShadow: b === 2 && i === 1 ? '0 14px 26px rgb(0 0 0 / .14)' : 'none' }}>
                <Photo k={k} style={{ left: 0, top: 0, width: '100%', height: 150 }} />
                <p className="absolute" style={{ ...display, left: 16, top: 164, fontSize: 24 }}>{t}</p>
                <p className="absolute" style={{ ...ui, left: 16, top: 198, fontSize: 13, color: c.muted }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    }
    case 'bottom-dock': {
      const icons = [[House, 'Home'], [LayoutGrid, 'Work'], [User, 'About'], [BookOpen, 'Journal'], [Mail, 'Contact']] as const
      const hover = b >= 1 && b <= 5 ? b - 1 : -1
      return <>
        <span className="absolute" style={{ left: 44, top: 26 }}><Logo display={display} brand={brand} /></span>
        <Page {...x} top={56} />
        <div className="absolute flex items-end" style={{ left: '50%', bottom: 22, transform: 'translateX(-50%)', padding: 10, gap: 12, background: `${c.surface}f2`, backdropFilter: 'blur(10px)', border: `1px solid ${c.border}`, borderRadius: 22, boxShadow: '0 12px 30px rgb(0 0 0 / .14)' }}>
          {icons.map(([Icon, name], i) => {
            const d = hover < 0 ? 9 : Math.abs(i - hover)
            return (
              <span key={name} className="relative grid place-items-center" style={{ width: 50, height: 50, borderRadius: 14, background: i === 4 ? c.accent : c.background, border: `1px solid ${c.border}`, color: i === 4 ? '#fff' : c.text, transform: `scale(${d === 0 ? 1.35 : d === 1 ? 1.12 : 1})`, transformOrigin: 'bottom', transition: `transform .35s ${ease}`, margin: `0 ${d === 0 ? 9 : d === 1 ? 3 : 0}px` }}>
                <Icon size={22} strokeWidth={1.7} />
                {d === 0 && <span className="absolute whitespace-nowrap" style={{ ...ui, bottom: 62, fontSize: 12, background: c.text, color: c.background, padding: '4px 9px', borderRadius: 7 }}>{name}</span>}
              </span>
            )
          })}
        </div>
      </>
    }
    case 'split-pill': {
      const on = b === 1 ? 0 : b === 2 ? 1 : b === 3 ? 2 : -1
      return <>
        <Page {...x} top={BAR + 10} />
        <span className="absolute" style={{ left: 40, top: 26 }}><Logo display={display} brand={brand} size={28} color={c.accent} /></span>
        <span className="absolute flex items-center" style={{ left: '50%', transform: 'translateX(-50%)', top: 22, height: 42, padding: '0 22px', gap: 22, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 99, boxShadow: '0 4px 14px rgb(0 0 0 / .06)' }}>
          {LINKS.slice(0, 3).map((l, i) => <Link key={l} ui={{ ...ui, letterSpacing: '.12em', textTransform: 'uppercase' }} size={12} color={c.text} on={on === i}>{l}</Link>)}
        </span>
        <span className="absolute flex items-center" style={{ ...ui, right: 40, top: 22, height: 42, padding: '0 16px', gap: 9, fontSize: 14, border: `1px solid ${c.text}`, borderRadius: shape.button, background: b === 4 ? c.text : c.surface, color: b === 4 ? c.background : c.text, transition: 'all .3s' }}>
          <span style={{ width: 8, height: 8, borderRadius: 9, background: '#3BB273' }} />Contact
        </span>
      </>
    }
    case 'status-bar': {
      // A thin line across the top: logo, links and a live line that is true right now (the clock ticks each beat).
      const time = `14:3${b}`
      return <>
        <Page {...x} top={34} shift={b >= 2 ? 220 : 0} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between" style={{ ...ui, height: 34, padding: '0 20px', fontSize: 12, background: c.background, borderBottom: `1px solid ${c.border}` }}>
          <Logo display={display} brand={brand} size={15} />
          <span className="flex" style={{ gap: 22 }}>{LINKS.map((l, i) => <Link key={l} ui={ui} size={12} color={c.text} on={b === 1 && i === 0}>{l}</Link>)}</span>
          <span className="flex items-center" style={{ gap: 8, color: c.muted }}><span style={{ width: 6, height: 6, borderRadius: 6, background: c.accent, opacity: b % 2 ? 0.35 : 1, transition: 'opacity .4s' }} />Baku {time}, open now</span>
        </div>
      </>
    }
    case 'side-index': {
      const parts: [string, ImageKey, string][] = [['Intro', 'architecture', 'A studio for buildings that stay quiet.'], ['Work', 'studio', 'Twelve projects, 2019–2026.'], ['Studio', 'ceramics', 'Four people and a workshop.'], ['Contact', 'stone', 'Write to us, we answer in a day.']]
      return <>
        <div className="absolute inset-y-0 left-0" style={{ width: 190, borderRight: `1px solid ${c.border}`, padding: '28px 28px' }}>
          <Logo display={display} brand={brand} size={24} />
          <div className="relative" style={{ marginTop: 44 }}>
            <span className="absolute" style={{ left: -14, top: 9 + b * 34, width: 6, height: 6, borderRadius: 6, background: c.accent, transition: `top .55s ${ease}` }} />
            {parts.map(([t], i) => <p key={t} style={{ ...ui, fontSize: 15, height: 34, color: i === b ? c.text : c.muted, transition: 'color .3s' }}>{t}</p>)}
          </div>
          <p className="absolute" style={{ ...ui, left: 28, bottom: 26, fontSize: 12, color: c.muted }}>Baku · 40.4° N</p>
        </div>
        <div className="absolute overflow-hidden" style={{ left: 190, right: 0, top: 0, bottom: 0 }}>
          <div style={{ transform: `translateY(${-b * H}px)`, transition: `transform .9s ${ease}` }}>
            {parts.map(([t, k, line]) => (
              <div key={t} className="relative" style={{ height: H }}>
                <p className="absolute" style={{ ...display, left: 40, top: 40, fontSize: 52, lineHeight: 1 }}>{t}</p>
                <p className="absolute" style={{ ...ui, left: 40, top: 104, fontSize: 15, color: c.muted }}>{line}</p>
                <Photo k={k} style={{ left: 40, top: 148, width: 490, height: 290, borderRadius: shape.media }} />
              </div>
            ))}
          </div>
        </div>
      </>
    }
  }
}

export function MenuDemo({ id, colors: c, type, shape, brand = 'North' }: { id: NavStyleId; colors: PaletteColors; type: TypographyPairing; shape?: ShapeStyle; brand?: string }) {
  const [ref, b] = useLoop(BEATS[id], 1300)
  const display: CSSProperties = { fontFamily: `'${type.display.family}', serif`, fontWeight: type.display.weight, letterSpacing: type.display.letterSpacing }
  const ui: CSSProperties = { fontFamily: `'${type.utility.family}', '${type.body.family}', sans-serif` }
  return (
    <div className="absolute inset-0"><ScaledFrame width={W} className="size-full">
      <div ref={ref} className="relative overflow-hidden" style={{ width: W, height: H, background: c.background, color: c.text }}>
        {scene(id, { c, type, shape: shape ?? shapeStyles.soft, display, ui, brand: brand.split(' ')[0], b })}
      </div>
    </ScaledFrame></div>
  )
}
