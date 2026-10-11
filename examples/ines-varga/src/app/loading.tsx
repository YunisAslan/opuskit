// Moving between pages: a quiet skeleton in the shapes of what is coming — a heading bar and picture blocks — in
// the site's own tones. Its shimmer is slow and linear, and still under reduced motion.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="px-(--gutter) pb-(--section-y) pt-28 md:pt-36">
      <div className="skeleton h-[clamp(3rem,9vw,7.5rem)] w-3/4 rounded-(--radius-media)" />
      <div className="skeleton mt-4 h-[clamp(3rem,9vw,7.5rem)] w-1/2 rounded-(--radius-media)" />
      <div className="grid-site mt-12 gap-y-6">
        <div className="skeleton col-span-full aspect-square rounded-(--radius-media) lg:col-span-7" />
        <div className="col-span-full space-y-3 lg:col-span-4 lg:col-start-9">
          <div className="skeleton h-5 w-full rounded-(--radius-button)" />
          <div className="skeleton h-5 w-5/6 rounded-(--radius-button)" />
          <div className="skeleton h-5 w-2/3 rounded-(--radius-button)" />
        </div>
      </div>
    </div>
  )
}
