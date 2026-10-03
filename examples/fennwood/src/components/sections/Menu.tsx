// OpusKit section — Menu: real HTML (readable, searchable, translatable) in two columns, prices aligned.
// Fennwood: the title is a node (chapter title), an optional switcher (tabs) sits beside it, and items can name a
// preview photo (data-preview) for the hover media preview.
import type { ReactNode } from 'react'

export type MenuGroup = { name: string; items: { name: string; description?: string; price: string; image?: string }[] }

export function MenuGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.name}>
          <h3 className="type-utility border-b border-(--color-text) pb-3">{g.name}</h3>
          <ul>
            {g.items.map((it) => (
              <li key={it.name} data-preview={it.image} className="border-b border-(--color-border) py-4">
                <p className="flex items-baseline gap-3"><span className="type-heading [font-size:1.15rem]">{it.name}</span><span aria-hidden className="flex-1 border-b border-dotted border-(--color-muted)/40" /><span className="type-body tabular-nums">{it.price}</span></p>
                {it.description && <p className="type-body mt-1 max-w-[50ch] text-(--color-muted)">{it.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function MenuSection({ id, title, groups = [], note, switcher, children }: { id?: string; title: ReactNode; groups?: MenuGroup[]; note?: ReactNode; switcher?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6">{title}{switcher}</div>
        <div className="mt-12">{children ?? <MenuGroups groups={groups} />}</div>
        {note && <div className="type-utility mt-10 max-w-[65ch] text-(--color-muted)">{note}</div>}
      </div>
    </section>
  )
}
