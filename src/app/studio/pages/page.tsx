import type { Metadata } from 'next'
import { Pages } from './Pages'

export const metadata: Metadata = { title: 'Pages', description: 'The pages of your site and the parts on each.' }

export default function PagesPage() {
  return <Pages />
}
