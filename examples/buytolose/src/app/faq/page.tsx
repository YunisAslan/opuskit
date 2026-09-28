import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { PageIntro } from "@/components/Page";

export const metadata: Metadata = { title: "FAQ" };

const items = [
  { q: "Will the fleece shrink?", a: "It is garment-dyed and pre-washed, so it has already shrunk as much as it will. Wash cold, dry flat, and it stays the size you bought." },
  { q: "What if my size sells out?", a: "Each run is two hundred pieces and we do not restock the same colour. Sign up and we email you the day the next run opens." },
  { q: "How long does delivery take?", a: <>1 to 2 working days in Portugal, 2 to 5 across the EU. Full details on <Link className="link" href="/shipping-returns">shipping and returns</Link>.</> },
  { q: "Can I return something?", a: "Yes, within 30 days if it is unworn with tags. EU returns are free. Gift cards and crisps are final sale." },
  { q: "Where is it made?", a: "Everything we sew is made by two workshops in Porto, a ten-minute walk from our studio. The cups and crisps come from partners in Portugal and Spain." },
  { q: "How should I choose between two sizes?", a: <>Take the larger for the hoodie if you want it loose, the smaller for the sweatpant. The <Link className="link" href="/size-guide">size guide</Link> has flat measurements.</> },
  { q: "Do you ship outside Europe?", a: "Yes, to the UK, US, Canada, Japan and Australia. Import duties are paid by the recipient on delivery." },
];

export default function Faq() {
  return (
    <>
      <PageIntro word="ASK" title="Frequently asked questions">The questions we get most before people buy.</PageIntro>
      <section aria-label="Questions" className="container-content pb-32 md:pb-40">
        <div className="md:max-w-[48rem]"><Accordion items={items} /></div>
      </section>
    </>
  );
}
