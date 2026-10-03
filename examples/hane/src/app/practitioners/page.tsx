import { MediaAsset } from '@/components/MediaAsset'
import { PageHead } from '@/components/PageHead'
import { Stops } from '@/components/Stops'
import { TeamSection } from '@/components/sections/Team'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { quotes, team } from '@/content'

export const metadata = { title: 'Practitioners', description: 'The three people who treat you at Hane: two physiotherapists and a slow-movement teacher.' }

export default function Practitioners() {
  return (
    <Stops items={[
      { name: 'Three of us', still: true, node: <PageHead title={['The people', 'who treat you']}
        lead="Two physiotherapists and a slow-movement teacher, in one small studio. You see the same person at every visit, so nothing has to be explained twice." /> },
      { name: 'Who you will see', node: <TeamSection title="Who you will see" intro="Ask for anyone by name when you book, or leave it to us and we will match you to the right person for what hurts."
        people={team.map((p) => ({ ...p, media: <MediaAsset id={p.media} sizes="(min-width: 768px) 40vw, 50vw" /> }))} /> },
      { name: 'In their words', node: <TestimonialsSection title="In their words" quotes={quotes} /> },
    ]} />
  )
}
