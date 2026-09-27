import MediaAsset from "./MediaAsset";
import type { AssetId } from "@/config/assets";

export type Product = {
  name: string;
  category: "rings" | "earrings";
  metal: string;
  price: number;
  availability: "In stock" | "Made to order" | "Last one";
  image: AssetId;
  alt: AssetId;
};

const price = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// Image (4:5) with alternate on hover, name, price, availability.
export default function ProductCard({ p }: { p: Product }) {
  return (
    <li data-cat={p.category} className="card">
      <div className="relative">
        <MediaAsset id={p.image} className="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" />
        <MediaAsset
          id={p.alt}
          decorative
          reveal={false}
          className="card-alt absolute! inset-0"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
        <h3 className="font-display text-lg leading-tight font-bold tracking-[-0.02em]">{p.name}</h3>
        <p className="text-sm tabular-nums">{price.format(p.price)}</p>
      </div>
      <p className="t-utility mt-1 text-muted">
        {p.metal} · <span className={p.availability === "Last one" ? "text-accent" : ""}>{p.availability}</span>
      </p>
    </li>
  );
}
