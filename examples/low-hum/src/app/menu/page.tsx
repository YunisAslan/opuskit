import type { Metadata } from 'next'
import { ViewTransition } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { GallerySection } from '@/components/sections/Gallery'
import { Band } from '@/components/site/Band'
import { Booking } from '@/components/site/Booking'
import { MenuWithRecord } from '@/components/site/MenuRecord'
import { t } from '@/components/site/type'
import { home, menuPage, menuSides, reservation } from '@/content/site'

export const metadata: Metadata = { title: 'Menu', description: menuPage.intro }

// Menu: Menu → Gallery → Reservation
export default function MenuPage() {
  return (
    <>
      <Band tone="ground" wave={false} className="pt-16">
        <MenuWithRecord
          heading={
            <ViewTransition name="menu-title">
              <TextEffect as="h1" preset="slide" className={`${t.page} inline-block max-w-[14ch]`}>{menuPage.title}</TextEffect>
            </ViewTransition>
          }
          intro={menuPage.intro}
          sides={menuSides}
          note={home.menu.note}
        />
      </Band>
      <Band tone="surface">
        <GallerySection
          heading={<TextEffect as="h2" preset="slide" className={t.h2}>{menuPage.gallery.title}</TextEffect>}
          intro={menuPage.gallery.intro}
          hint={menuPage.gallery.hint}
          gridTitle={menuPage.gallery.gridTitle}
          open={menuPage.gallery.open}
          close={menuPage.gallery.close}
        />
      </Band>
      <Band tone="ground">
        <Booking heading={<h2 className={t.h2}>{reservation.title}</h2>} />
      </Band>
    </>
  )
}
