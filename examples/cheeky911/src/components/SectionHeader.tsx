import Lines from './Lines'

// Italic utility label + heading. No index numbers unless the content is a real sequence.
export default function SectionHeader({ label, lines, as: Tag = 'h2', display = false, className = '' }: {
  label?: string
  lines: (string | [string, string])[]
  as?: 'h1' | 'h2'
  display?: boolean
  className?: string
}) {
  return (
    <header>
      {label && <p className="type-utility mb-4 text-muted">{label}</p>}
      <Tag data-reveal="lines" className={`${display ? 'type-display' : 'type-heading'} ${className}`}>
        <Lines lines={lines} />
      </Tag>
    </header>
  )
}
