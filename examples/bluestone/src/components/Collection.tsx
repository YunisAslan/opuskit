import MediaAsset from "./MediaAsset";
import Lines from "./Lines";
import type { AssetId } from "@/config/assets";

const pieces: { id: AssetId; name: string; note: string }[] = [
  { id: "pieceCushion", name: "Cushion Halo", note: "Ring · 18k white gold · 1.1 ct" },
  { id: "pieceSphere", name: "Sphere Pavé", note: "Ring · 18k white gold · 212 stones" },
  { id: "pieceHalo", name: "Halo Drop", note: "Studs · 18k white gold · 0.8 ct" },
];

export default function Collection() {
  return (
    <section id="collection" aria-label="Collection">
      {/* Full-height film with the title over the lower third */}
      <div className="relative h-svh min-h-[560px] text-background">
        <MediaAsset id="collectionFilm" className="absolute! inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(43,38,32,0.8),rgba(43,38,32,0)_55%)]" />
        <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
          <div className="container-inner grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <p className="t-utility mb-4 text-secondary">Collection 07 · Autumn / Winter 2026</p>
              <Lines as="h2" lines={["Emberstone"]} className="t-display mb-6" />
              <div data-reveal="fade">
                <p className="measure max-w-[46ch] text-background/85">
                  Twelve pieces shaped by basalt, heat and slow-moving mist. Each stone is set low and
                  close to the metal, so it catches light the way embers do: quietly, and from within.
                  Made to order in our atelier over six weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three key pieces */}
      <div className="container-inner py-32 md:py-40">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
          {pieces.map((p, i) => (
            <li key={p.id} className={i === 1 ? "md:mt-24" : ""}>
              <MediaAsset id={p.id} className="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
              <div data-reveal="fade" className="mt-4 space-y-1">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{p.name}</h3>
                <p className="t-utility text-muted">{p.note}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-16 text-center">
          <a href="#shop" className="t-utility link link-static text-primary">
            Discover the collection
          </a>
        </div>
      </div>
    </section>
  );
}
