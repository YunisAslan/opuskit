import MediaAsset from "./MediaAsset";
import SectionHeader from "./SectionHeader";
import Lines from "./Lines";

// Magazine-style story: letterboxed image, narrow text column, captions in a
// margin rail, one pull quote.
export default function Editorial() {
  return (
    <section id="story" aria-label="Our story">
      <SectionHeader card index="III" label="The atelier" heading={["Made where heat", "meets patience"]} />

      {/* 2.39:1 letterbox crop, full bleed */}
      <figure>
        <MediaAsset id="editorialWide" className="aspect-[4/5] w-full md:aspect-[2.39/1]" />
        <figcaption className="container-inner t-utility mt-3 text-muted">
          Plate 1 — Cushion Halo, photographed on volcanic basalt
        </figcaption>
      </figure>

      <div className="container-inner grid grid-cols-12 gap-6 py-32 md:py-40">
        {/* Margin rail */}
        <aside className="t-utility col-span-12 space-y-6 text-muted md:col-span-3" data-reveal="fade">
          <p>Words — The Bluestone atelier</p>
          <p>Reading time — 2 min</p>
          <p className="hidden md:block">
            Plate 2 — Sphere Pavé, 212 stones set by a single hand over nine days
          </p>
        </aside>

        <div className="col-span-12 md:col-span-6">
          <Lines as="h3" lines={["Nothing here", "is rushed"]} className="t-heading mb-8" />
          <div data-reveal="fade" className="measure space-y-6">
            <p>
              Every Bluestone piece begins as a drawing and a single stone. We choose the diamond
              first, then build the setting around how it wants to hold light, not the other way
              round.
            </p>
            <p>
              Our setters work in small benches of three. A pavé band can take a week; a halo, nine
              days. Each claw is raised, shaped and closed by hand, then checked under a loupe
              before the next is begun.
            </p>
            <blockquote className="-mx-6 my-12 border-y border-border px-6 py-10 md:mx-0 md:px-0">
              <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.03em] text-primary">
                “A stone should look as if it grew there. If you notice the metal first, we start
                again.”
              </p>
              <footer className="t-utility mt-6 text-muted">— Head of setting, Bluestone atelier</footer>
            </blockquote>
            <p>
              The Emberstone collection came from a week spent photographing pieces on volcanic
              rock. The warmth of the basalt, the slow drift of mist and the way a diamond goes quiet
              in low light all found their way back into the bench.
            </p>
            <p>
              What you wear is made for you, to order, and finished only when it is right. That
              takes six weeks. We think it is worth the wait.
            </p>
          </div>
          <a href="#contact" className="t-utility link link-static mt-10 inline-block text-primary">
            Start a conversation
          </a>
        </div>

        <MediaAsset
          id="editorialDetail"
          className="col-span-12 mt-12 aspect-[4/5] md:col-span-3 md:mt-48"
          sizes="(min-width: 768px) 25vw, 100vw"
        />
      </div>
    </section>
  );
}
