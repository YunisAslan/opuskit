import { ViewTransition, type ElementType } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { ImageReveal, Lines } from '@/components/motion'
import type { AssetKey } from '@/config/assets'
// Featured Work — Large and small: projects alternate large and small so the rhythm never repeats. Every picture is
// 3:2 (one ratio across the set); each opens like a curtain, and morphs into its case study when clicked.
// (The site's other Featured Work design, names that reveal photos, is components/NamesReveal.tsx.)
export type Project = { title: string; meta: string; image: AssetKey; slug: string; href: string }

const place = ['md:col-span-7', 'md:col-span-5 md:mt-40', 'md:col-span-6 md:col-start-4', 'md:col-span-7 md:col-start-6']

export function FeaturedWorkSection({ id, link: L = 'a', title, h1 = false, projects }: { id?: string; link?: ElementType; title: string; h1?: boolean; projects: Project[] }) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <Lines as={h1 ? 'h1' : 'h2'} lines={[title]} className={h1 ? 'type-display max-w-[16ch] [font-size:clamp(2.75rem,6vw,5.5rem)]' : 'type-heading'} />
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-24">
          {projects.map((p, i) => (
            <li key={p.href} className={place[i % place.length]}>
              <L href={p.href} className="group block focus-visible:outline-none">
                <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                  <ImageReveal className="aspect-3/2">
                    <MediaAsset id={p.image} fill eager={i === 0} sizes="(min-width: 768px) 55vw, 100vw" className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]" />
                  </ImageReveal>
                </ViewTransition>
                <div className="mt-4 flex items-baseline justify-between gap-6">
                  <h3 className="type-heading [font-size:clamp(1.35rem,2vw,1.75rem)] underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-current group-focus-visible:decoration-current">{p.title}</h3>
                  <p className="type-utility shrink-0 text-right text-(--color-muted)">{p.meta}</p>
                </div>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
