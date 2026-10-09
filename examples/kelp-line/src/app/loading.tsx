// A quiet skeleton in the shapes of what is coming: a heading, a line, a picture. Slow linear shimmer; still when
// motion is reduced.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="section-pad first-pad">
      <div className="frame grid gap-10 md:grid-cols-12">
        <div className="space-y-5 md:col-span-6">
          <div className="skeleton h-[clamp(2.6rem,6vw,5.5rem)] w-[85%] rounded-(--radius-button)" />
          <div className="skeleton h-[clamp(2.6rem,6vw,5.5rem)] w-[60%] rounded-(--radius-button)" />
          <div className="skeleton mt-8 h-4 w-[70%] rounded-(--radius-button)" />
          <div className="skeleton h-4 w-[55%] rounded-(--radius-button)" />
        </div>
        <div className="skeleton aspect-[4/5] rounded-(--radius-media) md:col-span-5 md:col-start-8" />
      </div>
    </div>
  )
}
