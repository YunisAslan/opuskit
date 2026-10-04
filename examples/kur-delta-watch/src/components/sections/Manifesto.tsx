// OpusKit section — Manifesto: the point of view, display-size, spanning the grid.
// `statement` as lines: each one is masked and rises in turn (line-by-line headline reveal).
export function ManifestoSection({ statement, attribution }: { statement: string | string[]; attribution?: string }) {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <blockquote className="mx-auto max-w-[1440px]">
        <p data-lines className="type-display text-balance [font-size:clamp(2rem,8.4vw,7rem)] md:[font-size:clamp(2.5rem,7vw,7rem)]">{Array.isArray(statement) ? statement.map((l) => <span key={l} className="line-mask"><span className="line">{l}</span></span>) : statement}</p>
        {attribution && <footer className="type-utility mt-8 text-(--color-muted)">{attribution}</footer>}
      </blockquote>
    </section>
  )
}
