// OpusKit section — Manifesto: the point of view, display-size, spanning the grid. Lines are set by hand: each \n in
// `statement` is a line break (no auto-wrapped display text).
export function ManifestoSection({ statement, attribution }: { statement: string; attribution?: string }) {
  return (
    <section className="px-5 py-28 md:px-8 md:py-40">
      <blockquote className="mx-auto max-w-[1440px]">
        <p className="type-display [font-size:clamp(2.5rem,7vw,7rem)]">{statement.split('\n').map((l) => <span key={l} className="block">{l}</span>)}</p>
        {attribution && <footer className="type-utility mt-8 text-(--color-muted)">{attribution}</footer>}
      </blockquote>
    </section>
  )
}
