import type { Metadata } from 'next'
import { Directions } from './Directions'

export const metadata: Metadata = { title: 'Three directions', description: 'Your site three ways, made from your words and what you liked in other sites. Pick one.' }

export default function DirectionPage() {
  return <Directions />
}
