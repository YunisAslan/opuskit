import Link from 'next/link'
import { IntroSection } from '@/components/sections/Intro'
import { ScheduleSection } from '@/components/sections/Schedule'
import { TeamSection } from '@/components/sections/Team'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { ReservationSection } from '@/components/sections/Reservation'
import { Button } from '@/components/ui/button'
import { FaqAccordion } from '@/components/site/Faqs'
import { FilmStop } from '@/components/site/FilmStop'
import { InView } from '@/components/site/InView'
import { Opener } from '@/components/site/Opener'
import { RsvpForm } from '@/components/site/RsvpForm'
import { StatusLine } from '@/components/site/StatusLine'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'
import { scenes } from '@/config/scenes'
import { faqSets, intro, location, mapUrl, people, reservation, schedule } from '@/content/site'
import { EVENT } from '@/lib/event'

const [programme, players, hangar, wayIn] = scenes
const ground = 'bg-(--color-background)/85'

function RsvpRow({ note }: { note: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
      <Button asChild size="lg" className="type-body"><Link href="/rsvp">RSVP</Link></Button>
      <span className="type-utility text-(--color-muted)">{note}</span>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Stop id="the-tunnel" name="The tunnel" film>
        <Opener
          title="Three nights in the hangar"
          lead="Silent films with live scores, on the Absheron coast. 12–14 June 2027."
          card={{ name: 'The tunnel', text: 'Scroll to walk. The film moves with you, all the way to the hangar door.' }}
        >
          <RsvpRow note="12–14 June, entry free" />
        </Opener>
        <div className={ground}>
          <InView className="rise"><IntroSection {...intro} /></InView>
        </div>
      </Stop>

      <Stop id="the-programme" name="The programme" film>
        <FilmStop scene={programme} />
        <div id="programme" className={`${ground} scroll-mt-16`}>
          <InView className="rise"><ScheduleSection title="The nights, hour by hour" days={schedule} /></InView>
          <div className="px-5 pb-24 md:px-10 md:pb-32">
            <div className="mx-auto max-w-[1440px] border-t border-(--color-border)"><RsvpRow note="Saturday 12 to Monday 14 June 2027, doors 19:00" /></div>
          </div>
        </div>
      </Stop>

      <Stop id="the-players" name="The players" film>
        <FilmStop scene={players} />
        <div id="players" className={`${ground} scroll-mt-16`}>
          <InView className="clip">
            <TeamSection title="Who plays, and when" people={people.map((p) => ({ ...p, image: assets[p.image].src, alt: assets[p.image].alt }))} />
          </InView>
        </div>
      </Stop>

      <Stop id="the-hangar" name="The hangar" film>
        <FilmStop scene={hangar} />
        <div className={ground}>
          <InView className="clip">
            <LocationSection {...location} mapUrl={mapUrl} image={assets.location.src} alt={assets.location.alt} />
          </InView>
        </div>
      </Stop>

      <Stop id="questions" name="Questions">
        <FaqSection title="Before you come">
          <FaqAccordion items={faqSets.home} />
          <Link href="/faq" className="type-utility mt-6 inline-flex min-h-11 items-center underline underline-offset-[6px] hover:text-(--color-muted)">All nine questions</Link>
        </FaqSection>
      </Stop>

      <Stop id="the-way-in" name="The way in" film>
        <FilmStop scene={wayIn}><StatusLine className="mt-3 whitespace-normal" /></FilmStop>
        <div id="rsvp" className={`${ground} scroll-mt-16`}>
          <ReservationSection {...reservation} phone={EVENT.phone} form={<RsvpForm />} />
        </div>
      </Stop>
    </>
  )
}
