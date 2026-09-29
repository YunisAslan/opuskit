import type { Metadata } from "next"
import { ReservationForm } from "@/components/ReservationForm"
import { SectionHeader } from "@/components/SectionHeader"
import { ClipReveal, Reveal } from "@/components/Reveal"
import { MediaAsset } from "@/components/MediaAsset"
import { site } from "@/config/site"

export const metadata: Metadata = { title: "RSVP", description: `Reply for ${site.event}, ${site.dates}.` }

export default function RSVPPage() {
  return (
    <>
      {/* Reservation */}
      <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
        <SectionHeader as="h1" label="RSVP" lines={["Join us", "in Sheki"]} />
        <div className="grid-page mt-16 gap-y-16 lg:mt-24">
          <div className="col-span-4 space-y-10 sm:col-span-6 lg:col-span-3">
            <p className="max-w-[28rem]">
              Seats on the lawn are free for invited guests and members. Reply once per party; we confirm by email within two working days.
            </p>
            <dl className="space-y-6 border-t border-text pt-6">
              <div>
                <dt className="type-utility">Days and hours</dt>
                <dd className="mt-1 text-muted">
                  {site.days.map((d) => (
                    <span key={d.label} className="block">{d.label}, {d.note.toLowerCase()}</span>
                  ))}
                  <span className="mt-2 block">{site.gates}</span>
                </dd>
              </div>
              <div>
                <dt className="type-utility">Groups</dt>
                <dd className="mt-1 text-muted">Up to six per reply. For seven or more, a table or a marquee, call us.</dd>
              </div>
              <div>
                <dt className="type-utility">Phone</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">{site.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-6">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* Location */}
      <section aria-labelledby="location-heading" className="page border-t border-border py-24 lg:py-32">
        <div className="grid-page gap-y-12">
          <div className="col-span-4 sm:col-span-6 lg:col-span-5">
            <p className="type-utility mb-4">Location</p>
            <h2 id="location-heading" className="type-heading">The ground, north of the old town</h2>
            <Reveal className="mt-10 grid grid-cols-1 gap-8 border-t border-text pt-6 sm:grid-cols-2">
              <address className="not-italic">
                <span className="type-utility block">Address</span>
                <span className="mt-1 block text-muted">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</span>
                <a href={site.mapHref} className="type-utility mt-4 inline-flex min-h-11 items-center border-b border-text" rel="noopener">Open in Maps</a>
              </address>
              <div>
                <span className="type-utility block">Hours</span>
                <span className="mt-1 block text-muted">{site.gates}. Last entry 17:00.</span>
              </div>
              <div className="sm:col-span-2">
                <span className="type-utility block">Getting here</span>
                <p className="mt-1 max-w-[34rem] text-muted">
                  Shuttle buses leave Sheki bus station every 20 minutes from 09:30. By car, follow the Kish road for 4 km; parking is on the grass by the east gate. Gabala airport is 90 minutes away.
                </p>
              </div>
              <a href={site.phoneHref} className="type-utility inline-flex min-h-11 items-center border-b border-text sm:hidden">Call {site.phone}</a>
            </Reveal>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-7">
            <ClipReveal className="aspect-4/3">
              <MediaAsset id="photoStables" sizes="(min-width: 1024px) 50vw, 100vw" />
            </ClipReveal>
            <p className="type-utility mt-3 text-muted">The stable block at the east gate.</p>
          </div>
        </div>
      </section>
    </>
  )
}
