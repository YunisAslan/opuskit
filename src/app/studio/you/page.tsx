import type { Metadata } from 'next'
import { You } from './You'

export const metadata: Metadata = { title: 'Your site', description: 'Its name, what it is in one sentence, and what kind of site it is — the part of your site that is only yours.' }

export default function YouPage() {
  return <You />
}
