import PageHeader from './PageHeader'

type Props = { title: string[]; updated: string; intro: string; sections: { h: string; p: string[] }[] }

// Plain text pages: heading in the left columns, prose in a 65ch column, rules between.
export default function LegalPage({ title, updated, intro, sections }: Props) {
  return (
    <>
      <PageHeader title={title} meta={`Last updated ${updated}`} intro={intro} />
      <div className="container-text pb-32 md:pb-40">
        {sections.map((s) => (
          <section key={s.h} className="grid gap-4 border-t border-border py-8 md:grid-cols-12 md:gap-6">
            <h2 className="type-heading text-2xl md:col-span-3">{s.h}</h2>
            <div className="flex flex-col gap-4 md:col-span-6 md:col-start-4">
              {s.p.map((p) => (
                <p key={p} className="type-body">{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
