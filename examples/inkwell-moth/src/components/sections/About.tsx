import type { ReactNode } from 'react'
// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio; `children` for the prints
// that sit under the bio.
export function AboutSection({ title, as: H = 'h2', image, alt, caption, statement, bio, children }: { title: string; as?: 'h1' | 'h2'; image: string; alt: string; caption?: string; statement: string; bio: ReactNode; children?: ReactNode }) {
  return (
    <section className="px-5 pb-24 pt-12 md:px-10 md:pb-40 md:pt-24">
      <div className="mx-auto grid max-w-[1440px] items-start gap-12 md:grid-cols-12 md:gap-x-[1vw]">
        <figure className="taped bg-(--color-surface) p-2 shadow-[0_14px_30px_rgb(0_0_0/0.16)] md:col-span-5 md:-rotate-2 md:p-3">
          <span className="clip block"><img src={image} alt={alt} className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" /></span>
          {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <H className="type-display text-[clamp(2.8rem,7vw,6.5rem)]">{title}</H>
          <div className="rise">
            <p className="type-heading mt-8 text-balance [font-size:clamp(1.4rem,2.6vw,2.2rem)]">{statement}</p>
            <div className="type-body mt-6 max-w-[58ch] space-y-4">{bio}</div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
