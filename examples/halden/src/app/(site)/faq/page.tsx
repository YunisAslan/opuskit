import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/Faq'
import { faq } from '@/content/site'

export const metadata: Metadata = { title: 'Questions', description: faq.pageLine }

// FAQ: FAQ — with the search box above the answers.
export default function Faq() {
  return <FaqSection intro={{ title: faq.pageTitle, line: faq.pageLine }} title={faq.title} items={faq.items} search={{ placeholder: faq.search, empty: faq.empty }} />
}
