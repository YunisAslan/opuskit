// Headline split into masked lines for the line-by-line reveal.
// Lines are broken by hand in markup (per the motion system), not measured.
type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
};

export default function Lines({ lines, as: Tag = "h2", className = "" }: Props) {
  return (
    <Tag className={className} data-reveal="lines">
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span style={{ "--l": i } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
