import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Motif } from '@/components/Motif'
import { Lines } from '@/components/Lines'
import { TextLink } from '@/components/InkLinks'
import { StatusBadge } from '@/components/StatusBadge'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { GallerySection } from '@/components/sections/Gallery'
import { FeatureRowsSection } from '@/components/sections/FeatureRows'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { media, type AssetKey } from '@/config/assets'
import { houseBySlug, houses, price } from '@/data/houses'
import { site } from '@/data/site'

export const dynamicParams = false
export function generateStaticParams() { return houses.map((h) => ({ slug: h.slug })) }

export async function generateMetadata({ params }: PageProps<'/residences/[slug]'>): Promise<Metadata> {
  const h = houseBySlug((await params).slug)
  return h ? { title: h.name, description: `${h.name}, built around ${h.time}: ${h.area} m², ${h.bedrooms} bedrooms, a ${h.terrace} m² terrace. ${h.light}` } : {}
}

// Photos that tell the rest of each house, kept apart from its own two pictures.
const rest: AssetKey[] = ['stair', 'terraceStone', 'roomBed', 'terracePool', 'roomBalcony', 'detailJug', 'cliff2']

export default async function House({ params }: PageProps<'/residences/[slug]'>) {
  const h = houseBySlug((await params).slug)
  if (!h) notFound()
  const i = houses.indexOf(h)
  const next = houses[(i + 1) % houses.length]
  const extra = rest.filter((k) => k !== h.image && k !== h.second)
  const sea = extra.find((k) => k === 'roomBed' || k === 'roomBalcony')!
  const terrace = extra.find((k) => k === 'terracePool' || k === 'terraceStone')!
  const stairFree = h.image !== 'stair' && h.second !== 'stair'
  const isShow = h.slug === site.showHouse
  const bookable = h.status !== 'sold'

  return (
    <>
      <ProductHighlightSection
        link={Link}
        level="h1"
        top={
          <Breadcrumb>
            <BreadcrumbList className="type-utility text-(--color-muted)">
              <BreadcrumbItem><BreadcrumbLink asChild><Link href="/residences" className="hover:text-(--color-text)">Residences</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage className="text-(--color-text)">{h.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        name={<><Motif len={80} rot={-4} />{h.name}</>}
        text={h.light}
        image={media(h.image).src}
        alt={media(h.image).alt}
        details={[
          { label: 'Built around', value: `${h.time}, facing ${h.facing}` },
          { label: 'Floor area', value: `${h.area} m²` },
          { label: 'Bedrooms', value: String(h.bedrooms) },
          { label: 'Terrace', value: `${h.terrace} m², with plunge pool` },
          { label: 'Price', value: h.status === 'sold' ? 'Sold' : price(h.price) },
          { label: 'Status', value: <StatusBadge status={h.status} /> },
        ]}
        action={bookable ? { label: isShow ? 'Book a viewing here' : `Book a viewing of ${h.name}`, href: `/book?house=${h.slug}` } : undefined}
        note={h.status === 'sold' ? <>This house has a buyer. <TextLink href="/residences">See the houses still available</TextLink></> : h.status === 'reserved' ? 'Reserved. If the reservation lapses, it returns to sale; ask us to tell you.' : isShow ? 'This is the show house, open Saturday and Sunday, 11:00 to 17:00.' : `Viewings start at the show house, Ten; from there we walk you down to ${h.name}.`}
      />

      <GallerySection
        title={<><Motif len={64} rot={0} />Inside {h.name}</>}
        photos={[
          { ...media(h.second), caption: `${h.name}, the living floor`, text: 'The top floor is one room: kitchen, table and sofa under the cliff edge, with the sea filling the long window.' },
          stairFree
            ? { ...media('stair'), caption: 'Going down', text: 'The stair is cut into the rock, lit from one slot above, and ends at the sea rooms.' }
            : { ...media('detailJug'), caption: 'Morning, in the hall', text: 'Deep walls make deep sills: places for a jug, a book, a shaft of sun.' },
          { ...media('cliff2'), caption: 'From the water', text: `${h.name} is house ${i + 1} of twelve, counted from the east along the rock.` },
        ]}
      />

      <FeatureRowsSection
        link={TextLink}
        title={<><Motif len={64} rot={3} />Three floors</>}
        rows={[
          { name: 'The hour room', kicker: `At ${h.time}`, text: `${h.light} The wall opposite the window is left bare, in the cliff’s own limestone.`, image: media(h.image).src, alt: media(h.image).alt },
          { name: 'The sea rooms', kicker: `${h.bedrooms} bedrooms`, text: 'Bedrooms sit at the bottom of the house, at the level of the water, each with a window cut at an angle to the sea and its own bathroom.', image: media(sea).src, alt: media(sea).alt },
          { name: 'The terrace', kicker: `${h.terrace} m²`, text: 'A private stone terrace with a plunge pool fed with filtered sea water. Steps lead down to the rocks for a swim in the morning.', image: media(terrace).src, alt: media(terrace).alt, link: { label: `Next house: ${next.name}`, href: `/residences/${next.slug}` } },
        ]}
      />

      <ContactCtaSection
        link={Link}
        headline={<Lines lines={bookable ? ['See it at', `${h.time}.`] : ['Another hour', 'is waiting.']} />}
        quiet={bookable ? 'We will time your viewing to the house’s own light.' : 'Seven houses are still free to reserve.'}
        action={bookable ? { label: 'Book a viewing', href: `/book?house=${h.slug}` } : { label: 'See the available houses', href: '/residences' }}
        email={site.email}
      />
    </>
  )
}
