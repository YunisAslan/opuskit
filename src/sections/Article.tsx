// OpusKit section — Article: one story, for reading. A title block (kicker, headline, a line under it, who and when), the
// lead picture across the page, then one calm reading column where pull quotes and pictures break out wider, and the
// author at the end. The page's h1 is the headline.
export type ArticleBlock = string | { quote: string; by?: string } | { image: string; alt: string; caption?: string }

export function ArticleSection({ tone, kicker, title, dek, author, date, image, body, tags }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; kicker?: string; title: string; dek?: string
  author: { name: string; role?: string; image?: string; bio?: string }; date: string
  image?: { src: string; alt: string; caption?: string }; body: ArticleBlock[]; tags?: string[]
}) {
  return (
    <article data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-[calc(var(--section-y)*0.7)]">
      <header className="mx-auto max-w-[56rem] text-center">
        {kicker && <p className="type-utility text-(--color-muted)">{kicker}</p>}
        <h1 className="type-display mt-4 text-balance [font-size:clamp(2.4rem,6vw,5.2rem)] leading-[1.02]">{title}</h1>
        {dek && <p className="type-body mx-auto mt-6 max-w-[52ch] text-balance [font-size:1.2rem] text-(--color-muted)">{dek}</p>}
        <p className="type-utility mt-6 text-(--color-muted)">{author.name}<span aria-hidden>{'  /  '}</span><time>{date}</time></p>
      </header>
      {image && (
        <figure className="mx-auto mt-12 max-w-(--container)">
          <img src={image.src} alt={image.alt} className="aspect-(--ratio-media) w-full rounded-(--radius-media) object-cover" />
          {image.caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{image.caption}</figcaption>}
        </figure>
      )}
      <div className="type-body mx-auto mt-14 max-w-[64ch] space-y-6 [font-size:1.125rem] leading-[1.7]">
        {body.map((b, i) => typeof b === 'string' ? <p key={i}>{b}</p> : 'quote' in b ? (
          <blockquote key={i} className="type-heading -mx-0 my-12 border-l-2 border-(--color-accent) pl-6 text-balance [font-size:clamp(1.5rem,3vw,2.3rem)] leading-[1.15] md:-mx-16">
            “{b.quote}”{b.by && <footer className="type-utility mt-4 text-(--color-muted)">{b.by}</footer>}
          </blockquote>
        ) : (
          <figure key={i} className="my-12 md:-mx-24">
            <img src={b.image} alt={b.alt} loading="lazy" className="w-full rounded-(--radius-media) object-cover" />
            {b.caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{b.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <footer className="mx-auto mt-16 flex max-w-[64ch] items-start gap-5 border-t border-(--color-border) pt-8">
        {author.image && <img src={author.image} alt="" className="size-16 shrink-0 rounded-full object-cover" />}
        <div>
          <p className="type-heading [font-size:1.2rem]">{author.name}</p>
          {author.role && <p className="type-utility text-(--color-muted)">{author.role}</p>}
          {author.bio && <p className="type-body mt-2 text-(--color-muted)">{author.bio}</p>}
          {tags && tags.length > 0 && <ul aria-label="Tags" className="type-utility mt-4 flex flex-wrap gap-2">{tags.map((t) => <li key={t} className="rounded-(--radius-button) border border-(--color-border) px-3 py-1">{t}</li>)}</ul>}
        </div>
      </footer>
    </article>
  )
}
