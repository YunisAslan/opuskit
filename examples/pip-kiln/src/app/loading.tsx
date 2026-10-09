// Between pages: a quiet skeleton in the shapes of what's coming — a heading bar and picture blocks. The shimmer is
// slow (1.6s linear) and stands still under reduced motion.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="px-(--gutter) pb-(--section-y) pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container)">
        <div className="skeleton h-[clamp(3rem,9vw,8rem)] w-2/3 rounded-(--radius-button)" />
        <div className="skeleton mt-6 h-5 w-1/3 rounded-(--radius-button)" />
        <div className="mt-16 grid grid-cols-2 gap-(--gutter) md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton aspect-(--ratio-card) rounded-(--radius-media)" />)}
        </div>
      </div>
    </div>
  )
}
