import Link from "next/link";
import { MediaAsset } from "@/components/MediaAsset";

export default function NotFound() {
  return (
    <section className="relative h-svh overflow-hidden">
      <MediaAsset id="secondaryVideo" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-content pb-12 md:pb-16">
          <p aria-hidden className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] font-bold tracking-[-0.05em]">404</p>
          <h1 className="mt-6 font-heading text-heading">You went down. This page did too.</h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-primary">Back to the start</Link>
            <Link href="/shop" className="btn btn-secondary">Shop the collection</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
