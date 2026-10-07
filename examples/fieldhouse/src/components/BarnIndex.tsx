'use client'
// Home's Featured Work: the names of the barns, with their photos always on show. From 768px the list sits beside a
// large photo held in place (sticky) while the list scrolls past it: the photo is whichever barn is in the middle of
// the screen, or the one hovered or focused, crossfading between them. On phones every name has its own wide photo.
// Reduced motion: the photos swap without the settle.
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { ImageReveal, Lines } from '@/components/motion'
import type { NamedItem } from '@/components/NamesReveal'

export function BarnIndex({ id, title, items }: { id?: string; title: string; items: NamedItem[] }) {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const rows = [...(list.current?.children ?? [])]
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(rows.indexOf(e.target))
    }, { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  const shown = items[active]
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-x-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <Lines lines={[title]} className="type-heading" />
          <ul ref={list} className="mt-12 border-t border-(--color-border)">
            {items.map((p, i) => (
              <li key={p.href} className="border-b border-(--color-border)">
                <Link
                  href={p.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block py-6 focus-visible:outline-none md:py-9"
                >
                  <span className="relative mb-5 block aspect-3/2 overflow-hidden rounded-media md:hidden">
                    <MediaAsset id={p.image} fill sizes="100vw" />
                  </span>
                  <h3 className={`type-display leading-none transition-[color,transform] duration-200 ease-out [font-size:clamp(2.5rem,5vw,4.75rem)] group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-8 motion-safe:group-hover:translate-x-2 ${i === active ? '' : 'md:text-(--color-muted)'}`}>
                    {p.title}
                  </h3>
                  <p className="type-utility mt-3 text-(--color-muted)">{p.kind}, {p.where}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <figure aria-hidden className="hidden self-start md:sticky md:top-[12svh] md:col-span-5 md:mt-24 md:block">
          <ImageReveal className="aspect-square">
            {items.map((p, i) => (
              <div key={p.href} className={`absolute inset-0 transition-[opacity,scale] duration-500 ease-out ${i === active ? 'scale-100 opacity-100' : 'opacity-0 motion-safe:scale-[1.04]'}`}>
                <MediaAsset id={p.image} fill sizes="(min-width: 1024px) 38vw, 42vw" alt="" />
              </div>
            ))}
          </ImageReveal>
          <figcaption className="type-utility mt-3 text-(--color-muted)">{shown.title}, {shown.where}</figcaption>
        </figure>
      </div>
    </section>
  )
}
