// Home → Featured Work, first half: the maps and a few studio pictures lie on the desk as prints (DragPhotos — the
// owner's pick). A marker note with a drawn arrow tells you they move. Phones get a sparser desk, so a thumb can
// still scroll between the prints. Keyboard and screen readers use the index of the same maps right below.
import { Draw, Lines } from '@/components/motion'
import { DragPhotos, type DeskPhoto } from '@/components/pieces/DragPhotos'
import { media, type AssetKey } from '@/config/assets'

const print = (id: AssetKey, x: string, y: string, w: string, rotate: number): DeskPhoto => {
  const a = media(id)
  return { src: a.src, width: a.width, height: a.height, alt: a.alt, x, y, w, rotate }
}

const WIDE = [
  print('processSketch', '15%', '46%', '12%', 4),
  print('workVintageStack', '85%', '4%', '11%', 6),
  print('processWatercolour', '31%', '56%', '11%', -3),
  print('deskInk', '48%', '44%', '13%', -6),
  print('featuredWork-1', '3%', '6%', '24%', -4),
  print('featuredWork-2', '29%', '14%', '26%', 3),
  print('featuredWork-3', '59%', '3%', '23%', -2),
  print('featuredWork-4', '70%', '42%', '25%', 5),
]
const TALL = [
  print('processSketch', '66%', '1%', '30%', 5),
  print('featuredWork-1', '2%', '4%', '56%', -4),
  print('featuredWork-2', '40%', '25%', '58%', 3),
  print('featuredWork-3', '4%', '48%', '52%', 2),
  print('featuredWork-4', '42%', '66%', '55%', -3),
]

export function Desk({ title, years, note, sr }: { title: string; years: string; note: string; sr: string }) {
  return (
    <div>
      <div className="grid-site items-end gap-y-4">
        <Lines id="work-title" lines={[title]} className="type-h2 col-span-full sm:col-span-4 lg:col-span-6" />
        <p className="type-utility col-span-full whitespace-nowrap text-(--color-muted) tabular-nums sm:col-span-2 sm:text-right lg:col-span-2 lg:col-start-11">{years}</p>
      </div>
      <Draw className="mt-8 flex items-start gap-3 md:ml-[44%]">
        <p className="type-note max-w-[22ch] -rotate-1">{note}</p>
        <svg viewBox="0 0 60 70" aria-hidden className="mt-2 h-14 w-12 shrink-0 overflow-visible text-(--color-accent)">
          <path data-stroke pathLength={1} d="M6 4 C 30 8, 46 26, 40 62" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
          <path data-stroke pathLength={1} d="M31 52 L 40 64 L 49 53" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ '--d': 500 } as React.CSSProperties} />
        </svg>
      </Draw>
      <p className="sr-only">{sr}</p>
      <div aria-hidden className="-mx-(--gutter) mt-4">
        <DragPhotos photos={WIDE} sizes="(min-width: 1024px) 26vw, 40vw" className="hidden h-[min(80svh,860px)] min-h-[560px] sm:block" />
        <DragPhotos photos={TALL} sizes="60vw" className="h-[72svh] min-h-[520px] sm:hidden" />
      </div>
    </div>
  )
}
