"use client"
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/Cart";
import { formatPrice } from "@/data/products";

const Field = ({ label, name, className = "", ...rest }: { label: string; name: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className={className}>
    <label className="label" htmlFor={name}>{label}</label>
    <input id={name} name={name} required className="field" {...rest} />
  </div>
);

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const [order, setOrder] = useState<string | null>(null);
  const shipping = subtotal >= 150 ? 0 : 8;

  if (order) {
    return (
      <div className="container-content pb-32 md:pb-40" role="status">
        <p className="font-heading text-heading">Order {order} is in.</p>
        <p className="mt-4 max-w-[52ch]">A confirmation is on its way to your inbox. We pack on weekdays and ship within two working days.</p>
        <Link href="/shop" className="btn btn-primary mt-8">Keep shopping</Link>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="container-content pb-32 md:pb-40">
        <p className="text-lg">Your bag is empty.</p>
        <Link href="/shop" className="btn btn-primary mt-8">Shop the collection</Link>
      </div>
    );
  }

  return (
    <form className="container-content grid gap-12 pb-32 md:grid-cols-12 md:gap-6 md:pb-40"
      onSubmit={(e) => {
        e.preventDefault();
        // ponytail: no payment provider wired; hand off to Stripe Checkout (or similar) here before confirming.
        setOrder(`BTL-${Math.floor(10000 + Math.random() * 89999)}`);
        clear();
      }}>
      <div className="grid gap-6 sm:grid-cols-2 md:col-span-7">
        <Field className="sm:col-span-2" label="Email" name="email" type="email" autoComplete="email" />
        <Field label="First name" name="given-name" autoComplete="given-name" />
        <Field label="Last name" name="family-name" autoComplete="family-name" />
        <Field className="sm:col-span-2" label="Address" name="address" autoComplete="street-address" />
        <Field label="Postcode" name="postcode" autoComplete="postal-code" />
        <Field label="City" name="city" autoComplete="address-level2" />
        <div className="sm:col-span-2">
          <label className="label" htmlFor="country">Country</label>
          <select id="country" name="country" autoComplete="country-name" className="field" defaultValue="Portugal">
            {["Portugal", "Spain", "France", "Germany", "Netherlands", "Italy", "Ireland", "Belgium"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="font-utility text-utility text-muted sm:col-span-2">Card, Apple Pay and MB WAY are taken on the secure payment step.</p>
      </div>
      <aside className="md:col-span-5">
        <div className="rounded-3xl bg-surface p-6 md:sticky md:top-32">
          <ul className="space-y-2">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-4">
                <span>{i.name}{i.option && ` (${i.option})`} × {i.qty}</span><span>{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-muted"><dt>Shipping</dt><dd>{shipping ? formatPrice(shipping) : "Free"}</dd></div>
            <div className="flex justify-between font-heading font-semibold"><dt>Total</dt><dd>{formatPrice(subtotal + shipping)}</dd></div>
          </dl>
          <button type="submit" className="btn btn-primary mt-6 w-full">Buy now</button>
        </div>
      </aside>
    </form>
  );
}
