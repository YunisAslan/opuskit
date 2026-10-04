// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice. Three designs:
//   grid  — four small portraits to a row (a team of many).
//   large — two big portraits to a row, the line under each (a few founders or makers).
//   list  — a ruled list: a small portrait, then name, role and line on one row (people over pictures).
type Person = { name: string; role: string; line?: string; image: string; alt: string }

export function TeamSection({ tone, variant = 'grid', title, people }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'grid' | 'large' | 'list'; title: string; people: Person[] }) {
  const t = tone === 'ground' ? undefined : tone
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading [font-size:clamp(1.6rem,3vw,2.6rem)]">{title}</h2>
        {variant === 'list' ? (
          <ul className="mt-10 border-t border-(--color-border)">
            {people.map((p) => (
              <li key={p.name} className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b border-(--color-border) py-5 md:grid-cols-[auto_1fr_1fr_2fr]">
                <img src={p.image} alt={p.alt} loading="lazy" className="size-14 rounded-(--radius-media) object-cover max-md:row-span-2 md:size-16" />
                <p className="type-heading [font-size:clamp(1.15rem,1.8vw,1.5rem)]">{p.name}</p>
                <p className="type-utility text-(--color-muted) max-md:hidden">{p.role}</p>
                <p className="type-body text-(--color-muted)">{p.line ?? p.role}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={`mt-10 grid gap-x-5 gap-y-10 ${variant === 'large' ? 'md:grid-cols-2 md:gap-x-8' : 'grid-cols-2 md:grid-cols-4'}`}>
            {people.map((p) => (
              <li key={p.name}>
                <img src={p.image} alt={p.alt} loading="lazy" className="aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover" />
                <p className={variant === 'large' ? 'type-heading mt-5 [font-size:clamp(1.3rem,2.2vw,1.9rem)]' : 'type-body mt-4 font-medium'}>{p.name}</p>
                <p className="type-utility text-(--color-muted)">{p.role}</p>
                {p.line && <p className={`type-body mt-2 text-(--color-muted) ${variant === 'large' ? 'max-w-[44ch]' : ''}`}>{p.line}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
