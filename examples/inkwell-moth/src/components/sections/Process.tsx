// OpusKit section — Process: how working together goes, 3–5 real steps (numbered, because it is a real sequence).
// Each step can carry a print of that stage; the prints step down the page like pages laid on a table.
type Step = { name: string; text: string; duration?: string; image?: string; alt?: string }
export function ProcessSection({ title, intro, steps, spot }: { title: string; intro?: string; steps: Step[]; spot?: React.ReactNode }) {
  const tilt = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3']
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="rise md:ml-[30%] md:max-w-[52ch]">
          {spot}
          <h2 className="type-display mt-2 text-[clamp(2.4rem,5vw,4.4rem)]">{title}</h2>
          {intro && <p className="type-body mt-6">{intro}</p>}
        </div>
        <ol className="mt-16 grid gap-16 md:mt-24 md:grid-cols-4 md:gap-x-[1.5vw]">
          {steps.map((s, i) => (
            <li key={s.name} className={i % 2 ? 'md:mt-28' : ''}>
              {s.image && (
                <figure className={`taped bg-(--color-surface) p-2 shadow-[0_12px_26px_rgb(0_0_0/0.15)] ${tilt[i % 4]}`}>
                  <span className="clip block"><img src={s.image} alt={s.alt ?? ''} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" /></span>
                </figure>
              )}
              <div className="rise mt-8 border-t border-(--color-text) pt-5">
                <p className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)] leading-none">{i + 1}</p>
                <h3 className="type-heading mt-4 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
                <p className="type-body mt-2">{s.text}</p>
                {s.duration && <p className="type-utility mt-3 text-(--color-muted)">{s.duration}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
