// OpusKit section — Manifesto: the point of view, display-size, spanning the grid.
export function ManifestoSection({ statement, attribution }: { statement: string; attribution?: string }) {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <blockquote className="mx-auto max-w-[1440px]">
        <p className="type-display text-balance [font-size:clamp(2.5rem,7vw,7rem)]">{statement}</p>
        {attribution && <footer className="type-utility mt-8 text-(--color-muted)">{attribution}</footer>}
      </blockquote>
    </section>
  )
}
