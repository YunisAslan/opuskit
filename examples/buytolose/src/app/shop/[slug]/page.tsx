import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { MediaAsset } from "@/components/MediaAsset";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/data/products";
import { BuyBox } from "./BuyBox";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p?.name, description: p?.summary };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = products.filter((r) => r.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="container-content grid gap-12 pt-24 pb-32 md:grid-cols-12 md:gap-6 md:pt-32 md:pb-40">
        <div className="grid gap-4 md:col-span-7">
          <ViewTransition name={`product-${p.slug}`} share="auto" default="none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
              <MediaAsset id={p.images[0]} fill priority sizes="(max-width: 767px) 100vw, 58vw" />
            </div>
          </ViewTransition>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
            <MediaAsset id={p.images[1]} fill sizes="(max-width: 767px) 100vw, 58vw" />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <div className="md:sticky md:top-32">
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em]">{p.name}</h1>
            <p className="mt-4 font-heading text-heading">{formatPrice(p.price)}</p>
            <p className="mt-2 font-utility text-utility text-muted">{p.availability}</p>
            <p className="mt-8 max-w-[48ch]">{p.summary}</p>
            <BuyBox product={p} />
            <ul className="mt-10 border-t border-border">
              {p.details.map((d) => <li key={d} className="border-b border-border py-3">{d}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section aria-labelledby="related" className="container-content pb-32 md:pb-40">
        <h2 id="related" className="font-heading text-heading">Also in the run</h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {related.map((r) => <li key={r.slug}><ProductCard product={r} /></li>)}
        </ul>
      </section>
    </>
  );
}
