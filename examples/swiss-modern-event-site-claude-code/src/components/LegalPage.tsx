import { SectionHeader } from "@/components/SectionHeader"

export type LegalSection = { h: string; p: string[] }

// Draft legal copy — to be reviewed by the owner's counsel before launch.
export function LegalPage({ label, lines, updated, sections }: { label: string; lines: string[]; updated: string; sections: LegalSection[] }) {
  return (
    <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
      <SectionHeader as="h1" label={label} lines={lines} />
      <div className="grid-page mt-16 lg:mt-24">
        <p className="type-utility col-span-4 mb-10 text-muted sm:col-span-6 lg:col-span-3 lg:mb-0">Last updated {updated}</p>
        <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-4">
          {sections.map((s) => (
            <section key={s.h} className="border-t border-border py-8 first:border-text">
              <h2 className="type-heading">{s.h}</h2>
              {s.p.map((t, i) => (
                <p key={i} className="mt-4 max-w-[36rem]">{t}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
