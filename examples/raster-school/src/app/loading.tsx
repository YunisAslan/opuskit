// While a page loads: a quiet skeleton in the shapes of what is coming — the rule, a display heading, picture blocks.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="px-(--gutter) pt-[calc(var(--nav-top)+var(--nav-h)+clamp(56px,8vw,112px))] pb-(--section-y)">
      <div className="raster gap-y-4">
        <div className="skeleton col-span-4 h-[clamp(3rem,9vw,8.5rem)] sm:col-span-5 lg:col-span-8" />
        <div className="skeleton col-span-3 h-[clamp(3rem,9vw,8.5rem)] sm:col-span-3 lg:col-span-5" />
      </div>
      <div className="raster mt-16 gap-y-(--gutter) border-t border-(--color-border) pt-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="skeleton col-span-4 aspect-[4/3] sm:col-span-2 lg:col-span-4" />
        ))}
      </div>
    </div>
  )
}
