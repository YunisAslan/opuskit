// OpusKit section — Clients: real names only, set as type (no fake logos) — here as typed labels pinned up unevenly.
export function ClientsSection({ title, names, note }: { title: string; names: string[]; note?: string }) {
  const tilt = ['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3']
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px] md:pl-[12%]">
        <h2 className="type-heading">{title}</h2>
        {note && <p className="type-body mt-3 max-w-[52ch] text-(--color-muted)">{note}</p>}
        <ul className="rise mt-10 flex flex-wrap gap-x-4 gap-y-5 md:max-w-[80%]">
          {names.map((n, i) => <li key={n} className={`type-heading border border-(--color-text)/25 bg-(--color-surface) px-5 py-3 [font-size:clamp(1rem,1.5vw,1.3rem)] ${tilt[i % tilt.length]}`}>{n}</li>)}
        </ul>
      </div>
    </section>
  )
}
