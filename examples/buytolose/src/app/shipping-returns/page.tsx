import type { Metadata } from "next";
import { PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function Shipping() {
  return (
    <>
      <PageIntro word="SHIP" title="Shipping and returns">What it costs, how long it takes and how to send it back.</PageIntro>
      <Prose>
        <h2>Shipping</h2>
        <ul>
          <li>Portugal: €4, 1 to 2 working days.</li>
          <li>EU: €8, 2 to 5 working days. Free over €150.</li>
          <li>UK, US and rest of world: €18, 4 to 9 working days. Duties are charged on delivery.</li>
        </ul>
        <p>We pack on weekdays. Orders placed before 13:00 Lisbon time leave the same day. You get a tracking link by email as soon as the parcel is scanned.</p>
        <h2>Returns</h2>
        <p>You have 30 days from delivery to return anything unworn with its tags on. Returns within the EU are free: request a label from your account or by email and drop the parcel at any CTT or DPD point.</p>
        <p>Refunds go back to the original payment method within 5 working days of the parcel reaching us. Gift cards and crisps cannot be returned.</p>
        <h2>Exchanges</h2>
        <p>Need another size? Email us your order number and we hold the new size for 14 days while the first one travels back.</p>
      </Prose>
    </>
  );
}
