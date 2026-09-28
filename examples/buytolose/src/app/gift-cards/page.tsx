import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";
import { GiftCardForm } from "./GiftCardForm";

export const metadata: Metadata = { title: "Gift Cards" };

export default function GiftCards() {
  return (
    <>
      <PageIntro word="GIFT" title="Gift cards">Sent by email the moment you pay. Valid for two years on anything we sell.</PageIntro>
      <GiftCardForm />
    </>
  );
}
