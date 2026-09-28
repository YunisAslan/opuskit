import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";
import { ProductCard } from "@/components/ProductCard";
import { ProductHighlight } from "@/components/ProductHighlight";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop" };

export default function Shop() {
  return (
    <>
      <PageIntro word="SHOP" title="Shop the Crossing collection">Six things from the Autumn 2026 run. When a size is gone, it is gone.</PageIntro>
      <section aria-label="Products" className="container-content pb-32 md:pb-40">
        <h2 className="sr-only">All products</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {products.map((p, i) => <li key={p.slug}><ProductCard product={p} priority={i < 2} /></li>)}
        </ul>
      </section>
      <ProductHighlight />
    </>
  );
}
