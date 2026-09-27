/** Index number, label, heading — static. Pass `as="h1"` when the section opens the page. */
export default function SectionHeader({
  index,
  label,
  children,
  as: H = "h2",
  className = "",
}: {
  index: string;
  label: string;
  children?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="t-utility flex gap-4">
        <span className="bg-secondary px-1">{index}</span>
        <span className="text-muted">{label}</span>
      </p>
      {children && <H className="t-heading mt-4">{children}</H>}
    </div>
  );
}
