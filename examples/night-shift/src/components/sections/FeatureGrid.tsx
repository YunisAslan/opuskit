import type { ReactNode } from 'react'
// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual when there is one.
// `label` opens each block (a decoding // label on Curriculum), `details` follows the text.
type Feature = { name: string; text: string; image?: string; alt?: string; label?: ReactNode; details?: ReactNode }

export function FeatureGridSection({ title, intro, features }: { title: string; intro?: string; features: Feature[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 md:grid-cols-12">
          <h2 className="type-heading max-w-[24ch] md:col-span-6">{title}</h2>
          {intro && <p className="type-body max-w-[52ch] text-(--color-muted) md:col-span-5 md:col-start-8">{intro}</p>}
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-4">
          {features.map((f) => (
            <li key={f.name} className="flex flex-col bg-(--color-background) p-6">
              {f.label && <div className="mb-4">{f.label}</div>}
              {f.image && <img src={f.image} alt={f.alt ?? ''} loading="lazy" width={1600} height={1000} className="mb-6 aspect-[16/10] w-full rounded-(--radius-media) object-cover" />}
              <h3 className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{f.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{f.text}</p>
              {f.details}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
