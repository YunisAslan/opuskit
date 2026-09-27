import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Lines } from "@/components/Reveal";

// Broken on purpose: lines step across the grid; the left edge of "We don’t" is the anchor.
const desktop = [
  "We don’t",
  <span key="2" className="ml-[29vw]">decorate</span>,
  <span key="3" className="ml-[12vw]">the sky.</span>,
  <span key="4" className="ml-[33vw]">We <span className="bg-secondary px-[0.08em]">direct</span> it.</span>,
];
const mobile = [
  "We don’t",
  "decorate",
  "the sky.",
  <span key="4">We <span className="bg-secondary px-[0.08em]">direct</span></span>,
  "it.",
];

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="manifesto" className="grid-24 px-4 pt-40 pb-60 lg:px-8">
        <SectionHeader index="02" label="Manifesto" className="col-span-24 mb-12 md:col-span-5 md:col-start-2" />
        <h2 id="manifesto" className="t-display col-span-24 md:col-span-23 md:col-start-2">
          <Lines lines={desktop} className="hidden md:block" />
          <Lines lines={mobile} className="md:hidden" />
        </h2>
        <p className="col-span-24 mt-16 max-w-[52ch] md:col-span-7 md:col-start-3">
          Type with edges, depth you can lean into, motion that means something. Every project starts with one question:
          what would this look like with nothing holding it down? Then we put one thing back — a grid, a colour, a rule —
          so the idea has something to push against.
        </p>
      </section>
    </>
  );
}
