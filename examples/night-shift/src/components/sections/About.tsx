import type { ReactNode } from 'react'
// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio; `children` (credits, a link) under the bio.
export function AboutSection({ title, image, alt, statement, bio, children }: { title: string; image: string; alt: string; statement: string; bio: string; children?: ReactNode }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-start gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" width={1590} height={2400} className="aspect-[4/5] w-full rounded-(--radius-media) object-cover md:col-span-5" />
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="type-utility text-(--color-muted)">{title}</h2>
          <p className="type-heading mt-4 text-balance [font-size:clamp(1.5rem,3vw,2.6rem)]">{statement}</p>
          <p className="type-body mt-6 max-w-[58ch] text-(--color-muted)">{bio}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
