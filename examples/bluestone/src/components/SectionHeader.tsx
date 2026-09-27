import Lines from "./Lines";

// Index number, label, heading. `card` renders it as a centred title card
// between chapters.
type Props = {
  index: string;
  label: string;
  heading: string[];
  card?: boolean;
};

export default function SectionHeader({ index, label, heading, card }: Props) {
  if (card) {
    return (
      <div className="container-inner flex flex-col items-center py-32 text-center md:py-40">
        <p className="t-utility mb-6 text-muted">
          {index} — {label}
        </p>
        <Lines lines={heading} className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em]" />
      </div>
    );
  }
  return (
    <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:gap-6">
      <p className="t-utility text-muted md:col-span-3">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <Lines lines={heading} className="t-heading md:col-span-9" as="h2" />
    </div>
  );
}
