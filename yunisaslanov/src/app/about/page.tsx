import type { Metadata } from 'next'
import { Lines } from '@/components/Lines'
import { SiteLink } from '@/components/SiteLink'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { assets } from '@/config/assets'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'About' }

export default function About() {
  return (
    <>
      <EditorialStorySection media="over" level="h1" title="Hello, I’m Yunis."
        cover={<Lines as="h1" now text="Hello, I’m Yunis." mobile={['Hello,', 'I’m Yunis.']} desktop={['Hello,', 'I’m Yunis.']}
          className="type-display mx-auto w-full max-w-(--container) [font-size:15vw] md:[font-size:clamp(4rem,10vw,9.5rem)]" />}
        image={assets.yourPhotos.src} alt={assets.yourPhotos.alt}
        caption="Yunis Aslanov, the person behind the desk"
        quote="I would rather make one careful thing than five loud ones."
        paragraphs={[
          'This site is my workspace. I keep finished things here, and a few unfinished ones, so you can see how I think as well as what I make.',
          'I work with pictures and words. Most projects start the same way: I walk, I look, I take far too many photos, and then I spend a long time deciding which three matter.',
          'I like small teams and clear briefs, and I like it even more when a brief changes because we found something better along the way.',
          'When I’m not working I’m usually somewhere near water, or rearranging the same five books on a shelf.',
          'If something here feels close to what you need, write to me. I answer every message myself, usually within two days.',
        ]} />
      <p className="type-body mx-auto max-w-(--container) px-(--gutter) pb-(--section-y) md:pl-[calc(4/24*100%+var(--gutter))]">
        <SiteLink href="/projects">See the work</SiteLink>
        <span className="mx-4 text-(--color-muted)">or</span>
        <SiteLink href={`mailto:${site.email}`}>{site.email}</SiteLink>
      </p>
    </>
  )
}
