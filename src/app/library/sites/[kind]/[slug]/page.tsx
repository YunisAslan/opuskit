import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allSites, siteName, siteSpec, type SiteRef } from '@/features/library/collection'
import { SiteDetail } from './SiteDetail'

export const generateStaticParams = () => allSites.map((r) => { const [kind, slug] = r.split(':'); return { kind, slug } })
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/library/sites/[kind]/[slug]'>): Promise<Metadata> {
  const { kind, slug } = await props.params
  return { title: siteName(`${kind}:${slug}` as SiteRef) }
}

export default async function SitePage(props: PageProps<'/library/sites/[kind]/[slug]'>) {
  const { kind, slug } = await props.params
  const ref = `${kind}:${slug}` as SiteRef
  if (!siteSpec(ref)) notFound()
  return <SiteDetail site={ref} />
}
