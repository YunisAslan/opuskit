import type { Metadata } from 'next'
import MediaAsset from '@/components/MediaAsset'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'About' }

const founders = [
  {
    id: 'founderOne' as const,
    name: 'Marco Ferri',
    role: 'Co-founder, coffee',
    bio: 'Marco spent nine years roasting for speciality cafés in London. He built the cold-brew rig in our unit from two brewery fermenters and a pond pump, and still tastes every batch before it is canned.',
  },
  {
    id: 'founderTwo' as const,
    name: 'Lena Aydin',
    role: 'Co-founder, drinks',
    bio: 'Lena ran the bar at a Hackney wine shop and spent two summers on the Amalfi coast learning to cure citrus. She wrote the recipe that became Keepers on the back of a delivery note in 2023.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={['Two people,', 'one fridge,', 'eleven recipes.']}
        mobile={['Two', 'people,', 'one fridge,', 'eleven', 'recipes.']}
        meta="Hackney Wick, since 2023"
        intro="Keepers started because we wanted an afternoon coffee that was cold, fizzy and not a sugar bomb. Nobody made one we liked, so we spent a year making eleven versions in a shared kitchen. Number eleven is in the can."
      />
      <section aria-label="About" className="container-text pb-32 md:pb-40">
        <div className="grid gap-12 md:grid-cols-2 md:gap-6">
          {founders.map((f) => (
            <article key={f.name} className="flex flex-col gap-6 border-t-2 border-border pt-6">
              <div data-clip className="relative aspect-[4/5] overflow-hidden bg-text">
                <MediaAsset id={f.id} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div data-reveal className="flex flex-col gap-2">
                <h2 className="type-heading">{f.name}</h2>
                <p className="type-utility text-muted">{f.role}</p>
                <p className="type-body mt-2">{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <blockquote data-reveal className="mt-32 grid gap-6 border-t-2 border-border pt-6 md:grid-cols-12">
          <p className="type-heading md:col-span-8">
            “We make one drink. If we ever make a second, it will be because the first one is finished.”
          </p>
          <footer className="type-utility text-muted md:col-span-3 md:col-start-10">Lena Aydin</footer>
        </blockquote>
      </section>
    </>
  )
}
