import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Bag" };

export default function Cart() {
  return (
    <>
      <PageIntro word="BAG" title="Your bag" />
      <CartView />
    </>
  );
}
