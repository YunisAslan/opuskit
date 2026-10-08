// One type system for every page: the h1 poster, the section h2, and the small things — shared so headings of one
// level are one size everywhere.
export const t = {
  h1: 'type-poster [font-size:min(clamp(4.75rem,10.5vw,10rem),16.5svh)]',
  /** the h1 of Menu and Reservations */
  page: 'type-poster [font-size:clamp(3.2rem,8.6vw,8rem)]',
  h2: 'type-poster [font-size:clamp(2.6rem,6.2vw,5.75rem)]',
  h3: 'type-heading',
  lead: 'type-body [font-size:clamp(1.0625rem,1.3vw,1.1875rem)] text-(--color-muted) max-w-[52ch]',
  label: 'type-utility text-(--color-muted)',
  section: 'px-(--gutter) py-(--section-y)',
  wrap: 'mx-auto max-w-(--container)',
}
