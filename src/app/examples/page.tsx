import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageIntro } from '@/components/ui'
import { examples } from '@/data/examples'

export const metadata: Metadata = { title: 'Examples', description: 'Finished sites built from OpusKit recipes — visit them, not just screenshots of them.' }

export default function ExamplesPage() {
  return (
    <>
      <PageIntro label={`Examples · ${examples.length} built sites`} title="See what a recipe builds.">Real, working sites — not mockups. Each one started as a Universal Recipe and was built from its Build Package.</PageIntro>
      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {examples.map((e) => (
            <li key={e.slug}>
              <Link href={`/examples/${e.slug}`} className="group block">
                <div className="overflow-hidden rounded-lg border border-line">
                  <Image src={`/examples/${e.slug}.jpg`} alt={`${e.title} — homepage`} width={1200} height={750} className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h2 className="mt-4 text-xl font-medium tracking-tight group-hover:text-pencil">{e.title}</h2>
                <p className="mt-1 text-sm text-ink-2">{e.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
