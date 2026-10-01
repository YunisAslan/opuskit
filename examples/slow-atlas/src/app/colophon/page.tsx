import type { Metadata } from 'next'
import { CutReveal } from '@/components/pieces/CutReveal'
import { ChapterWord } from '@/components/site/motion'
import { site } from '@/content/magazine'

export const metadata: Metadata = { title: 'Colophon', description: 'How Slow Atlas is made, what it keeps about you, and who took the photographs.' }

const CREDITS = [
  ['The red house on the hill', 'Cassie Boca', 'https://unsplash.com/photos/red-wooden-cabin-on-hill-under-blue-sky-at-daytime-RO_54Ly2S5o'],
  ['Fog on the lake road', 'Zach Miller', 'https://unsplash.com/photos/a-long-road-with-trees-on-either-side-of-it-KPHwwF2WOjI'],
  ['A harbour that keeps its own time', 'JOGphotos', 'https://unsplash.com/photos/two-small-boats-moored-in-a-calm-harbor-Mz53KCT1ooE'],
  ['Two hundred kilometres of straight road', 'Andrew Svk', 'https://unsplash.com/photos/an-empty-road-in-the-middle-of-a-desert-1cD6Dm7VcgA'],
  ['Winter at the edge of the fjord', 'Camille Gerstenhaber', 'https://unsplash.com/photos/a-red-house-sitting-on-top-of-a-snow-covered-hillside-tzp4-yKVORY'],
  ['Kotor before the cruise ships', 'Linda Gerbec', 'https://unsplash.com/photos/a-cobblestone-street-with-an-arched-doorway-85x7XREre_w'],
  ['Nine hours at the train window', 'viktor rejent', 'https://unsplash.com/photos/view-from-a-train-window-showing-blurred-landscape-z4E3lpdl0Zk'],
  ['Portraits of the editors', 'Evgeny Bauder, McFollis, Gus Tu Njana', 'https://unsplash.com/license'],
]

const block = 'scroll-mt-28 border-t border-(--color-border) px-6 py-16 md:grid md:grid-cols-12 md:gap-4 md:py-24'

export default function Colophon() {
  return (
    <>
      <ChapterWord word="Colophon" as="h1" />
      <section className={block}>
        <CutReveal className="type-heading md:col-span-4">How it is made</CutReveal>
        <div className="type-body mt-6 max-w-[62ch] space-y-5 md:col-span-6 md:col-start-5 md:mt-0">
          <p>Headlines are set in Schibsted Grotesk, the reading in Source Serif 4. One essay goes out every second Sunday, edited in Bergen and sent at seven in the morning.</p>
        </div>
      </section>
      <section id="privacy" className={block}>
        <CutReveal className="type-heading md:col-span-4">Privacy</CutReveal>
        <div className="type-body mt-6 max-w-[62ch] space-y-5 md:col-span-6 md:col-start-5 md:mt-0">
          <p>This site sets no tracking cookies and runs no analytics. If you subscribe, we keep your email address to send you the letter, and nothing else. We never sell it or share it.</p>
          <p>Unsubscribing deletes your address within a day. To ask what we hold, write to <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
      <section id="credits" className={block}>
        <CutReveal className="type-heading md:col-span-4">Photo credits</CutReveal>
        <ul className="type-body mt-6 md:col-span-6 md:col-start-5 md:mt-0">
          {CREDITS.map(([essay, who, href]) => (
            <li key={essay} className="flex flex-col gap-1 border-b border-(--color-border) py-4 sm:flex-row sm:justify-between sm:gap-6">
              <span>{essay}</span>
              <a href={href} className="type-utility text-(--color-muted) underline underline-offset-4 hover:text-(--color-text)">{who}, on Unsplash</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
