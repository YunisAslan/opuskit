// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio.
export function AboutSection({ title, image, alt, statement, bio }: { title: string; image: string; alt: string; statement: string; bio: string }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) border-2 border-(--color-border) object-cover md:col-span-5" />
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="type-utility text-(--color-muted)">{title}</h2>
          <p className="type-heading mt-4 text-balance [font-size:clamp(1.5rem,3vw,2.6rem)]">{statement}</p>
          <p className="type-body mt-6 max-w-[58ch] text-(--color-muted)">{bio}</p>
        </div>
      </div>
    </section>
  )
}
