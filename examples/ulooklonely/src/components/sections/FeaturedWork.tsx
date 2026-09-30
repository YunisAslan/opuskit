// OpusKit section — Featured Work: 3–6 best projects, alternating large and small so the rhythm never repeats.
// Phones: single column, image first.
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/MediaAsset'
import { ClipReveal } from '@/components/Reveal'

export type Project = { title: string; meta: string; image: AssetKey; alt?: string; href: string }

export function FeaturedWorkSection({ title, projects, children }: { title: string; projects: Project[]; children?: ReactNode }) {
  return (
    <section className="px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-16 md:mt-16 md:grid-cols-12 md:gap-y-24">
          {projects.map((p, i) => (
            <li key={p.href + p.title} className={i % 3 === 0 ? 'md:col-span-7' : i % 3 === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-6 md:col-start-4'}>
              <Link href={p.href} className="group block">
                <ClipReveal className="border-2 border-(--color-text)">
                  <div className="overflow-hidden rounded-(--radius-media)"><MediaAsset id={p.image} alt={p.alt} className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/2]'}`} /></div>
                </ClipReveal>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="type-heading [font-size:clamp(1.25rem,1.8vw,1.6rem)] decoration-2 group-hover:underline group-hover:underline-offset-4 group-focus-visible:underline">{p.title}</h3>
                  <p className="type-utility shrink-0 text-(--color-muted)">{p.meta}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </section>
  )
}
