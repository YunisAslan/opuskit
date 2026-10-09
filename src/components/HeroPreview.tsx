'use client'
// A first screen as it would look in the plan's style, in the owner's words — used by Direction and Brand.
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { examples } from '@/data/examples'
import { ctaFor } from '@/data/taxonomy'
import { inferGoal, inferPurpose } from '@/features/kit/plan'
import { EFFECTS } from '@/data/patterns'
import type { HeroId, KitPlan } from '@/types/domain'
import { lookOf } from './ProductVisual'

/** A real site that uses the effect, shown instead of a mock-up. */
const CLIP = examples.find((e) => e.clip && e.hero.kind === 'video')?.clip

export const heroName = (id?: HeroId) => EFFECTS.find((e) => e.hero === id)?.name ?? 'From your look'

export function HeroPreview({ plan, id }: { plan: KitPlan; id?: HeroId }) {
  const look = lookOf(plan)
  const e = EFFECTS.find((x) => x.hero === id)
  if (e?.hero === 'orbit-stickers') return <SectionPreview id="orbit-hero" colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} className="aspect-[16/10]" />
  return <SitePreview {...previewFromDirection(look.d.id, { colors: look.colors, type: look.type, lead: e?.lead, motion: e?.motion, title: plan.name || 'Your headline', brand: plan.name || undefined, ...ownWords(plan), videoSrc: e?.hero.startsWith('scroll-video') ? CLIP : undefined })} />
}

/** The owner's sentence, their pages as the menu and their main action — so a first screen speaks for their site. */
function ownWords(plan: KitPlan) {
  const nav = plan.pages.filter((p) => !['home', 'cart', 'product-detail'].includes(p.type) && p.sections.length).slice(0, 3).map((p) => p.label)
  return { line: plan.about?.trim() || undefined, nav: nav.length ? nav : undefined, cta: plan.pages.length ? ctaFor(inferPurpose(plan), inferGoal(plan)) : undefined }
}
