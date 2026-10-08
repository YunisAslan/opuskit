// The raster: the page's own columns drawn as 1px hairlines behind everything — 4 on phones, 6 on tablets, 12 on
// desktop, on exactly the lines every section lays its text on. Bands (surface, inverse) cover it; the ground shows it.
import { cn } from '@/lib/utils'

export function Raster() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 px-(--gutter)">
      <div className="raster h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={cn(
              'border-l border-(--color-border)/70',
              i >= 4 && 'max-sm:hidden',
              i >= 6 && 'max-lg:hidden',
              i === 3 && 'max-sm:border-r',
              i === 5 && 'sm:max-lg:border-r',
              i === 11 && 'border-r',
            )}
          />
        ))}
      </div>
    </div>
  )
}
