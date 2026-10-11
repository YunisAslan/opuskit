// OpusKit section — Menu: real HTML (readable, searchable, translatable), prices aligned. Three designs:
//   columns — the groups in two columns, a dotted leader to each price.
//   card    — a printed menu card: one narrow centred column, each dish over its line and price.
//   list    — the dishes set large on rules, the price at the end of the line, each group's name at the side.
export type MenuGroup = { name: string; items: { name: string; description?: string; price: string }[] }

export function MenuSection({ tone, variant = 'columns', title, groups, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'columns' | 'card' | 'list'; title: string; groups: MenuGroup[]; note?: string }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'card') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="type-heading">{title}</h2>
        {groups.map((g) => (
          <div key={g.name} className="mt-12">
            <h3 className="type-utility text-(--color-muted)">{g.name}</h3>
            <ul className="mt-6 space-y-6">
              {g.items.map((it) => (
                <li key={it.name}>
                  <p className="type-heading [font-size:1.2rem]">{it.name}</p>
                  {it.description && <p className="type-body mx-auto mt-1 max-w-[40ch] text-(--color-muted)">{it.description}</p>}
                  <p className="type-body mt-1 tabular-nums">{it.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {note && <p className="type-utility mt-12 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
  if (variant === 'list') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <div className="mt-12 space-y-14">
          {groups.map((g) => (
            <div key={g.name} className="grid gap-4 md:grid-cols-12">
              <h3 className="type-utility md:col-span-2 md:pt-3">{g.name}</h3>
              <ul className="border-t border-(--color-text) md:col-span-10">
                {g.items.map((it) => (
                  <li key={it.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-(--color-border) py-5">
                    <span className="type-display [font-size:clamp(1.4rem,3vw,2.5rem)] leading-[1.05]">{it.name}</span>
                    <span className="type-body tabular-nums">{it.price}</span>
                    {it.description && <span className="type-body col-span-2 mt-1 max-w-[56ch] text-(--color-muted)">{it.description}</span>}
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
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
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
