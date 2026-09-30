import { LineReveal, Reveal } from '@/components/Reveal'

// Centred title card between chapters — interstitial text in the middle 8 of 12 columns.
export function TitleCard({ lines, mobile, line, as = 'h2' }: { lines: string[]; mobile?: string[]; line?: string; as?: 'h1' | 'h2' }) {
  return (
    <section className="px-6 py-32 md:py-40">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-6">
        <div className="col-span-12 text-center md:col-span-8 md:col-start-3">
          <LineReveal as={as} lines={lines} mobile={mobile} className="type-display [&>span]:items-center" />
          {line && <Reveal className="type-body mx-auto mt-8 max-w-[44ch] text-(--color-muted)"><p>{line}</p></Reveal>}
        </div>
      </div>
    </section>
  )
}
