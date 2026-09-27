'use client'
import { products, type Product } from '@/config/pricing'
import { KEYS, get, useStored, write } from '@/lib/store'

export interface BillingProvider {
  createCheckout(productId: Product['id'], ref?: string): Promise<{ entitlement: string }>
  verifyPurchase(entitlement: string): boolean
  getEntitlements(): string[]
}

const NONE: string[] = []

// Test provider: no charge, grants the entitlement immediately. Replace with Stripe/Lemon Squeezy behind the same interface.
export const mockBilling: BillingProvider = {
  async createCheckout(productId, ref) {
    const product = products.find((p) => p.id === productId)
    if (!product) throw new Error(`Unknown product: ${productId}`)
    const entitlement = product.grants(ref)
    write(KEYS.entitlements, [...new Set([...get(KEYS.entitlements, NONE), entitlement])])
    return { entitlement }
  },
  verifyPurchase: (e) => get(KEYS.entitlements, NONE).includes(e),
  getEntitlements: () => get(KEYS.entitlements, NONE),
}

export const billing: BillingProvider = mockBilling

export const hasAccess = (entitlements: string[], ref: string) => entitlements.includes('library') || entitlements.includes(`recipe:${ref}`)

export function useAccess(ref: string) {
  const ents = useStored(KEYS.entitlements, NONE)
  return { unlocked: hasAccess(ents, ref), entitlements: ents }
}
