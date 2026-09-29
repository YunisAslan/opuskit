'use client'
// Live demo of a kit piece — the real component from src/pieces/, in the recipe's colours and fonts
// (or OpusKit's own when shown in the catalog). The same code a Build Package ships.

import type { CSSProperties, ReactNode } from 'react'
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
import { CutReveal } from '@/pieces/CutReveal'
import { DragPhotos } from '@/pieces/DragPhotos'
import { MediaBetweenText } from '@/pieces/MediaBetweenText'
import { ParallaxFloating } from '@/pieces/ParallaxFloating'
import { ShaderDither } from '@/pieces/ShaderDither'
import { ShaderGrain } from '@/pieces/ShaderGrain'
import { TextAlongPath } from '@/pieces/TextAlongPath'
import { UnderlineFill } from '@/pieces/UnderlineFill'
import { CookieNote } from '@/pieces/CookieNote'
import { DuoHeadline } from '@/pieces/DuoHeadline'
import { ScribbleLink } from '@/pieces/ScribbleLink'
import { Stickers } from '@/pieces/Stickers'
import { SwapButton } from '@/pieces/SwapButton'
import { WavyLink } from '@/pieces/WavyLink'
import type { PaletteColors, PieceId } from '@/types/domain'

// Real photos already on disk (the example sites' media), small ones first.
const P = '/examples/cheeky911/media/yourPhotos-'
const PHOTOS = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((n) => ({ src: `${P}${n}.jpg`, alt: 'A Porsche 911, photographed by its owner' }))
export const STICKERS = ['burst', 'pill', 'badge', 'smile', 'wing', 'star'].map((n) => `/stickers/${n}.svg`)
const CURSOR = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32"><path d="M3 2 C 9 12, 14 20, 17 28 L 19.5 19.5 L 27 17.5 C 19 12, 10 6, 3 2 Z" fill="#0038FF" stroke="#111" stroke-width="2"/></svg>')}`
const POSTER = '/examples/cheeky911/media/posterImage.jpg'
const FILM = '/examples/cheeky911/media/clip.mp4'

type Fonts = { display: string; body: string; utility: string }
const OPUSKIT: PaletteColors = { background: '#F5F0E6', surface: '#FFFFFF', text: '#151413', muted: '#6B665C', primary: '#151413', secondary: '#DCD5C7', accent: '#2E48D6', border: '#DCD5C7' }

const display = 'font-(family-name:--font-display) leading-[0.95] tracking-tight'
const utility = 'font-(family-name:--font-utility) text-sm'

function demo(id: PieceId): ReactNode {
  switch (id) {
    case 'text-effect': return <TextEffect as="p" preset="slide" className={`${display} px-6 text-center text-4xl`}>Three days of polo on the grass</TextEffect>
    case 'text-loop': return <p className={`${display} text-4xl`}>We build <TextLoop words={['shops', 'archives', 'tools', 'films']} className="text-(--color-accent)" /></p>
    case 'split-flap': return <SplitFlap text="11–13 June" className={`${utility} text-3xl`} />
    case 'number-ticker': return <p className={`${display} text-6xl`}><NumberTicker value={1240} /><span className={`${utility} ml-2 align-top text-(--color-muted)`}>guests</span></p>
    case 'text-scramble': return <TextScramble className={`${utility} text-lg uppercase`}>Selected work</TextScramble>
    case 'text-roll': return <p className="flex gap-6 text-xl">{['Work', 'About', 'Contact'].map((l) => <a key={l} href="#demo" onClick={(e) => e.preventDefault()}><TextRoll>{l}</TextRoll></a>)}</p>
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
    case 'hover-highlight': return <HoverHighlight items={[{ label: 'Work', href: '#w' }, { label: 'Studio', href: '#s' }, { label: 'Journal', href: '#j' }, { label: 'Contact', href: '#c' }]} />
    case 'scroll-progress': return <div className="relative h-full w-full overflow-hidden"><div className="absolute inset-x-0 top-0 h-0.5 origin-left animate-[opuskit-fill_3s_ease-in-out_infinite] bg-(--color-accent)" /><style>{'@keyframes opuskit-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style><p className="p-6 text-(--color-muted)">A hairline fills across the top as the page is read.</p><span className="hidden"><ScrollProgress /></span></div>
    case 'velocity-band': return <VelocityBand text="Available for new work — " className={`${display} text-5xl`} />
    // Needs a page-length scroll to show; the catalog shows the stack it settles into.
    case 'sticky-cards': return <div className="relative h-44 w-64">{PHOTOS.slice(0, 3).map((p, i) => <img key={i} src={p.src} alt="" className="absolute inset-x-0 h-36 w-full object-cover" style={{ top: i * 14, scale: String(0.9 + i * 0.05) }} />)}<span className="hidden"><StickyCards cards={[]} /></span></div>
    case 'grid-pattern': return <div className="relative grid h-full w-full place-items-center"><GridPattern size={32} cells={[[3, 2], [5, 3], [8, 1]]} /><p className={`${display} relative text-3xl`}>Hall B · Row 4</p></div>
    case 'grain': return <div className="relative grid h-full w-full place-items-center bg-(--color-text)"><Grain opacity={0.35} /><p className={`${display} relative text-3xl text-(--color-background)`}>Warm, like film</p></div>
    case 'magnet-lines': return <MagnetLines rows={6} columns={14} className="h-full w-full opacity-60" />
    case 'media-between-text': return <MediaBetweenText before="Made by" after="hand" src={PHOTOS[3].src} alt="" width="7rem" className={`${display} text-5xl`} />
    case 'cut-reveal': return <CutReveal as="p" className={`${display} px-6 text-center text-5xl`}>Polo in Sheki</CutReveal>
    case 'underline-fill': return <p className="flex gap-6 text-xl"><UnderlineFill href="#demo">Start a conversation</UnderlineFill></p>
    case 'parallax-floating': return <ParallaxFloating className="size-full" photos={[{ ...PHOTOS[0], x: '6%', y: '10%', w: '22%', depth: 1.5 }, { ...PHOTOS[4], x: '72%', y: '8%', w: '20%', depth: 0.8 }, { ...PHOTOS[6], x: '10%', y: '62%', w: '18%', depth: 1 }, { ...PHOTOS[2], x: '70%', y: '60%', w: '22%', depth: 2 }]}><p className={`${display} text-3xl`}>Move the cursor</p></ParallaxFloating>
    case 'drag-photos': return <DragPhotos className="size-full" photos={[0, 3, 5, 7].map((k, i) => ({ ...PHOTOS[k], x: `${8 + i * 21}%`, y: `${14 + (i % 2) * 22}%`, w: '26%', rotate: [-5, 3, -2, 6][i] }))} />
    case 'text-along-path': return <TextAlongPath text="Open for commissions —" className={`${display} w-full px-2 text-7xl`} />
    case 'shader-grain': return <div className="relative grid size-full place-items-center"><ShaderGrain /><p className={`${display} relative text-3xl`}>Grain in your colours</p></div>
    case 'shader-dither': return <div className="relative grid size-full place-items-center"><ShaderDither /><p className={`${display} relative bg-(--color-background) px-3 text-3xl`}>Dithered</p></div>
    case 'video-dialog': return <VideoDialog poster={POSTER} src={FILM} title="The film" className="h-40 w-64" />
    case 'duo-headline': return <DuoHeadline as="p" loud="Alles" quiet="beweegt" className="px-4 text-6xl" />
    case 'scribble-link': return <p className="flex gap-6 text-lg">{['Over', 'Werk', 'Contact'].map((l, i) => <ScribbleLink key={l} href="#demo" current={i === 1}>{l}</ScribbleLink>)}</p>
    case 'wavy-link': return <p className="flex gap-6 text-lg">{['Instagram', 'Vimeo', 'LinkedIn'].map((l) => <WavyLink key={l} href="#demo">{l}</WavyLink>)}</p>
    case 'swap-button': return <SwapButton href="#demo" label="Tell us your story" />
    case 'stickers': return <div className="relative size-full"><p className={`${display} grid h-full place-items-center text-3xl`}>Throw a sticker</p><Stickers stickers={STICKERS.slice(0, 4).map((src, i) => ({ src, alt: '', x: ['6%', '70%', '14%', '74%'][i], y: ['8%', '10%', '58%', '56%'][i], w: '4.5rem', rotate: [-10, 8, 6, -6][i], depth: 0.5 }))} /></div>
    case 'blob-transition': return <div className="relative size-full overflow-hidden"><div className="absolute inset-x-[-20%] top-[30%] h-[140%] animate-[opuskit-blob_2.4s_cubic-bezier(.76,0,.24,1)_infinite] rounded-t-[50%] bg-(--color-chapter-1,var(--color-accent))" /><style>{'@keyframes opuskit-blob{0%{transform:translateY(100%)}45%,55%{transform:translateY(-10%)}100%{transform:translateY(-160%)}}'}</style><p className="relative p-6 text-sm">Every internal link sweeps a blob over the page.</p></div>
    case 'brand-cursor': return <div className="grid size-full place-items-center" style={{ cursor: `url("${CURSOR}") 3 2, auto` }}><p className="text-sm">Move the cursor here</p></div>
    case 'cookie-note': return <div className="relative size-full [&_[role=dialog]]:absolute [&_[role=dialog]]:bottom-3 [&_[role=dialog]]:right-3"><CookieNote text="We use cookies to see which films you watch — nothing else." storageKey="opuskit-demo-cookie" /></div>
    default: { const missing: never = id; return missing } // every piece needs a demo
  }
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
      {demo(id)}
      {ON_SCROLL.has(id) && <span className="pointer-events-none absolute bottom-2 right-3 text-xs opacity-60">moves as you scroll</span>}
    </div>
  )
}
