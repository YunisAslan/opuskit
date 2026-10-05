import type { Metadata } from 'next'
import { Style } from './Style'

export const metadata: Metadata = { title: 'Style', description: 'Your colours, lettering and files, with what fits your site marked.' }

export default function StylePage() {
  return <Style />
}
