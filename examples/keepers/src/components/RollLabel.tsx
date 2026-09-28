// Label rendered as letters; CSS rolls each letter up and a copy in from below on hover.
export default function RollLabel({ children }: { children: string }) {
  return (
    <span className="roll" aria-hidden="true">
      {[...children].map((l, i) => (
        <span key={i} data-l={l} style={{ '--i': i } as React.CSSProperties}>
          {l}
        </span>
      ))}
    </span>
  )
}
