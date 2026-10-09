import type { Metadata } from 'next'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { GallerySection } from '@/components/sections/Gallery'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { stories } from '@/content/site'

export const metadata: Metadata = { title: 'Stories', description: 'Divers, beach crews, fishers and teachers on what the replanted kelp gives back.' }

export default function Stories() {
  return (
    <>
      <TestimonialsSection
        tone="surface"
        title={stories.testimonials.title}
        heading={['What the water', 'gives back']}
        mobileHeading={['What the', 'water gives', 'back']}
        quotes={stories.testimonials.quotes}
      />
      <EditorialStorySection
        image="storyStories"
        media="side"
        title={['A Saturday on', 'the north reef']}
        mobileTitle={['A Saturday', 'on the', 'north reef']}
        alt={stories.story.alt}
        caption={stories.story.caption}
        paragraphs={stories.story.paragraphs}
        quote={stories.story.quote}
        quoteBy={stories.story.quoteBy}
      />
      <GallerySection title={stories.gallery.title} intro="A year on the coast, one page of the log at a time." photos={stories.gallery.photos} />
    </>
  )
}
