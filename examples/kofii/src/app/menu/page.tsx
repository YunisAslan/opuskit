import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { MenuList } from '@/components/MenuList'

export const metadata: Metadata = { title: 'Menu' }

export default function MenuPage() {
  return (
    <>
      <PageHeader lines={['The menu']}>
        <p>Everything is made to order. Oat and almond milk at no extra cost. Prices include tax.</p>
      </PageHeader>
      <MenuList />
    </>
  )
}
