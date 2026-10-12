'use client'
// One piece alone on OpusKit's dark ground, large and centred — where the Library's clips of pieces are recorded
// with the Mac's own cursor (scripts/capture/demo-clips.mjs). A piece that only moves on hover, a drag, a click or the
// page's scroll means nothing standing still (the user, 2026-10-10), so its card plays the clip of it being used.
// Pieces that follow the page's own scroll get a page to scroll: the real piece between plain text, the site's chrome
// hidden; every other piece is its catalog demo over the whole window.
import { use, type CSSProperties } from 'react'
import { OPUSKIT_DARK as OPUSKIT, PieceDemo } from '@/components/PieceDemo'
import { pieces } from '@/data/pieces'
import { ChapterColours } from '@/pieces/ChapterColours'
import { ScrollProgress } from '@/pieces/ScrollProgress'
import { ScrollStory } from '@/pieces/ScrollStory'
import { SideScroll } from '@/pieces/SideScroll'
import { MaskReveal } from '@/pieces/MaskReveal'
import { LettersAssemble } from '@/pieces/LettersAssemble'
import { SpeedBend } from '@/pieces/SpeedBend'
import { TiltedGrid } from '@/pieces/TiltedGrid'
import { SceneSlider } from '@/pieces/SceneSlider'
import { SCENE_SCENES } from '@/components/PieceDemo'
import type { PieceId } from '@/types/domain'

const PHOTOS = [...[1, 2, 3, 4, 5, 6].map((n) => `/examples/brasshand/media/work-${n}.jpg`), ...[1, 2, 3, 4].map((n) => `/examples/sticky-weather/media/work-${n}.jpg`)].map((src) => ({ src, alt: '' }))
const VARS = {
  '--color-background': OPUSKIT.background, '--color-surface': OPUSKIT.surface, '--color-text': OPUSKIT.text, '--color-muted': OPUSKIT.muted,
  '--color-accent': OPUSKIT.accent, '--color-border': OPUSKIT.border, background: OPUSKIT.background, color: OPUSKIT.text,
} as CSSProperties
const Text = ({ n = 3 }: { n?: number }) => (
  <div className="mx-auto max-w-xl space-y-5 px-6 py-16 text-lg leading-relaxed text-(--color-muted)">
    {Array.from({ length: n }, (_, i) => <p key={i}>We work slowly and on few things at once: a shop sign, a run of labels, a book for a bakery that has baked the same loaf for forty years. Every job starts with a walk round the place it is for.</p>)}
  </div>
)
const STORY = [['The walk', 1], ['The sketch', 4], ['The proof', 7], ['The sign', 2]] as const
const CHAPTERS = [[OPUSKIT.accent, OPUSKIT.background, 'The rooster', 0], [OPUSKIT.text, OPUSKIT.background, 'Nine koi', 4], ['#2B2B30', OPUSKIT.text, 'The moths', 7]] as const

// OpusKit's own header, footer and click sparks, and Next's dev badge, stay out of the clip.
const CHROME_OFF = <style>{'header.sticky, #main ~ footer, #main ~ canvas, nextjs-portal { display: none !important }'}</style>

/** The pages for pieces that follow the page's scroll. */
const SCROLLED: Partial<Record<PieceId, () => React.ReactNode>> = {
  'scene-slider': () => <><div data-target><SceneSlider label="The forest, from dawn to night" scenes={SCENE_SCENES} /></div><Text n={3} /></>,
  'tilted-grid': () => <><Text n={2} /><div className="h-[45vh]" /><div data-target><TiltedGrid photos={[...PHOTOS, ...PHOTOS].slice(0, 15)} columns={5} className="mx-auto max-w-5xl px-6" /></div><div className="h-[70vh]" /></>,
  'side-scroll': () => (
    <><Text n={2} />
      <div data-target><SideScroll label="Work">{PHOTOS.slice(0, 8).map((p) => <img key={p.src} src={p.src} alt="" className="h-[60vh] w-auto" />)}</SideScroll></div>
      <div className="h-[15vh]" /></>
  ),
  'speed-bend': () => <><Text n={2} /><div data-target className="mx-auto max-w-4xl px-6 py-20"><SpeedBend><div className="grid grid-cols-3 gap-4">{[...PHOTOS, ...PHOTOS].slice(0, 12).map((p, i) => <img key={i} src={p.src} alt="" className="aspect-[4/5] w-full object-cover" />)}</div></SpeedBend></div><Text n={3} /></>,
  'mask-reveal': () => <><Text n={1} /><div data-target><MaskReveal src={PHOTOS[2].src} alt="" left="Costa" right="del Sol"><h2 className="text-6xl">Era House</h2></MaskReveal></div><Text n={2} /></>,
  // Below the first screen: a line already there when the page opens gathers once on its own, before anyone sees it.
  'letters-assemble': () => <><Text n={2} /><div className="h-screen" /><div data-target className="py-[30vh]"><LettersAssemble as="h2" className="mx-auto max-w-4xl px-6 text-center text-7xl">A good identity still works on a paper bag.</LettersAssemble></div><Text n={2} /></>,
  'scroll-story': () => (
    <><Text n={1} />
      <div data-target className="mx-auto max-w-5xl px-6"><ScrollStory chapters={STORY.map(([title, k]) => ({ src: PHOTOS[k].src, alt: '', body: <><h3 className="text-5xl">{title}</h3><p className="mt-4 text-lg text-(--color-muted)">Every job starts with a walk round the place it is for, and ends when the owner stops noticing it.</p></> }))} /></div>
      <Text n={1} /></>
  ),
  'scroll-progress': () => <><ScrollProgress className="h-1" /><h1 className="px-6 pt-24 text-center text-5xl">A loaf for forty years</h1><Text n={14} /></>,
  'chapter-colours': () => (
    <><Text n={2} />
      <div data-target><ChapterColours className="py-[30vh]">
        {CHAPTERS.map(([ground, ink, title, k]) => (
          <article key={title} data-ground={ground} data-ink={ink} className="mx-auto flex max-w-3xl items-center gap-10 px-6 py-[18vh]">
            <img src={PHOTOS[k].src} alt="" className="h-72 w-56 object-cover" /><p className="text-6xl">{title}</p>
          </article>
        ))}
      </ChapterColours></div>
      <Text n={2} /></>
  ),
}

export default function PieceDemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  if (!Object.hasOwn(pieces, id)) return null
  const page = SCROLLED[id as PieceId]
  if (page) return <div data-demo-page style={VARS}>{CHROME_OFF}{page()}</div>
  return (
    <main className="fixed inset-0 z-[100] grid place-items-center" style={VARS}>{CHROME_OFF}
      {/* A 16:10 stage, the clip's frame; the recorder makes it large with the browser's own zoom, never CSS zoom or a
          transform (the pointer would land in other pixels than the page). */}
      <div data-demo className="h-[312px] w-[500px]"><PieceDemo id={id as PieceId} colors={OPUSKIT} className="h-full!" /></div>
    </main>
  )
}
