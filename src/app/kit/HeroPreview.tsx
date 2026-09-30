'use client'
// A first screen as it would look in the plan's style — used by Style → First screen and by the first row in Pages.
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { examples } from '@/data/examples'
import { EFFECTS } from '@/data/patterns'
import type { HeroId, KitPlan } from '@/types/domain'
import { lookOf } from './ProductVisual'

/** A real site that uses the effect, shown instead of a mock-up. */
const CLIP = examples.find((e) => e.clip)?.clip

export const heroName = (id?: HeroId) => EFFECTS.find((e) => e.hero === id)?.name ?? 'From your look'

export function HeroPreview({ plan, id }: { plan: KitPlan; id?: HeroId }) {
  const look = lookOf(plan)
  const e = EFFECTS.find((x) => x.hero === id)
  if (e?.hero === 'orbit-stickers') return <SectionPreview id="orbit-hero" colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} className="aspect-[16/10]" />
  return <SitePreview {...previewFromDirection(look.d.id, { colors: look.colors, type: look.type, lead: e?.lead, motion: e?.motion, title: plan.name || 'Your headline', videoSrc: e?.hero.startsWith('scroll-video') ? CLIP : undefined })} />
}
