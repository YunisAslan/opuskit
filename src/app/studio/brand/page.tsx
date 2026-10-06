import type { Metadata } from 'next'
import { Brand } from './Brand'

export const metadata: Metadata = { title: 'Brand', description: 'Your name and words, your colours and lettering — and an example of how your site will look.' }

export default function BrandPage() {
  return <Brand />
}
