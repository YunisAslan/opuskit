// Between pages: a quiet skeleton in the shapes of what is coming — a heading bar, a picture block, a column of rows.
// The shimmer is slow (linear 1.6s) and stands still under reduced motion.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="px-(--gutter) pt-[calc(var(--section-y)+64px)] pb-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="skeleton h-[clamp(4rem,9vw,8rem)] w-2/3 md:w-1/3" />
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <div className="skeleton aspect-[3/2] md:col-span-7" />
          <div className="space-y-4 md:col-span-4 md:col-start-9">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-6 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
