// OpusKit section — Process: how working together goes, 3–5 real steps (numbered, because it is a real sequence).
export function ProcessSection({ title, steps }: { title: string; steps: { name: string; text: string; duration?: string }[] }) {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading">{title}</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
          {steps.map((s, i) => (
            <li key={s.name} className="border-t border-(--color-text) pt-5">
              <p className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{i + 1}</p>
              <h3 className="type-heading mt-4 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
              {s.duration && <p className="type-utility mt-3">{s.duration}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
