import { BookingForm } from '@/components/forms/BookingForm'
import { GallerySection } from '@/components/sections/Gallery'
import { HeroFilm } from '@/components/sections/HeroFilm'
import { heroFilms, playableFilms } from '@/config/media-files'
import { LocationSection } from '@/components/sections/Location'
import { PricingSection } from '@/components/sections/Pricing'
import { ReservationSection } from '@/components/sections/Reservation'
import { ServicesSection } from '@/components/sections/Services'
import { StepsSection } from '@/components/sections/Steps'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { brand, gallery, howItWorks, location, pricing, reservation, services, testimonials } from '@/content/site'

// Home: Hero → Services → How It Works → Gallery → Testimonials → Pricing → Location → Reservation.
// The one unforgettable moment is the opening film; everything after it stays quiet and in step.
export default function Home() {
  return (
    <>
      <HeroFilm films={heroFilms()} />
      <ServicesSection title={services.title} items={services.items} />
      <StepsSection variant="cards" title={howItWorks.title} steps={howItWorks.steps} />
      <GallerySection title={gallery.title} stories={gallery.stories} labels={gallery} playable={playableFilms()} />
      <TestimonialsSection tone="surface" title={testimonials.title} quotes={testimonials.quotes} />
      <PricingSection title={pricing.title} plans={pricing.plans} note={pricing.note} recommended={pricing.recommended} />
      <LocationSection
        title={location.title} address={brand.address} hours={location.hours} notes={location.notes} mapUrl={brand.mapUrl} phone={brand.phone}
        image="locationHomeArrival" alt={location.arrivalAlt} inside="locationHomeInside" insideAlt={location.insideAlt} labels={{ map: location.map, call: location.call }}
      />
      <ReservationSection
        id="reserve" title={reservation.title} text={reservation.text} hours={reservation.hours} phone={brand.phone} phoneLead={reservation.phoneLead}
        form={<BookingForm />}
      />
    </>
  )
}
