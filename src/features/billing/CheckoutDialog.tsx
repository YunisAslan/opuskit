'use client'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { formatPrice, products } from '@/config/pricing'
import { billing } from '.'

export function CheckoutDialog({ open, onClose, recipeRef, recipeTitle }: { open: boolean; onClose: () => void; recipeRef: string; recipeTitle: string }) {
  const [busy, setBusy] = useState(false)
  const buy = async (id: 'recipe' | 'library') => {
    setBusy(true)
    await billing.createCheckout(id, recipeRef)
    setBusy(false)
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="gap-0 bg-paper p-6 text-base sm:max-w-2xl md:p-8">
        <DialogTitle className="display pr-8 text-3xl">Unlock {recipeTitle}</DialogTitle>
        <DialogDescription className="mt-2 text-ink-2">One-time purchase. No subscription.</DialogDescription>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="flex flex-col rounded-lg border border-line bg-white p-5">
              <p className="font-medium">{p.name}</p>
              <p className="mt-1 text-3xl font-medium tracking-tight">{formatPrice(p)}</p>
              <p className="mt-1 text-sm text-muted">{p.line}</p>
              <ul className="mt-4 flex-1 space-y-1 text-sm">{p.includes.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-ink-2" aria-hidden />{i}</li>)}</ul>
              <button type="button" disabled={busy} onClick={() => buy(p.id)} className={`btn mt-5 ${p.id === 'recipe' ? 'btn-ink' : 'btn-line'}`}>Buy {p.name.toLowerCase()}</button>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted">Test checkout: no payment is taken. Purchases unlock instantly in this browser.</p>
      </DialogContent>
    </Dialog>
  )
}
