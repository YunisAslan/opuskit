import type { Metadata } from 'next'
import { Archive } from '@/components/site/Archive'
import { pageCount } from '@/content/magazine'

export const dynamicParams = false
export const generateStaticParams = () => Array.from({ length: pageCount - 1 }, (_, i) => ({ n: String(i + 2) }))

export async function generateMetadata({ params }: PageProps<'/articles/page/[n]'>): Promise<Metadata> {
  const { n } = await params
  return { title: `Essays, page ${n}` }
}

export default async function ArticlesPage({ params }: PageProps<'/articles/page/[n]'>) {
  const { n } = await params
  return <Archive page={Number(n)} />
}
