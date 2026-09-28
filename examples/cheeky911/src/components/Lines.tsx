// Manually split headline lines for the line-by-line reveal. Pass className per line to vary width.
export default function Lines({ lines }: { lines: (string | [string, string])[] }) {
  return (
    <>
      {lines.map((l, i) => {
        const [text, cls] = typeof l === 'string' ? [l, ''] : l
        return (
          <span key={i} className={`line ${cls}`}>
            <span>{text}</span>
          </span>
        )
      })}
    </>
  )
}
