// OpusKit section — About, `full`: a wide photo, the words in two columns under it. Fitted to Raster School, and the
// Instructor page's remembered moment: the name split to the two edges of the page, the space between left empty on
// purpose; under it the studio photo hung on columns 1–9 beside one flat white block that carries its caption (columns
// 10–12); then the statement and the bio on their column lines. Phones: the name still splits, the photo goes full
// width and the white block becomes its caption strip. Fades up once.
import { Section } from '@/components/site/SectionHead'
import { MediaAsset } from '@/components/site/MediaAsset'

export function AboutSection({ tone, first, last, label, since, caption, statement, bio }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'full'; first: string; last: string; label: string; since: string; caption: string; statement: string; bio: string
}) {
  return (
    <Section tone={tone} className="pt-[calc(var(--nav-top)+var(--nav-h)+clamp(56px,8vw,112px))]">
      <h1 className="raster type-display items-end [font-size:clamp(4.25rem,17vw,16rem)] leading-[0.82]">
        <span className="line-in col-span-2 sm:col-span-3 lg:col-span-6" style={{ '--i': 0 } as React.CSSProperties}>{first}</span>
        <span className="line-in col-span-2 pr-[0.03em] text-right sm:col-span-3 lg:col-span-6" style={{ '--i': 1 } as React.CSSProperties}>{last}</span>
      </h1>
      <div className="raster type-utility mt-[clamp(1.25rem,3.4vw,3.25rem)] border-t border-(--color-text) pt-3">
        <p className="col-span-2 sm:col-span-3 lg:col-span-6">{label}</p>
        <p className="col-span-2 text-right sm:col-span-3 lg:col-span-6">{since}</p>
      </div>

      <div className="raster mt-10 lg:mt-16">
        <MediaAsset id="about" sizes="(min-width: 1024px) 75vw, 100vw" eager className="col-span-4 sm:col-span-6 lg:col-span-9" />
        <div className="col-span-4 flex flex-col justify-end bg-(--inv-bg) p-4 text-(--inv-text) sm:col-span-6 lg:col-span-3 lg:p-5">
          <p className="type-caption">{caption}</p>
        </div>
      </div>

      <div data-reveal className="raster mt-10 gap-y-8 lg:mt-16">
        <p className="type-heading col-span-4 [font-size:clamp(1.5rem,3vw,2.75rem)] leading-[1.1] sm:col-span-6 lg:col-span-7">{statement}</p>
        <p className="type-body col-span-4 max-w-[58ch] text-(--color-muted) sm:col-span-5 lg:col-span-3 lg:col-start-10 lg:self-end">{bio}</p>
      </div>
    </Section>
  )
}
