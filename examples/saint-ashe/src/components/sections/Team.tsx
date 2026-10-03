// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice.
export function TeamSection({ title, people }: { title: string; people: { name: string; role: string; line?: string; image: string; alt: string }[] }) {
  return (
    <section data-reveal className="px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading [font-size:clamp(1.6rem,3vw,2.6rem)]">{title}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
          {people.map((p) => (
            <li key={p.name}>
              <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" />
              <p className="type-body mt-4 font-medium">{p.name}</p>
              <p className="type-utility text-(--color-muted)">{p.role}</p>
              {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
