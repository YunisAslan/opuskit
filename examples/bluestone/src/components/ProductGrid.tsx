import ProductCard, { type Product } from "./ProductCard";
import SectionHeader from "./SectionHeader";

const products: Product[] = [
  { name: "Ember Solitaire", category: "rings", metal: "18k white gold", price: 84500, availability: "In stock", image: "p1a", alt: "p1b" },
  { name: "Dune Pavé", category: "rings", metal: "18k yellow gold", price: 112000, availability: "Made to order", image: "p2a", alt: "p2b" },
  { name: "Halo Studs", category: "earrings", metal: "18k white gold", price: 68900, availability: "In stock", image: "p3a", alt: "p3b" },
  { name: "Cushion Halo", category: "rings", metal: "18k white gold", price: 146000, availability: "Made to order", image: "p4a", alt: "p4b" },
  { name: "Sphere Pavé", category: "rings", metal: "18k white gold", price: 98500, availability: "Last one", image: "p5a", alt: "p5b" },
  { name: "Tension Solitaire", category: "rings", metal: "Platinum", price: 124000, availability: "In stock", image: "p6a", alt: "p6b" },
  { name: "Halo Drop Studs", category: "earrings", metal: "18k white gold", price: 91200, availability: "Made to order", image: "p7a", alt: "p7b" },
  { name: "Solace Halo", category: "rings", metal: "18k yellow gold", price: 104500, availability: "In stock", image: "p8a", alt: "p8b" },
];

const filters = [
  { id: "f-all", label: "All" },
  { id: "f-rings", label: "Rings" },
  { id: "f-earrings", label: "Earrings" },
];

// Filters are native radios; the grid hides via CSS :has() — no JS.
export default function ProductGrid() {
  return (
    <section id="shop" aria-label="Shop" className="shop container-inner py-32 md:py-40">
      <SectionHeader index="IV" label="Shop" heading={["The Emberstone pieces"]} />

      <fieldset className="mb-10 flex flex-wrap gap-6 border-b border-border pb-4">
        <legend className="sr-only">Filter by category</legend>
        {filters.map((f, i) => (
          <label key={f.id} className="filter t-utility flex min-h-11 cursor-pointer items-center text-muted">
            <input type="radio" name="category" id={f.id} defaultChecked={i === 0} className="sr-only" />
            <span className="link">{f.label}</span>
          </label>
        ))}
      </fieldset>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </ul>
    </section>
  );
}
