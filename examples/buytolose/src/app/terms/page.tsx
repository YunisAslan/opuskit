import type { Metadata } from "next";
import { PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <>
      <PageIntro word="TERMS" title="Terms of service">Last updated 1 September 2026.</PageIntro>
      <Prose>
        <h2>Who we are</h2>
        <p>This shop is run by BUYTOLOSE Lda, registered in Porto, Portugal. By ordering you agree to these terms.</p>
        <h2>Orders and prices</h2>
        <p>Prices are in euros and include Portuguese VAT. A contract is formed when we email your shipping confirmation. If we cannot fulfil an order, we refund it in full.</p>
        <h2>Right of withdrawal</h2>
        <p>EU customers may cancel within 14 days of delivery without giving a reason. Our own returns window is 30 days; see Shipping and Returns.</p>
        <h2>Liability</h2>
        <p>We are liable for products that are faulty on arrival, as set out in EU consumer law. We are not liable for damage caused by misuse, including throwing your sling off a building. We tried that already.</p>
        <h2>Disputes</h2>
        <p>Portuguese law applies. You may also use the EU Online Dispute Resolution platform.</p>
      </Prose>
    </>
  );
}
