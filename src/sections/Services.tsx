// OpusKit section — Services: what you offer, one row each, with rules between; the hovered row lifts.
export function ServicesSection({ title, items }: { title: string; items: { name: string; line: string; href?: string }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <ul className="border-t border-(--color-border) md:col-span-8">
          {items.map((s) => (
            <li key={s.name} className="group grid gap-2 border-b border-(--color-border) py-6 transition-colors hover:bg-(--color-surface) md:grid-cols-2 md:px-4">
              <h3 className="type-heading [font-size:clamp(1.25rem,2vw,1.75rem)]">{s.href ? <a href={s.href} className="hover:underline hover:underline-offset-4">{s.name}</a> : s.name}</h3>
              <p className="type-body text-(--color-muted)">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
