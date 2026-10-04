import type { Metadata } from 'next'
import Link from 'next/link'
import { JournalSection } from '@/components/sections/Journal'
import { Newsletter } from '@/components/site/Newsletter'
import { PageHeader } from '@/components/site/PageHeader'
import { Stop } from '@/components/site/Stop'
import { journalEntries } from '@/lib/grid'

export const metadata: Metadata = { title: 'Journal', description: 'Notes from the salt lake, the saffron fields and the lab, written by the three people who make QUM.' }

export default function Journal() {
  return (
    <>
      <PageHeader title="Notes from the lake, the fields and the lab" line="Written by the three of us, whenever there is something worth telling: a harvest, a batch, a way of doing things." />
      <Stop id="reading-room" name="The reading room">
        <div className="[&>section]:pt-12"><JournalSection link={Link} title="Latest" entries={journalEntries()} /></div>
      </Stop>
      <Stop id="way-in" name="The way in"><Newsletter /></Stop>
    </>
  )
}
