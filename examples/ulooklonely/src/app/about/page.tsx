import type { Metadata } from 'next'
import { EditorialStorySection } from '@/components/sections/EditorialStory'

export const metadata: Metadata = { title: 'About', description: 'Who makes ulooklonely, and why the films stay quiet.' }

export default function About() {
  return (
    <EditorialStorySection
      level="h1"
      title={['Light, held still,', 'for as long', 'as it takes']}
      titleMobile={['Light,', 'held still,', 'for as long', 'as it takes']}
      image="stillHand"
      caption="A still from Orange Hours. One take, graded warm, left long on purpose."
      quote="I cut for the moment after the line is spoken, when a face forgets it is being watched."
      quoteAfter={2}
      paragraphs={[
        'ulooklonely is a small studio for short films, music videos and edits. It started as a folder of scenes I kept rewatching: people alone in rooms that were full a minute ago.',
        'The work is slow on purpose. Long holds, warm light, sound you notice only when it stops. I would rather show one face for six seconds than twelve faces for half a second each.',
        'Most projects start with a single image, a window or a coat collar, and grow from there. I shoot, edit and grade, and I bring in a composer when the room needs one.',
        'If you are making something about distance, cities or the hour before sleep, we will probably get along. Write to me with the image you cannot shake.',
      ]}
    />
  )
}
