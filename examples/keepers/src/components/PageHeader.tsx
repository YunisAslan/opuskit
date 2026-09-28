import Lines from './Lines'

type Props = { title: string[]; mobile?: string[]; intro?: string; meta?: string }

// Opening block for every inner page: display headline, one intro paragraph, rule below.
export default function PageHeader({ title, mobile, intro, meta }: Props) {
  return (
    <header className="container-text pt-40 pb-16 md:pt-60 md:pb-24">
      <Lines as="h1" lines={title} mobile={mobile} className="type-display" />
      {(intro || meta) && (
        <div data-reveal className="mt-12 grid gap-6 border-t-2 border-border pt-6 md:grid-cols-12">
          {meta && <p className="type-utility text-muted md:col-span-3">{meta}</p>}
          {intro && <p className="type-body text-lg md:col-span-6 md:col-start-4">{intro}</p>}
        </div>
      )}
    </header>
  )
}
