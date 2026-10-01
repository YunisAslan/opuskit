import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Archive, pageCount } from '../../archive'

// Every archive page after the first is built ahead of time; any other number is a 404.
export const dynamicParams = false
export const generateStaticParams = () => Array.from({ length: pageCount - 1 }, (_, i) => ({ page: String(i + 2) }))

export async function generateMetadata({ params }: PageProps<'/articles/page/[page]'>): Promise<Metadata> {
  const { page } = await params
  return { title: `Articles, page ${page}`, description: 'Every Slow Atlas essay, newest first. One place each.' }
}

export default async function ArticlesPageN({ params }: PageProps<'/articles/page/[page]'>) {
  const page = Number((await params).page)
  if (!Number.isInteger(page) || page < 2 || page > pageCount) notFound()
  return <Archive page={page} />
}
