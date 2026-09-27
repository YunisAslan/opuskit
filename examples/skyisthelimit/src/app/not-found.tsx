import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid-24 gap-y-12 px-4 pt-40 pb-40 lg:px-8">
      <p className="t-utility col-span-24 md:col-span-5 md:col-start-2">
        <span className="bg-secondary px-1">404</span> <span className="text-muted">Off the map</span>
      </p>
      <h1 className="t-display col-span-24 md:col-span-20 md:col-start-2">
        Wrong turn.<br />
        <span className="md:ml-[18vw]">The sky’s</span><br />
        still up there.
      </h1>
      <div className="col-span-24 flex flex-col gap-6 md:col-span-7 md:col-start-15">
        <p>This page does not exist, or it moved. Head back to the start, or see what we are working on.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="t-utility inline-flex min-h-11 items-center border border-border bg-primary px-4 text-background hover:bg-secondary hover:text-text">Back to home</Link>
          <Link href="/experiment" className="t-utility inline-flex min-h-11 items-center border border-border px-4 hover:bg-secondary">See the archive</Link>
        </div>
      </div>
    </section>
  );
}
