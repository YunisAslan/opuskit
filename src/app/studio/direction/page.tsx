import type { Metadata } from 'next'
import { Directions } from './Directions'

export const metadata: Metadata = { title: 'Make it yours', description: 'Any look, any colours, any lettering — your brand changes as you pick.' }

export default function DirectionPage() {
  return <Directions />
}
