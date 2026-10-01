// OpusKit section — Integrations: the tools it connects to, set as type (no borrowed logos), with an optional line.
export function IntegrationsSection({ title, text, tools }: { title: string; text?: string; tools: string[] }) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading text-balance">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[40ch] text-(--color-muted)">{text}</p>}
        </div>
        <ul className="grid grid-cols-2 self-start border-l border-t border-(--color-border) sm:grid-cols-3 md:col-span-8">
          {tools.map((t) => (
            <li key={t} className="type-body flex items-center gap-3 border-b border-r border-(--color-border) px-4 py-5 md:px-5 md:py-6">
              <span aria-hidden className="type-utility grid size-9 shrink-0 place-items-center rounded-(--radius-button) bg-(--color-surface)">{t[0]}</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
