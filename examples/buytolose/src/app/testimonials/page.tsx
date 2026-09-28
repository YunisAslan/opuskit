import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";
import { Reveal, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = { title: "Testimonials" };

const quotes = [
  { q: "Wore the hoodie to a festival, slept in it, walked home in it. It still looks better than me.", who: "Joana P., Lisbon", item: "Crossing Hoodie" },
  { q: "The sling fell off a moped in Rome. The bag was fine. The moped was not.", who: "Marco D., Rome", item: "Star Sling" },
  { q: "I ordered an M, it was too big, and they had an S at my door two days later before I'd even posted the M back.", who: "Hannah K., Berlin", item: "Crossing Sweatpant" },
  { q: "The cap is the only one I own that actually looks right backwards.", who: "Sami R., Porto", item: "Backwards Cap" },
  { q: "Bought the crisps as a joke. Now I buy them every Friday.", who: "Léa M., Lyon", item: "Sparko Crisps" },
];

export default function Testimonials() {
  return (
    <>
      <PageIntro word="SAID" title="What customers say">Unedited, from order emails and reviews. We asked before posting.</PageIntro>
      <Reveal as="ul" className="container-content grid gap-6 pb-32 md:grid-cols-2 md:pb-40">
        {quotes.map((t) => (
          <RevealItem as="li" key={t.who} className="rounded-3xl bg-surface p-6 md:p-12">
            <figure>
              <blockquote className="font-heading text-heading">“{t.q}”</blockquote>
              <figcaption className="mt-6 font-utility text-utility text-muted">{t.who}, on the {t.item}</figcaption>
            </figure>
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
