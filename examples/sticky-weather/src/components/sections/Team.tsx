// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice.
// Each portrait is stuck on at its own slight angle and lifts like a peeling sticker under the hand.
import { ClipImage } from '@/components/motion'

const tilt = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export function TeamSection({ title, eyebrow, people }: { title: string; eyebrow?: string; people: { name: string; role: string; line?: string; image: string; alt: string }[] }) {
  return (
    <section className="section-y px-5 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        <h2 className="type-heading mt-3 [font-size:clamp(1.6rem,3vw,2.6rem)]">{title}</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {people.map((p, i) => (
            <li key={p.name} className={`group ${i === 2 ? 'col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full' : ''}`}>
              <div className={`border-[6px] border-(--color-paper) transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-[1.03] motion-reduce:transition-none ${tilt[i % tilt.length]}`}>
                <ClipImage src={p.image} alt={p.alt} className="aspect-[4/5] w-full" />
              </div>
              <p className="type-heading mt-5 [font-size:1.25rem]">{p.name}</p>
              <p className="type-utility text-(--color-muted)">{p.role}</p>
              {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
