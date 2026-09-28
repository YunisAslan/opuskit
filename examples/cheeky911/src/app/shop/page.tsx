import type { Metadata } from 'next'
import ProductList from '@/components/ProductList'

export const metadata: Metadata = { title: 'Shop' }

export default function Shop() {
  return <ProductList />
}
