"use client"
import Link from "next/link";
import { useCart } from "@/components/Cart";
import { MediaAsset } from "@/components/MediaAsset";
import { formatPrice } from "@/data/products";

export function CartView() {
  const { items, subtotal, setQty } = useCart();
  if (!items.length) {
    return (
      <div className="container-content pb-32 md:pb-40">
        <p className="text-lg">Nothing in here yet.</p>
        <Link href="/shop" className="btn btn-primary mt-8">Shop the collection</Link>
      </div>
    );
  }
  return (
    <div className="container-content grid gap-12 pb-32 md:grid-cols-12 md:gap-6 md:pb-40">
      <ul className="border-t border-border md:col-span-8">
        {items.map((i) => (
          <li key={i.id} className="flex gap-4 border-b border-border py-6">
            <Link href={i.href} className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl md:w-32">
              <MediaAsset id={i.image} fill sizes="128px" />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-4">
                <Link href={i.href} className="font-heading text-base font-semibold">{i.name}</Link>
                <p>{formatPrice(i.price * i.qty)}</p>
              </div>
              {i.option && <p className="mt-1 font-utility text-utility text-muted">{i.option}</p>}
              <div className="mt-auto flex items-center gap-2 pt-4">
                <button type="button" className="btn btn-secondary h-11 min-h-11 w-11 px-0" aria-label={`One fewer ${i.name}`} onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                <span className="w-8 text-center" aria-live="polite">{i.qty}</span>
                <button type="button" className="btn btn-secondary h-11 min-h-11 w-11 px-0" aria-label={`One more ${i.name}`} onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                <button type="button" className="link ml-auto min-h-11 font-utility text-utility" onClick={() => setQty(i.id, 0)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="md:col-span-4">
        <div className="rounded-3xl bg-surface p-6 md:sticky md:top-32">
          <dl className="space-y-2">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between text-muted"><dt>Shipping</dt><dd>{subtotal >= 150 ? "Free" : formatPrice(8)}</dd></div>
          </dl>
          <p className="mt-4 font-utility text-utility text-muted">Free shipping in the EU over €150.</p>
          <Link href="/checkout" className="btn btn-primary mt-6 w-full">Checkout</Link>
        </div>
      </aside>
    </div>
  );
}
