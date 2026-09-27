import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = { title: "FAQ", description: "Straight answers before you start something." };

const faqs = [
  { q: "What do you actually make?", a: "Art direction for the web: the type system, the colour, how media is cropped and how things move. We design and build, so the idea survives into the browser." },
  { q: "Is all of this 3D going to make my site slow?", a: "No. One real-time scene per page, lazy-loaded, paused when off-screen. Phones and reduced-motion settings get a still image. We test against real Core Web Vitals targets, not a fast laptop." },
  { q: "Can people still find their way around?", a: "Yes. We break the grid on purpose, never the navigation. Menus stay where people expect them, and every section keeps one clear anchor." },
  { q: "How long does a project take?", a: "Most identity-plus-site projects run six to ten weeks. Smaller experiments — a campaign page, a single interactive piece — can take two to three." },
  { q: "Do you work with our existing brand?", a: "Often. We push an existing identity further rather than replacing it, unless the brief is to start fresh." },
  { q: "What does it cost?", a: "Every project is scoped individually. Tell us what you want to make and when; we reply with a fixed price and a plan within a week." },
];

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="grid-24 gap-y-12 px-4 pt-40 pb-40 lg:px-8">
      <div className="col-span-24 md:col-span-7 md:col-start-2">
        <SectionHeader index="01" label="FAQ" as="h1">
          <span id="faq-title">Questions worth asking.</span>
        </SectionHeader>
      </div>
      <ul className="col-span-24 border-t border-border md:col-span-11 md:col-start-11">
        {faqs.map((f, i) => (
          <li key={f.q} className="border-b border-border">
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-baseline gap-4 py-6 hover:bg-secondary [&::-webkit-details-marker]:hidden">
                <span className="t-utility text-muted">0{i + 1}</span>
                <span className="t-heading flex-1">{f.q}</span>
                <span aria-hidden className="t-utility group-open:hidden">+</span>
                <span aria-hidden className="t-utility hidden group-open:inline">−</span>
              </summary>
              <p className="max-w-[60ch] pb-6 pl-10">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
