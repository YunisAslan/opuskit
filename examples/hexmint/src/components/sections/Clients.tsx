import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — Clients: real names only, set as type (no fake logos). The title is the chapter's // label.
export function ClientsSection({ title, names }: { title: string; names: string[] }) {
  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <h2><ChapterLabel>{title}</ChapterLabel></h2>
        <ul className="mt-8 grid grid-cols-2 border-l border-t border-(--color-border) md:grid-cols-4">
          {names.map((n, i) => <li key={n} data-reveal style={{ '--i': i % 4 } as React.CSSProperties} className="type-heading border-b border-r border-(--color-border) px-5 py-8 [font-size:clamp(1.05rem,1.6vw,1.35rem)]">{n}</li>)}
        </ul>
      </div>
    </section>
  )
}
