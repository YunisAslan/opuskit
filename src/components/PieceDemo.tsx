'use client'
// Live demo of a kit piece — the real component from src/pieces/, in the recipe's colours and fonts
// (or OpusKit's own when shown in the catalog). The same code a Build Package ships.

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { AmbientSound } from '@/pieces/AmbientSound'
import { Grain } from '@/pieces/Grain'
import { GridPattern } from '@/pieces/GridPattern'
import { HoverHighlight } from '@/pieces/HoverHighlight'
import { ImageComparison } from '@/pieces/ImageComparison'
import { ImageField } from '@/pieces/ImageField'
import { ImageTrail } from '@/pieces/ImageTrail'
import { Magnetic } from '@/pieces/Magnetic'
import { MagnetLines } from '@/pieces/MagnetLines'
import { Marquee } from '@/pieces/Marquee'
import { NumberTicker } from '@/pieces/NumberTicker'
import { RingCarousel } from '@/pieces/RingCarousel'
import { ScrollProgress } from '@/pieces/ScrollProgress'
import { SpinningText } from '@/pieces/SpinningText'
import { SplitFlap } from '@/pieces/SplitFlap'
import { StickyCards } from '@/pieces/StickyCards'
import { PinnedStage } from '@/pieces/PinnedStage'
import { TextEffect } from '@/pieces/TextEffect'
import { TextLoop } from '@/pieces/TextLoop'
import { TextReveal } from '@/pieces/TextReveal'
import { TextRoll } from '@/pieces/TextRoll'
import { TextScramble } from '@/pieces/TextScramble'
import { Tilt } from '@/pieces/Tilt'
import { TiltedGrid } from '@/pieces/TiltedGrid'
import { CursorArea } from '@/pieces/Cursor'
import { VelocityBand } from '@/pieces/VelocityBand'
import { VideoDialog } from '@/pieces/VideoDialog'
import { DragPhotos } from '@/pieces/DragPhotos'
import { MediaBetweenText } from '@/pieces/MediaBetweenText'
import { ParallaxFloating } from '@/pieces/ParallaxFloating'
import { ShaderDither } from '@/pieces/ShaderDither'
import { ShaderGrain } from '@/pieces/ShaderGrain'
import { TextAlongPath } from '@/pieces/TextAlongPath'
import { UnderlineFill } from '@/pieces/UnderlineFill'
import { CookieNote } from '@/pieces/CookieNote'
import { DuoHeadline } from '@/pieces/DuoHeadline'
import { Stickers } from '@/pieces/Stickers'
import { SwapButton } from '@/pieces/SwapButton'
import { Lightbox } from '@/pieces/Lightbox'
import type { PaletteColors, PieceId } from '@/types/domain'
import { LinkDemo } from './LinkDemo'

// Real photos already on disk (the example sites' media), small ones first.
const PHOTOS = [...[1, 2, 3, 4, 5, 6].map((n) => `/examples/brasshand/media/work-${n}.jpg`), ...[1, 2, 3, 4].map((n) => `/examples/sticky-weather/media/work-${n}.jpg`)].map((src) => ({ src, alt: 'Studio work: print, packaging and signage' }))
export const STICKERS = ['burst', 'pill', 'badge', 'smile', 'wing', 'star'].map((n) => `/stickers/${n}.svg`)
const CURSOR = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32"><path d="M3 2 C 9 12, 14 20, 17 28 L 19.5 19.5 L 27 17.5 C 19 12, 10 6, 3 2 Z" fill="#0038FF" stroke="#111" stroke-width="2"/></svg>')}`
const POSTER = '/examples/velmira/media/posterImage.jpg'
const FILM = '/examples/velmira/media/heroVideo.mp4'

type Fonts = { display: string; body: string; utility: string }
const OPUSKIT: PaletteColors = { background: '#F5F0E6', surface: '#FFFFFF', text: '#151413', muted: '#6B665C', primary: '#151413', secondary: '#DCD5C7', accent: '#2E48D6', border: '#DCD5C7' }

const display = 'font-(family-name:--font-display) leading-[0.95] tracking-tight'
const utility = 'font-(family-name:--font-utility) text-sm'

function demo(id: PieceId, c: PaletteColors): ReactNode {
  switch (id) {
    case 'text-effect': return <TextEffect as="p" preset="slide" className={`${display} px-6 text-center text-4xl`}>Three days of polo on the grass</TextEffect>
    case 'text-loop': return <p className={`${display} text-4xl`}>We build <TextLoop words={['shops', 'archives', 'tools', 'films']} className="text-(--color-accent)" /></p>
    case 'split-flap': return <SplitFlap text="11–13 June" className={`${utility} text-3xl`} />
    case 'number-ticker': return <p className={`${display} text-6xl`}><NumberTicker value={1240} /><span className={`${utility} ml-2 align-top text-(--color-muted)`}>guests</span></p>
    case 'text-scramble': return <LinkDemo piece="text-scramble" colors={c} />
    case 'text-roll': return <LinkDemo piece="text-roll" colors={c} />
    case 'spinning-text': return <SpinningText radius={6} className={utility}>SCROLL • SINCE 2019 • </SpinningText>
    case 'text-reveal': return <TextReveal className={`${display} max-w-md px-6 text-2xl`}>We only take on work we would want to live with for ten years — and we say no to the rest.</TextReveal>
    case 'marquee': return <div className="w-full space-y-2"><Marquee seconds={30}>{PHOTOS.slice(0, 5).map((p) => <img key={p.src} src={p.src} alt="" className="h-20 w-auto" />)}</Marquee><Marquee seconds={30} reverse>{PHOTOS.slice(5).map((p) => <img key={p.src} src={p.src} alt="" className="h-20 w-auto" />)}</Marquee></div>
    case 'image-comparison': return <ImageComparison before={PHOTOS[6].src} after={PHOTOS[2].src} beforeAlt="Before" afterAlt="After" className="aspect-[3/2] w-full max-w-sm" />
    case 'ring-carousel': return <RingCarousel photos={PHOTOS} height={220} className="w-full" />
    case 'image-field': return <ImageField photos={PHOTOS} cell={110} className="h-full w-full" />
    case 'tilted-grid': return <TiltedGrid photos={[...PHOTOS, ...PHOTOS].slice(0, 15)} columns={5} className="w-full self-start px-4 pt-4" />
    case 'image-trail': return <ImageTrail photos={PHOTOS.map((p) => p.src)} spacing={60} className="grid h-full w-full place-items-center"><p className={`${display} text-3xl`}>Move the cursor here</p></ImageTrail>
    case 'tilt': return <Tilt degrees={8}><img src={PHOTOS[4].src} alt="" className="h-40 w-32 object-cover" /></Tilt>
    case 'cursor-area': return <CursorArea label="View" className="h-40 w-64"><img src={PHOTOS[3].src} alt="" className="size-full object-cover" /></CursorArea>
    case 'magnetic': return <Magnetic><span className="inline-block bg-(--color-text) px-6 py-3 text-(--color-background)">Start a project</span></Magnetic>
    case 'hover-highlight': return <LinkDemo piece="hover-highlight" colors={c} />
    case 'scroll-progress': return <div className="relative h-full w-full overflow-hidden"><div className="absolute inset-x-0 top-0 h-0.5 origin-left animate-[opuskit-fill_3s_ease-in-out_infinite] bg-(--color-accent)" /><style>{'@keyframes opuskit-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style><p className="p-6 text-(--color-muted)">A hairline fills across the top as the page is read.</p><span className="hidden"><ScrollProgress /></span></div>
    case 'velocity-band': return <VelocityBand text="Available for new work — " className={`${display} text-5xl`} />
    // Needs a page-length scroll to show; the catalog shows the stack it settles into.
    case 'sticky-cards': return <div className="relative h-44 w-64">{PHOTOS.slice(0, 3).map((p, i) => <img key={i} src={p.src} alt="" className="absolute inset-x-0 h-36 w-full object-cover" style={{ top: i * 14, scale: String(0.9 + i * 0.05) }} />)}<span className="hidden"><StickyCards cards={[]} /></span></div>
    case 'grid-pattern': return <div className="relative grid h-full w-full place-items-center"><GridPattern size={32} cells={[[3, 2], [5, 3], [8, 1]]} /><p className={`${display} relative text-3xl`}>Hall B · Row 4</p></div>
    case 'grain': return <div className="relative grid h-full w-full place-items-center bg-(--color-text)"><Grain opacity={0.35} /><p className={`${display} relative text-3xl text-(--color-background)`}>Warm, like film</p></div>
    case 'magnet-lines': return <MagnetLines rows={6} columns={14} className="h-full w-full opacity-60" />
    case 'media-between-text': return <MediaBetweenText before="Made by" after="hand" src={PHOTOS[3].src} alt="" width="7rem" className={`${display} text-5xl`} />
    case 'cut-reveal': return <TextEffect as="p" preset="cut" className={`${display} px-6 text-center text-5xl`}>Polo in Sheki</TextEffect>
    case 'pinned-stage': return <PinnedDemo />
    case 'underline-fill': return <LinkDemo piece="underline-fill" colors={c} />
    case 'parallax-floating': return <ParallaxFloating className="size-full" photos={[{ ...PHOTOS[0], x: '6%', y: '10%', w: '22%', depth: 1.5 }, { ...PHOTOS[4], x: '72%', y: '8%', w: '20%', depth: 0.8 }, { ...PHOTOS[6], x: '10%', y: '62%', w: '18%', depth: 1 }, { ...PHOTOS[2], x: '70%', y: '60%', w: '22%', depth: 2 }]}><p className={`${display} text-3xl`}>Move the cursor</p></ParallaxFloating>
    case 'drag-photos': return <DragPhotos className="size-full" photos={[0, 3, 5, 7].map((k, i) => ({ ...PHOTOS[k], x: `${8 + i * 21}%`, y: `${14 + (i % 2) * 22}%`, w: '26%', rotate: [-5, 3, -2, 6][i] }))} />
    case 'text-along-path': return <TextAlongPath text="Open for commissions —" className={`${display} w-full px-2 text-7xl`} />
    case 'shader-grain': return <div className="relative grid size-full place-items-center"><ShaderGrain /><p className={`${display} relative text-3xl`}>Grain in your colours</p></div>
    case 'shader-dither': return <div className="relative grid size-full place-items-center"><ShaderDither /><p className={`${display} relative bg-(--color-background) px-3 text-3xl`}>Dithered</p></div>
    case 'video-dialog': return <VideoDialog poster={POSTER} src={FILM} title="The film" className="h-40 w-64" />
    case 'duo-headline': return <DuoHeadline as="p" loud="Alles" quiet="beweegt" className="px-4 text-6xl" />
    case 'scribble-link': return <LinkDemo piece="scribble-link" colors={c} />
    case 'wavy-link': return <LinkDemo piece="wavy-link" colors={c} />
    case 'swap-button': return <SwapButton href="#demo" label="Tell us your story" />
    case 'stickers': return <div className="relative size-full"><p className={`${display} grid h-full place-items-center text-3xl`}>Throw a sticker</p><Stickers stickers={STICKERS.slice(0, 4).map((src, i) => ({ src, alt: '', x: ['6%', '70%', '14%', '74%'][i], y: ['8%', '10%', '58%', '56%'][i], w: '4.5rem', rotate: [-10, 8, 6, -6][i], depth: 0.5 }))} /></div>
    case 'fade-transition': return <div className="relative size-full overflow-hidden"><p className="p-6 text-sm">Every internal link dims the page softly, then the next one fades in.</p><div className="absolute inset-0 animate-[opuskit-fade_2.4s_ease-in-out_infinite] bg-(--color-background)" /><style>{'@keyframes opuskit-fade{0%,15%{opacity:0}40%,55%{opacity:1}85%,100%{opacity:0}}'}</style></div>
    case 'blob-transition': return <div className="relative size-full overflow-hidden"><div className="absolute inset-x-[-20%] top-[30%] h-[140%] animate-[opuskit-blob_2.4s_cubic-bezier(.76,0,.24,1)_infinite] rounded-t-[50%] bg-(--color-chapter-1,var(--color-accent))" /><style>{'@keyframes opuskit-blob{0%{transform:translateY(100%)}45%,55%{transform:translateY(-10%)}100%{transform:translateY(-160%)}}'}</style><p className="relative p-6 text-sm">Every internal link sweeps a blob over the page.</p></div>
    case 'brand-cursor': return <div className="grid size-full place-items-center" style={{ cursor: `url("${CURSOR}") 3 2, auto` }}><p className="text-sm">Move the cursor here</p></div>
    case 'cookie-note': return <div className="relative size-full [&_[role=dialog]]:absolute [&_[role=dialog]]:bottom-3 [&_[role=dialog]]:right-3"><CookieNote text="We use cookies to see which films you watch — nothing else." storageKey="opuskit-demo-cookie" /></div>
    case 'curtain-transition': return <div className="relative size-full overflow-hidden"><p className="p-6 text-sm">Every internal link raises a panel with the next page’s name.</p><div className="absolute inset-0 grid animate-[opuskit-curtain_2.4s_cubic-bezier(.76,0,.24,1)_infinite] place-items-center bg-(--color-text)"><p className={`${display} text-5xl text-(--color-background)`}>Journal</p></div><style>{'@keyframes opuskit-curtain{0%{transform:translateY(100%)}35%,60%{transform:translateY(0)}95%,100%{transform:translateY(-100%)}}'}</style></div>
    case 'preloader': return <PreloaderDemo />
    // Drawn, not the real piece: the real one covers and locks the whole page.
    case 'entry-gate': return <GateDemo />
    // Drawn: the real one follows the page's own scroll through a long section.
    case 'chapter-colours': return <ChaptersDemo />
    case 'lightbox': return <LightboxDemo />
    // Not the real piece: it would smooth-scroll the whole OpusKit app.
    case 'smooth-scroll': return <div className="grid size-full grid-cols-2 gap-px bg-(--color-border)">{[['Step', 'steps(5)'], ['Glide', 'cubic-bezier(.22,1,.36,1)']].map(([l, ease]) => <div key={l} className="relative bg-(--color-background) p-5"><p className={utility}>{l}</p><span className="absolute left-1/2 top-12 size-3 rounded-full bg-(--color-accent)" style={{ animation: `opuskit-glide 2.4s ${ease} infinite alternate` }} /></div>)}<style>{'@keyframes opuskit-glide{to{transform:translateY(7rem)}}'}</style></div>
    case 'ambient-sound': return <div className="relative grid size-full place-items-center [&>button]:absolute"><p className="text-sm text-(--color-muted)">The switch sits bottom-left on every page.</p><AmbientSound src="" /></div>
    default: { const missing: never = id; return missing } // every piece needs a demo
  }
}

// The preloader's count and lift, looping inside the card (the real one runs once per visit, full screen).
function PreloaderDemo() {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setInterval(() => setN((v) => (v >= 140 ? 0 : v + 2)), 30); return () => clearInterval(t) }, [])
  const up = n > 100
  return (
    <div className="relative size-full overflow-hidden">
      <p className="p-6 text-sm text-(--color-muted)">The page underneath.</p>
      <div className={`absolute inset-0 flex flex-col justify-between border-b border-(--color-border) bg-(--color-background) p-5 ${up ? 'transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)]' : ''}`} style={{ transform: up ? 'translateY(-100%)' : undefined }}>
        <p className={`${display} text-4xl`}>Slow Atlas</p>
        <p className={`${utility} self-end text-3xl tabular-nums`}>{Math.min(n, 100)}</p>
      </div>
    </div>
  )
}

// The gate: a sheet with one playful action lifts away to show the page, looping inside the card.
function GateDemo() {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setInterval(() => setN((v) => (v + 1) % 4), 900); return () => clearInterval(t) }, [])
  const up = n === 3
  return (
    <div className="relative size-full overflow-hidden">
      <p className={`${display} grid h-full place-items-center text-3xl`}>The site, underneath</p>
      <div className={`absolute inset-0 flex flex-col items-center justify-end gap-3 bg-(--color-surface)/90 pb-6 backdrop-blur-[3px] ${up ? 'transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)]' : ''}`} style={{ transform: up ? 'translateY(-105%) rotate(-3deg)' : 'none' }}>
        <span className="absolute right-3 top-2 text-xs underline">Skip</span>
        <p className={`${display} text-3xl`}>Lift the sheet</p>
        <span className={`${utility} bg-(--color-text) px-4 py-2 text-(--color-background)`}>Drag it up</span>
      </div>
    </div>
  )
}

// Each item's colours taking the whole section, one after another (the real piece follows scroll).
function ChaptersDemo() {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setInterval(() => setN((v) => (v + 1) % 3), 1400); return () => clearInterval(t) }, [])
  return (
    <div className="grid size-full place-items-center transition-colors duration-500" style={{ background: `var(--color-chapter-${n + 1})`, color: 'var(--color-background)' }}>
      <div className="flex items-center gap-4">
        <img src={PHOTOS[[0, 4, 7][n]].src} alt="" className="h-32 w-24 object-cover" />
        <p className={`${display} max-w-[10ch] text-3xl`}>{['The rooster', 'Nine koi', 'The moths'][n]}</p>
      </div>
    </div>
  )
}

// The real viewer: tap a photo.
// The stage holding still while its steps change, with the progress bar — drawn, since a card can't pin.
function PinnedDemo() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % 4), 1300); return () => clearInterval(t) }, [])
  return (
    <div className="flex w-72 flex-col gap-3">
      <div className="relative h-36 overflow-hidden">{PHOTOS.slice(0, 4).map((p, k) => <img key={p.src} src={p.src} alt="" className="absolute inset-0 h-full w-full object-cover transition-all duration-500" style={{ opacity: k === i ? 1 : 0, transform: `translateY(${k === i ? 0 : k < i ? -16 : 16}px)` }} />)}</div>
      <div className="flex items-center gap-3 font-(family-name:--font-utility) text-xs text-(--color-muted)"><span className="relative h-px flex-1 bg-(--color-border)"><span className="absolute inset-y-0 left-0 bg-(--color-text) transition-all duration-500" style={{ width: `${((i + 1) / 4) * 100}%` }} /></span><span className="tabular-nums">{i + 1} of 4</span></div>
      <span className="hidden"><PinnedStage steps={[]} /></span>
    </div>
  )
}

function LightboxDemo() {
  const [open, setOpen] = useState<number | null>(null)
  const photos = PHOTOS.slice(0, 6).map((p, i) => ({ ...p, caption: `Studio work, ${i + 1} of 6` }))
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {photos.map((p, i) => <button key={p.src} type="button" onClick={() => setOpen(i)} aria-label={`Open ${p.caption}`} className="cursor-zoom-in"><img src={p.src} alt="" className="h-20 w-24 object-cover" /></button>)}
      <Lightbox photos={photos} index={open} onIndex={setOpen} />
    </div>
  )
}

// These react to the page's own scroll: scroll past the card to see them move.
const ON_SCROLL = new Set<PieceId>(['text-reveal', 'tilted-grid', 'sticky-cards', 'velocity-band'])

export function PieceDemo({ id, colors = OPUSKIT, fonts, chapters = ['#0038FF', '#FF77CD', '#FF5F04'], className }: { id: PieceId; colors?: PaletteColors; fonts?: Fonts; chapters?: readonly string[]; className?: string }) {
  const vars = {
    ...Object.fromEntries(chapters.map((c, i) => [`--color-chapter-${i + 1}`, c])),
    '--color-background': colors.background, '--color-surface': colors.surface, '--color-text': colors.text, '--color-muted': colors.muted,
    '--color-accent': colors.accent, '--color-border': colors.border,
    '--font-display': fonts?.display ?? 'inherit', '--font-body': fonts?.body ?? 'inherit', '--font-utility': fonts?.utility ?? 'inherit',
    background: colors.background, color: colors.text,
  } as CSSProperties
  return (
    <div className={`relative grid h-56 place-items-center overflow-hidden ${className ?? ''}`} style={vars}>
      {demo(id, colors)}
      {ON_SCROLL.has(id) && <span className="pointer-events-none absolute bottom-2 right-3 text-xs opacity-60">moves as you scroll</span>}
    </div>
  )
}
