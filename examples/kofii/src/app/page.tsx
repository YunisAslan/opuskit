import Link from 'next/link'
import { ScrollFilm } from '@/components/ScrollFilm'
import { Lines } from '@/components/Lines'

export default function Home() {
  return (
    <>
      <ScrollFilm />
      {/* Intro: arrives with the crema scene (scene 7). Tall so the last scene can breathe. */}
      <section className="relative min-h-[170svh] md:min-h-[200svh]" aria-labelledby="intro-title">
        <div className="sticky top-0 flex min-h-[100svh] items-center py-32">
          <div className="container-text grid grid-cols-12">
            <div className="col-span-12 rounded-card bg-surface/85 p-8 backdrop-blur-sm md:col-span-10 md:col-start-2 md:p-16 lg:col-span-8 lg:col-start-3">
              <p className="type-utility text-muted" data-reveal="rise">The shop</p>
              <Lines
                as="h2"
                className="type-statement mt-4"
                lines={['One small room,', 'one person per cup,', 'start to finish.']}
                mobile={['One small', 'room, one', 'person per', 'cup, start', 'to finish.']}
              />
              <span id="intro-title" className="sr-only">About the shop</span>
              <p className="mt-8 max-w-[52ch] text-lg" data-reveal="rise">
                KOFİİ is a neighbourhood coffee shop for people who like to watch their drink being made. Come for a flat white at the window, or an iced matcha to take away.
              </p>
              <div className="mt-8 flex flex-wrap gap-4" data-reveal="rise">
                <Link href="/menu" className="btn">See the menu</Link>
                <Link href="/gallery" className="btn btn-secondary">Keep exploring</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
