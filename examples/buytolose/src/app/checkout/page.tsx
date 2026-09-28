import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function Checkout() {
  return (
    <>
      <PageIntro word="PAY" title="Checkout">Three fields of address, one of email. Then you are done.</PageIntro>
      <CheckoutForm />
    </>
  );
}
