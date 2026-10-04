// OpusKit section — Clients: real names only, set as type (no fake logos).
export function ClientsSection({ title, names }: { title: string; names: string[] }) {
  return (
    <section className="px-5 pt-(--section-gap) md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-body text-(--color-muted)">{title}</h2>
        <ul className="mt-8 grid grid-cols-2 border-l border-t border-(--color-border) md:grid-cols-4">
          {names.map((n) => <li key={n} className="type-body border-b border-r border-(--color-border) px-5 py-8 font-bold">{n}</li>)}
        </ul>
      </div>
    </section>
  )
}
