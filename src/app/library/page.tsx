import type { Metadata } from 'next'
import { Library } from './Library'

export const metadata: Metadata = { title: 'Library', description: 'Sites built with OpusKit, each the way you would get it. Collect the ones you like; OpusKit makes them one site.' }

export default function LibraryPage() {
  return <Library />
}
