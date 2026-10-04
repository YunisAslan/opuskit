// OpusKit section — Menu: real HTML (readable, searchable, translatable) in two columns, prices aligned.
export type MenuGroup = { name: string; items: { name: string; description?: string; price: string }[] }

export function MenuSection({ tone, title, groups, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; groups: MenuGroup[]; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="type-utility border-b border-(--color-text) pb-3">{g.name}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it.name} className="border-b border-(--color-border) py-4">
                    <p className="flex items-baseline gap-3"><span className="type-heading [font-size:1.15rem]">{it.name}</span><span aria-hidden className="flex-1 border-b border-dotted border-(--color-border)" /><span className="type-body tabular-nums">{it.price}</span></p>
                    {it.description && <p className="type-body mt-1 max-w-[50ch] text-(--color-muted)">{it.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && <p className="type-utility mt-10 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
