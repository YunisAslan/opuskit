import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Testimonials' }

// Placeholder quotes from the tasting panel. Replace with real, attributed customer quotes before launch.
const quotes = [
  { text: 'It is the first canned coffee I have had that tastes like someone cared about the beans. The orange makes it feel like a proper drink, not a caffeine delivery system.', who: 'Priya S.', where: 'Café owner, Bristol' },
  { text: 'We put a case in the office fridge on Monday and it was gone by Wednesday. Half the team switched from energy drinks.', who: 'Tom H.', where: 'Studio manager, Manchester' },
  { text: 'Light enough to drink at four in the afternoon, and I still sleep. That is the whole reason I subscribed.', who: 'Ana M.', where: 'Nurse, Lisbon' },
  { text: 'Serve it over ice with a strip of orange peel and people assume it is a cocktail. We sell it next to the spritzes.', who: 'Jonas K.', where: 'Bar manager, Berlin' },
  { text: 'Not too sweet, properly fizzy, and the can looks good on the counter. I order the four-pack every other week.', who: 'Chloé R.', where: 'Designer, Paris' },
]

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title={['Said by', 'people who', 'drink it.']}
        meta="From our 2026 tasting panel"
        intro="Before we canned a single batch, 240 people tried Keepers in cafés, offices and bars across five cities. These are some of the notes they left."
      />
      <section aria-label="Testimonials" className="container-text pb-32 md:pb-40">
        <ul className="grid border-t-2 border-border md:grid-cols-2">
          {quotes.map((q, i) => (
            <li key={q.who} data-reveal className={`border-b border-border py-8 md:py-12 ${i % 2 === 0 ? 'md:border-r md:pr-6' : 'md:pl-6'} ${i === 0 ? 'md:col-span-2 md:border-r-0' : ''}`}>
              <blockquote className="flex flex-col gap-6">
                <p className={i === 0 ? 'type-heading' : 'type-body text-lg'}>“{q.text}”</p>
                <footer className="type-utility">
                  {q.who}
                  <span className="block text-muted">{q.where}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
