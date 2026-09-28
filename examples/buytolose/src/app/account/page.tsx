import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Page";

export const metadata: Metadata = { title: "Account" };

// ponytail: static sample orders; wire to the order API once auth exists.
const orders = [
  { id: "BTL-40213", date: "12 Sep 2026", items: "Crossing Hoodie, Backwards Cap", total: "€160", status: "Delivered" },
  { id: "BTL-38877", date: "2 Jun 2026", items: "Star Sling", total: "€72", status: "Delivered" },
];

export default function Account() {
  return (
    <>
      <PageIntro word="YOU" title="Your account">Signed in as rita@example.com. <Link href="/sign-in" className="link inline-flex min-h-11 items-center">Not you?</Link></PageIntro>
      <div className="container-content grid gap-16 pb-32 md:grid-cols-12 md:gap-6 md:pb-40">
        <section aria-labelledby="orders" className="md:col-span-7">
          <h2 id="orders" className="font-heading text-heading">Orders</h2>
          <ul className="mt-8 border-t border-border">
            {orders.map((o) => (
              <li key={o.id} className="grid grid-cols-2 gap-2 border-b border-border py-6 sm:grid-cols-4">
                <span className="font-heading font-semibold">{o.id}</span>
                <span className="text-muted">{o.date}</span>
                <span className="col-span-2 sm:col-span-1">{o.items}</span>
                <span className="sm:text-right">{o.total}, {o.status.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="details" className="md:col-span-4 md:col-start-9">
          <h2 id="details" className="font-heading text-heading">Details</h2>
          <form className="mt-8 space-y-6">
            <div><label className="label" htmlFor="acc-name">Name</label><input id="acc-name" className="field" defaultValue="Rita Almeida" autoComplete="name" /></div>
            <div><label className="label" htmlFor="acc-email">Email</label><input id="acc-email" type="email" className="field" defaultValue="rita@example.com" autoComplete="email" /></div>
            <div><label className="label" htmlFor="acc-address">Delivery address</label><input id="acc-address" className="field" defaultValue="Rua das Flores 12, 4050-265 Porto" autoComplete="street-address" /></div>
            <button type="submit" className="btn btn-primary">Save details</button>
          </form>
        </section>
      </div>
    </>
  );
}
