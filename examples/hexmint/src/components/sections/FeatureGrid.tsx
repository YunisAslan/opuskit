import { TextEffect } from '@/components/pieces/TextEffect'
import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — Features: 3–6 capabilities in concrete language. With no photos, each module's visual is its real
// number, set large in tabular figures. Signature moment "Labels that decode": every // label resolves out of random
// characters on first view, over a hairline grid (no grid under 640px).
export function FeatureGridSection({ title, label, features, lead = false }: { title: string; label?: string; lead?: boolean; features: { name: string; text: string; label?: string; stat?: string; unit?: string; image?: string; alt?: string }[] }) {
  return (
    <section className={`console-grid-soft px-6 md:pb-32 ${lead ? 'pt-40 pb-24 md:pt-48' : 'py-24 md:pt-32'}`}>
      <div className="mx-auto max-w-[1440px]">
        {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
        <TextEffect as={lead ? 'h1' : 'h2'} className={`${lead ? 'type-display max-w-[14ch]' : 'type-heading max-w-[24ch]'}`}>{title}</TextEffect>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.name} data-reveal style={{ '--i': i } as React.CSSProperties} className="flex flex-col bg-(--color-background) p-6 md:aspect-[4/3] md:p-8 xl:aspect-auto xl:min-h-[22rem]">
              {f.label && <ChapterLabel>{f.label}</ChapterLabel>}
              {f.image && <img src={f.image} alt={f.alt ?? ''} loading="lazy" className="mt-6 aspect-[16/10] w-full rounded-(--radius-media) object-cover" />}
              {f.stat && <p className="mt-8 flex items-baseline gap-3"><span className="type-display tabular-nums [font-size:clamp(2.75rem,4.5vw,4rem)]">{f.stat}</span><span className="type-utility text-(--color-muted)">{f.unit}</span></p>}
              <h3 className="type-heading mt-auto pt-10 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{f.name}</h3>
              <p className="type-body mt-2 max-w-[42ch] text-(--color-muted)">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
