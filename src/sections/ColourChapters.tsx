// OpusKit section — Colour Chapters: each offer is a chapter; its text sits on the neutral half, the other half is a
// full field in that chapter's colour (--color-chapter-1..3, the recipe's colour chapters) holding a sticky photo or clip.
export type Chapter = { eyebrow: string; title: string; text: string; media: { src: string; alt: string; video?: boolean }; sticker?: { src: string; alt: string } }

export function ColourChaptersSection({ chapters }: { chapters: Chapter[] }) {
  return (
    <section>
      {chapters.map((c, i) => (
        <article key={c.title} className="grid md:min-h-[140svh] md:grid-cols-2">
          <div className="md:order-2">
            <div className="grid place-items-center px-8 py-16 md:sticky md:top-0 md:h-svh md:px-14" style={{ background: `var(--color-chapter-${(i % 3) + 1}, var(--color-accent))` }}>
              {c.media.video
                ? <video src={c.media.src} autoPlay muted loop playsInline aria-label={c.media.alt} className="aspect-(--ratio-card) w-full max-w-[34rem] rounded-(--radius-media) object-cover" />
                : <img src={c.media.src} alt={c.media.alt} loading="lazy" className="aspect-(--ratio-card) w-full max-w-[34rem] rounded-(--radius-media) object-cover" />}
            </div>
          </div>
          <div className="relative grid content-start px-6 py-20 text-center md:sticky md:top-0 md:h-svh md:content-center md:px-16">
            {c.sticker && <img src={c.sticker.src} alt={c.sticker.alt} loading="lazy" className="absolute left-6 top-24 w-28 -rotate-6 md:left-10 md:w-36" />}
            <p className="type-utility">{c.eyebrow}</p>
            <h2 className="type-display mt-2 [font-size:clamp(3rem,7vw,6rem)]">{c.title}</h2>
            <p className="type-body mx-auto mt-5 max-w-[44ch]">{c.text}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
