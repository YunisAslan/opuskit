import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MediaAsset } from '@/components/MediaAsset'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { posts } from '@/content/site'

export const dynamicParams = false
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  return post ? { title: post.title, description: post.body[0] } : {}
}

// A logbook entry: loud title, a full-bleed photo that opens like a curtain, then a narrow, quiet column.
export default async function Post({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  const others = posts.filter((p) => p !== post)
  return (
    <article>
      <header className="px-5 pt-12 pb-10 md:px-10 md:pt-16">
        <p className="type-utility text-(--color-muted)"><time dateTime={post.iso}>{post.date}</time>, {post.category}</p>
        <h1 data-lines className="type-display mt-5 max-w-[16ch] text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">
          <span className="line-mask"><span className="line">{post.title}</span></span>
        </h1>
      </header>
      <figure>
        <div data-curtain className="overflow-hidden border-y-2 border-(--color-border)">
          <MediaAsset id={post.image} priority className="aspect-[4/5] w-full object-cover md:aspect-[21/9]" />
        </div>
        <figcaption className="type-utility px-5 pt-3 text-(--color-muted) md:px-10">{post.caption}</figcaption>
      </figure>
      <div data-reveal className="type-body mx-auto max-w-[62ch] space-y-5 px-5 py-20 md:py-28 [&>p:first-child]:text-[1.2rem]">
        {post.body.map((p) => <p key={p}>{p}</p>)}
      </div>
      <nav aria-label="More from the logbook" className="border-t-2 border-(--color-border) px-5 py-16 md:px-10">
        <h2 className="type-heading">More from the logbook</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug} className="border-2 border-(--color-border) bg-(--color-surface) p-6">
              <p className="type-utility text-(--color-muted)">{p.date}, {p.category}</p>
              <Link href={`/journal/${p.slug}`} className="type-heading mt-2 block [font-size:clamp(1.2rem,1.8vw,1.6rem)] hover:underline hover:underline-offset-4">{p.title}</Link>
            </li>
          ))}
        </ul>
        <p className="type-body mt-10"><UnderlineFill href="/donate">Pay for next month’s water test</UnderlineFill></p>
      </nav>
    </article>
  )
}
