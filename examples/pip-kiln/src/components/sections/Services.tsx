// OpusKit section — Services, "big": each service name set large in the display face, its line small beside it, rules
// between. Pip & Kiln: the page's h1 opens the section; a hovered row lights up on the surface colour.
import { Cut } from '@/components/motion/Cut'
import { SectionHead } from '@/components/parts/SectionHead'

type Service = { name: string; line: string }

export function ServicesSection({ intro, title, items }: { intro: { title: string; lines: string[]; mobileLines?: string[]; line: string }; title: string; items: Service[] }) {
  return (
    <section className="px-(--gutter) pb-(--section-y) pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container)">
        <SectionHead as="h1" text={intro.title} lines={intro.lines} mobile={intro.mobileLines} line={intro.line} />
        <h2 className="t-action mt-20 md:mt-28">{title}</h2>
        <Cut as="ul" className="mt-5 border-t border-(--color-text)">
          {items.map((s) => (
            <li key={s.name} className="relative grid gap-2 border-b border-(--color-text)/25 py-6 before:absolute before:inset-x-0 before:inset-y-1.5 before:rounded-(--radius-card) before:bg-(--color-surface) before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-100 md:grid-cols-12 md:items-center md:gap-6 md:px-6 md:py-7 [&>*]:relative">
              <h3 className="type-display leading-[0.9] [font-size:clamp(2.4rem,6.4vw,6rem)] md:col-span-7">{s.name}</h3>
              <p className="type-body max-w-[38ch] md:col-span-4 md:col-start-9">{s.line}</p>
            </li>
          ))}
        </Cut>
      </div>
    </section>
  )
}
