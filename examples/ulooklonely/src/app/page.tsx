import { JournalBlock } from '@/components/JournalBlock'
import { ScrollProgress } from '@/components/pieces/ScrollProgress'
import { ScrollFilm } from '@/components/ScrollFilm'
import { TitleCard } from '@/components/TitleCard'
import { journal } from '@/config/content'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollFilm />
      <TitleCard lines={['Films for the', 'in-between hours']} mobile={['Films', 'for the', 'in-between', 'hours']} line="Notes from the edit: what I kept, what I cut, and why the quiet parts stay long." />
      <JournalBlock entries={journal} />
    </>
  )
}
