// Business model lives here, not in UI components. Change prices or what's locked without touching pages.
import type { RecipeSectionKey } from '@/features/recipes/markdown'

export type Product = {
  id: 'recipe' | 'library'
  name: string
  price: number
  currency: 'USD'
  line: string
  /** Entitlement granted: `recipe:<ref>` for a single recipe, `library` for everything. */
  grants: (ref?: string) => string
  includes: string[]
}

export const products: Product[] = [
  {
    id: 'recipe', name: 'One Recipe', price: 24, currency: 'USD', line: 'Everything for one website, yours to keep.',
    grants: (ref) => `recipe:${ref}`,
    includes: ['Full Creative Direction', 'Full Design System', 'Full Recipe', 'Asset Checklist + creation paths', 'Resource Kit', 'References', 'Implementation Guide', 'AI Build Packages for every tool', 'Claude Code skills where relevant'],
  },
  {
    id: 'library', name: 'The Library', price: 89, currency: 'USD', line: 'All 10 recipes plus everything you create.',
    grants: () => 'library',
    includes: ['Everything in One Recipe', 'All 10 curated recipes', 'Unlimited recipes from the creator', 'Every future Build Package adapter'],
  },
]

export const freeIncludes = ['Explore every recipe preview', 'Create recipe previews with the creator', 'Summary, creative direction and visual system', 'Asset checklist overview']

/** Recipe sections that need an entitlement. */
export const lockedSections: RecipeSectionKey[] = ['components', 'motion', 'resources', 'references', 'implementation']
export const buildPackageLocked = true

export const formatPrice = (p: Product) => new Intl.NumberFormat('en-US', { style: 'currency', currency: p.currency, maximumFractionDigits: 0 }).format(p.price)
