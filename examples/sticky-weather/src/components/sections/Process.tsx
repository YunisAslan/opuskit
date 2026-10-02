// OpusKit section — Process: how working together goes, 3–5 real steps (numbered, because it is a real sequence).
// `ground`/`ink` make it a colour chapter: a full field in one chapter colour. Steps arrive in order.
import { Reveal } from '@/components/motion'

export function ProcessSection({ title, eyebrow, steps, ground, ink }: { title: string; eyebrow?: string; steps: { name: string; text: string; duration?: string }[]; ground?: string; ink?: string }) {
  return (
    <section className="field-y px-5 md:px-6" style={{ backgroundColor: ground, color: ink }}>
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        <h2 className="type-heading mt-3">{title}</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="border-t border-current pt-5">
                <p className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{i + 1}</p>
                <h3 className="type-heading mt-4 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
                <p className="type-body mt-2 opacity-90">{s.text}</p>
                {s.duration && <p className="type-utility mt-3">{s.duration}</p>}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
