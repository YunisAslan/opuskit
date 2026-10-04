// A chapter opens on one word, set far bigger than anything else and cropped at the screen edges. On desktop it slides
// 8% sideways over the band's own scroll range (a CSS scroll-driven animation, so no script runs); on phones it is
// bigger still and stands still; with reduced motion it stands still everywhere.
// `as` makes the word the chapter's real heading; without it the word is decoration (aria-hidden) and the section
// below carries its own heading.
export function ChapterWord({ word, as, side = 'left' }: { word: string; as?: 'h1' | 'h2'; side?: 'left' | 'right' }) {
  const Tag = as ?? 'p'
  return (
    <div className="chapter-band overflow-hidden" data-side={side} aria-hidden={as ? undefined : true}>
      <Tag className="chapter-word">{word}</Tag>
    </div>
  )
}
