// OpusKit section — How It Works: 3–4 steps with a real visual each, side by side on desktop.
export function HowItWorksSection({ title, steps }: { title: string; steps: { name: string; text: string; image?: string; alt?: string }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading max-w-[24ch]">{title}</h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.name} className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-card)">
              {s.image && <img src={s.image} alt={s.alt ?? ''} loading="lazy" className="mb-5 aspect-[4/3] w-full rounded-(--radius-media) object-cover" />}
              <p className="type-utility text-(--color-accent)">Step {i + 1}</p>
              <h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
