import type { CSSProperties } from "react"

// Links that roll on hover: the label is set twice; on hover (fine pointers only, see globals.css)
// each letter of the first copy rolls up and the second rolls in from below, 12ms apart.
export function RollLabel({ children }: { children: string }) {
  const letters = (k: string) =>
    [...children].map((ch, i) => (
      <span key={k + i} className="ch" style={{ "--c": i } as CSSProperties}>
        {ch}
      </span>
    ))
  return (
    <span className="roll">
      <span>{letters("a")}</span>
      <span aria-hidden>{letters("b")}</span>
    </span>
  )
}
