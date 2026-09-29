'use client'
// The plan's current look — colours, lettering, shape and fonts every preview in the builder is drawn with.
import { accentSets, palettes, typography } from '@/data/ingredients'
import { shapeStyles } from '@/data/patterns'
import { directions } from '@/data/taxonomy'
import { DEFAULT_LOOK } from '@/features/kit/plan'
import { recommendedShape } from '@/features/recipes/engine'
import type { KitPlan } from '@/types/domain'

export function lookOf(plan: KitPlan) {
  const d = directions[plan.direction ?? DEFAULT_LOOK]
  const colors = palettes[plan.palette ?? d.defaults.palette].colors
  const type = typography[plan.typography ?? d.defaults.typography]
  const shape = shapeStyles[plan.shape ?? recommendedShape({ direction: d.id })]
  const rotId = plan.rotation === 'off' ? undefined : plan.rotation ?? d.rotation
  const chapters = rotId ? accentSets[rotId].colors : undefined
  return { d, colors, type, shape, chapters, rotId, fonts: { display: type.display.family, body: type.body.family, utility: type.utility.family } }
}
