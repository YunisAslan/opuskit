type Props = {
  lines: string[]
  // Manual re-break for < 768px; defaults to the desktop breaks.
  mobile?: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
}

// Headline split into masked lines for the line-by-line reveal.
export default function Lines({ lines, mobile, as: Tag = 'h2', className }: Props) {
  const render = (ls: string[]) => ls.map((l, i) => (
    <span key={i} className="line">
      <span>{l}</span>
    </span>
  ))
  return (
    <Tag data-lines className={className}>
      {mobile ? (
        <>
          <span className="hidden md:block">{render(lines)}</span>
          <span className="md:hidden">{render(mobile)}</span>
        </>
      ) : (
        render(lines)
      )}
    </Tag>
  )
}
