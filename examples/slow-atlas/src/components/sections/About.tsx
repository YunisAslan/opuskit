import { CutReveal } from '@/components/pieces/CutReveal'
// OpusKit section — About: a real face and a point of view. Picture, statement, short bio.
export function AboutSection({ title, image, alt, statement, bio }: { title: string; image: string; alt: string; statement: string; bio: string[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="grid items-start gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover md:col-span-4" />
        <div className="md:col-span-7 md:col-start-6">
          <CutReveal className="type-heading">{title}</CutReveal>
          <p className="type-heading mt-6 max-w-[24ch] text-balance [font-size:clamp(1.6rem,3.2vw,2.8rem)] [line-height:1.1]">{statement}</p>
          <div className="type-body mt-8 max-w-[60ch] space-y-5">{bio.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </div>
    </section>
  )
}
