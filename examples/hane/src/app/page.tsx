import { BookingForm } from '@/components/BookingForm'
import { Hero } from '@/components/Hero'
import { Lines } from '@/components/Lines'
import { MediaAsset } from '@/components/MediaAsset'
import { Prices } from '@/components/Prices'
import { SiteLink } from '@/components/SiteLink'
import { StatusLine } from '@/components/StatusLine'
import { Stops } from '@/components/Stops'
import { HowItWorksSection } from '@/components/sections/HowItWorks'
import { LocationSection } from '@/components/sections/Location'
import { ReservationSection } from '@/components/sections/Reservation'
import { ServicesSection } from '@/components/sections/Services'
import { TeamSection } from '@/components/sections/Team'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { site } from '@/config/site'
import { quotes, reservation, services, team } from '@/content'
import { HOURS_LINES } from '@/lib/hours'

export default function Home() {
  const fill = 'h-full w-full object-cover'
  return (
    <Stops items={[
      { name: 'Room 2', still: true, node: <Hero /> },
      { name: 'What we treat', node: <ServicesSection link={SiteLink} title="What we treat" items={services.map((s) => ({ ...s, href: '/treatments' }))} /> },
      { name: 'Three visits', node: (
        <HowItWorksSection
          title={<Lines lines={['What happens', 'when you come in']} className="type-heading [font-size:clamp(2rem,4vw,3.5rem)]" />}
          intro="Most courses are three to six visits over about six weeks. Each one has the same shape: we listen, we treat, and you leave with something to do at home."
          steps={[
            { name: 'We listen', text: 'Your first hour is mostly talking and testing: where it hurts, when, and what you want to be able to do again.', caption: 'The front room, first visit', media: <MediaAsset id="step1" sizes="(min-width: 768px) 58vw, 100vw" className={fill} /> },
            { name: 'We treat', text: 'Hands-on work, slow and specific, to ease what is stiff or sore so that movement can come back.', caption: 'Room 2, a treatment', media: <MediaAsset id="step2" sizes="(min-width: 768px) 58vw, 100vw" className={fill} /> },
            { name: 'You keep it going', text: 'Two or three exercises, ten minutes a day on your own floor. That is the part that stops it coming back.', caption: 'Your floor, any morning', media: <MediaAsset id="step3" sizes="100vw" className={`${fill} object-[78%_50%]`} /> },
          ]} />
      ) },
      { name: 'The people', node: <TeamSection title="The people who treat you" intro="Three of us, one at each visit, the same one each time unless you ask to change." people={team.map((p) => ({ ...p, media: <MediaAsset id={p.media} sizes="(min-width: 768px) 30vw, 50vw" /> }))} /> },
      { name: 'In their words', node: <TestimonialsSection title="In their words" quotes={quotes} /> },
      { name: 'Prices', node: <Prices /> },
      { name: 'The way in', still: true, node: (
        <LocationSection link={SiteLink} title="The way in" address={site.address} hours={[]} notes={site.transit} mapUrl={site.mapUrl} phone={site.phone} tel={site.tel}
          media={<MediaAsset id="location" />}
          intro="Three stops between the street and the table. Scroll through them before your first visit and nothing will be new when you arrive."
          stops={[
            { name: 'The door', line: 'Two dark wooden doors between the yuccas on Calder Mews. Ring once; we come down for you.', media: <MediaAsset id="location" />, action: { label: 'Open in maps', href: site.mapUrl } },
            { name: 'The front room', line: 'Shoes off, a glass of water and a chair. Your first visit starts here, sitting down and talking.', media: <MediaAsset id="step1" />, action: { label: 'What a first visit is', href: '/treatments' } },
            { name: 'Room 2', line: 'Where the hands-on work happens. Wear something loose; there is a blanket if you get cold.', media: <MediaAsset id="hero" className="object-[50%_60%]" />, action: { label: 'Book a time in this room', href: '#your-time' } },
          ]} />
      ) },
      { name: 'Your time', node: <ReservationSection title={reservation.title} text={reservation.text} hours={HOURS_LINES} phone={site.phone} tel={site.tel} status={<StatusLine />} form={<BookingForm />} /> },
    ]} />
  )
}
