// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio. The statement can be the
// page's h1; the portrait opens like a curtain.
import { ClipImage } from '@/components/motion'
import { TextEffect } from '@/components/pieces/TextEffect'

export function AboutSection({ title, image, alt, width, height, statement, bio, as = 'h2' }: {
  title: string; image: string; alt: string; width?: number; height?: number; statement: string; bio: string; as?: 'h1' | 'h2'
}) {
  return (
    <section className="section-y px-5 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto grid max-w-[1200px] items-end gap-10 md:grid-cols-12">
        <ClipImage src={image} alt={alt} width={width} height={height} drift className="aspect-[4/5] w-full md:col-span-5" />
        <div className="md:col-span-6 md:col-start-7">
          <p className="type-body max-w-[40ch]">{title}</p>
          <TextEffect as={as} className="type-display mt-4 text-balance [font-size:clamp(2.5rem,5.5vw,5rem)]">{statement}</TextEffect>
          <p className="type-body mt-6 max-w-[58ch] text-(--color-muted)">{bio}</p>
        </div>
      </div>
    </section>
  )
}
