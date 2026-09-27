'use client'
import { Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { formatPrice, products } from '@/config/pricing'
import { billing } from '.'

export function CheckoutDialog({ open, onClose, recipeRef, recipeTitle }: { open: boolean; onClose: () => void; recipeRef: string; recipeTitle: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const buy = async (id: 'recipe' | 'library') => {
    setBusy(true)
    await billing.createCheckout(id, recipeRef)
    setBusy(false)
    onClose()
  }

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="checkout-title" className="m-auto w-[min(44rem,calc(100vw-2rem))] rounded-xl bg-paper p-0 text-ink backdrop:bg-ink/50">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="checkout-title" className="display text-3xl">Unlock {recipeTitle}</h2>
          <button type="button" onClick={onClose} className="-m-2 p-2 text-muted hover:text-ink" aria-label="Close"><X size={18} /></button>
        </div>
        <p className="mt-2 text-ink-2">One-time purchase. No subscription.</p>
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
      </div>
    </dialog>
  )
}
