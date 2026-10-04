import type { Metadata } from 'next'
import Link from 'next/link'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { Reveal } from '@/components/motion/Reveal'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { ClientsSection } from '@/components/sections/Clients'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { GallerySection } from '@/components/sections/Gallery'
import { assets } from '@/config/assets'
import { madeFor, works } from '@/content/site'

export const metadata: Metadata = {
  title: 'Works',
  description: 'Wind Archive, Machine Hymns, Rain, Caspian, Room Tone and Night Shift: records, a planetarium piece, a bathhouse installation and a live set by Sela Mor.',
}

const captions = ['Absheron, wheat in March', 'Grass at Nardaran', 'Rain on the harbour', 'The Caspian at night', 'The tool plant, Bayil', 'A gear housing, Bayil', 'Rig at Depo 21', 'Night Shift, Tbilisi']

export default function Works() {
  return (
    <>
      <section className="pt-36 md:pt-44">
        <ChapterWord word="Works" as="h1" />
        <FeaturedWorkSection link={Link} title="Five works"
          projects={works.map((w) => ({ id: w.slug, title: w.title, meta: w.kind, year: w.year, text: w.text, image: w.image.src, alt: w.image.alt, href: `/listen#${w.slug}`, link: `Hear ${w.title}` }))} />
      </section>

      <section className="pt-(--section-gap)">
        <ChapterWord word="Room" side="right" />
        <CaseStudySection link={Link} title="Room Tone, an empty bathhouse that plays itself"
          image={assets.stage.src} alt="Room Tone: the dark main hall of the bathhouse, one figure at the console and the empty benches lit beside him"
          detail={{ src: assets.workRoom.src, alt: 'One of the twelve speakers, its cone bare', caption: 'One of twelve speakers hidden in the cold rooms' }}
          facts={[
            { label: 'Commissioned by', value: 'Hamam Days Festival' },
            { label: 'Place', value: 'Gulbala bathhouse, Icherisheher' },
            { label: 'Her role', value: 'Composer and sound design' },
            { label: 'Open', value: '41 days, 2025' },
          ]}
          paragraphs={[
            'The festival asked for a piece for a bathhouse that has been closed and dry since the 1980s. Any music brought in from outside sounded like a visitor; the building already had a voice of its own, it was just too quiet to hear.',
            'Sela measured the resonance of every room with a single sine sweep, then fed each room its own tone back through twelve speakers hidden behind the stone. Microphones in the domes listened, and the system answered what it heard, so footsteps and voices of visitors became part of the piece.',
            'Eleven thousand people came in 41 days, most of them more than once. The bathhouse opens again with Room Tone from 5 December, every day from noon until seven.',
          ]}
          href="/listen#room-tone" />
      </section>

      <section className="pt-(--section-gap)">
        <ChapterWord word="Field" />
        <GallerySection title="Where the sounds come from: wind, water, machines and rooms. Tap any photo to open it large."
          photos={assets.gallery.map((p, i) => ({ ...p, caption: captions[i] }))} />
      </section>

      <Reveal>
        <ClientsSection title="Made for and with" names={madeFor} />
      </Reveal>
    </>
  )
}
