import Lines from './Lines'

type Props = { label?: string; title: string[]; mobile?: string[]; className?: string }

// Consistent section name: optional label in the utility face, heading below a full rule.
export default function SectionHeader({ label, title, mobile, className = '' }: Props) {
  return (
    <div className={`grid gap-4 border-t-2 border-border pt-4 md:grid-cols-12 md:gap-6 ${className}`}>
      {label && <p className="type-utility text-muted md:col-span-3">{label}</p>}
      <Lines lines={title} mobile={mobile} className={`type-heading ${label ? 'md:col-span-9' : 'md:col-span-12'}`} />
    </div>
  )
}
