import type { Metadata } from 'next'
import { ChapterTitle } from '@/components/ChapterTitle'
import { MenuTabs } from '@/components/MenuTabs'
import { BookingForm } from '@/components/BookingForm'
import { GallerySection } from '@/components/sections/Gallery'
import { ReservationSection } from '@/components/sections/Reservation'
import { gallery, menuNote, menus, site } from '@/config/site'

export const metadata: Metadata = { title: 'This week’s menu', description: 'Dinner and weekend lunch at Fennwood this week: vegetables from two farms, bread and fish from the wood oven.' }

// Menu: the one moment is the hover preview — a dish's photo follows the cursor down the list.
export default function MenuPage() {
  return (
    <main id="main" className="pt-22">
      <MenuTabs title={<ChapterTitle as="h1" display size={72} pose={8} morph="menu-title">This week’s menu</ChapterTitle>}
        menus={menus} note={<p id="allergens">{menuNote}</p>} />
      <GallerySection id="room" title={<ChapterTitle pose={-6}>The room and the kitchen</ChapterTitle>} photos={gallery} />
      <ReservationSection id="book" title={<ChapterTitle pose={4} morph="book-title">Book a table</ChapterTitle>}
        text={`Choose a day and a time and we will hold the table. ${site.groups}`} hours={site.hours} phone={site.phone} form={<BookingForm />} />
    </main>
  )
}
