import Link from "next/link"
import { Hero } from "@/components/Hero"
import { WordLight } from "@/components/WordLight"
import { ClipReveal, LineReveal, Reveal } from "@/components/Reveal"
import { MediaAsset } from "@/components/MediaAsset"
import { Button } from "@/components/ui/button"
import { site } from "@/config/site"

const facts = [
  { n: "3", label: "days of play, Friday to Sunday" },
  { n: "24", label: "chukkas across the weekend" },
  { n: "6", label: "teams from four countries" },
  { n: "400", label: "guests a day on the lawn" },
]

const schedule = [
  { t: "10:00", what: "Gates open", note: "Coffee on the terrace, horses in the lines" },
  { t: "11:00", what: "First chukka", note: "Four chukkas before lunch" },
  { t: "13:00", what: "Lunch in the clubhouse", note: "Seated, three courses" },
  { t: "15:00", what: "Divot stomp", note: "Everyone onto the field at half-time" },
  { t: "16:00", what: "Afternoon match", note: "Sunday: the final" },
  { t: "19:00", what: "Evening in the caravanserai", note: "Dinner and music until late" },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro */}
      <section aria-labelledby="intro-label" className="page py-24 lg:py-32">
        <div className="grid-page gap-y-6">
          <p id="intro-label" className="type-utility col-span-4 sm:col-span-6 lg:col-span-3 lg:pt-4">
            {site.event}
          </p>
          <WordLight
            className="font-display col-span-4 text-[clamp(1.75rem,8vw,2.5rem)] leading-[1.02] tracking-[-0.02em] sm:col-span-6 sm:text-[clamp(2rem,5vw,4.25rem)] lg:col-span-8"
            text="Three days of polo, long lunches and summer evenings in Sheki. For members, riders and the guests they bring."
          />
        </div>

        <Reveal as="dl" className="mt-24 grid grid-cols-2 border-t border-text sm:grid-cols-4 lg:mt-32">
          {facts.map((f) => (
            <div key={f.n} className="border-b border-border py-6 pr-4 sm:border-b-0 sm:border-r sm:pl-4 sm:first:pl-0 sm:last:border-r-0">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="type-display block">{f.n}</span>
                <span className="mt-3 block text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </Reveal>

        <div className="grid-page mt-24 gap-y-12 lg:mt-32">
          <div className="col-span-4 sm:col-span-6 lg:col-span-6">
            <p className="type-utility mb-4">Each day</p>
            <LineReveal as="h2" lines={["The day,", "hour by hour"]} className="type-heading" />
            <Reveal as="ol" className="mt-12 border-t border-text">
              {schedule.map((s) => (
                <li key={s.t} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[7rem_1fr]">
                  <span className="type-heading tabular-nums">{s.t}</span>
                  <span>
                    <span className="block font-bold">{s.what}</span>
                    <span className="block text-muted">{s.note}</span>
                  </span>
                </li>
              ))}
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild size="lg" className="type-utility">
                <Link href="/rsvp">RSVP<span className="font-normal">{site.dates}</span></Link>
              </Button>
              <p className="type-utility text-muted">
                Reply by <span className="text-accent">{site.rsvpBy}</span>
              </p>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <ClipReveal className="aspect-square">
              <MediaAsset id="photoGroom" sizes="(min-width: 1024px) 40vw, 100vw" />
            </ClipReveal>
            <p className="type-utility mt-3 text-muted">The horse lines open to guests from 10:00.</p>
          </div>
        </div>
      </section>
    </>
  )
}
