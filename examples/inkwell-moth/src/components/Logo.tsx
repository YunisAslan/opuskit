import { LogoMark } from './Drawings'

// The logo: the inkwell-and-moth mark beside the name, set in the marker face like a label on a jar.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className ?? ''}`}>
      <LogoMark className="h-10 w-10 shrink-0 -rotate-3" />
      <span className="font-(family-name:--font-display) text-[1.35rem] leading-[1.05]">Inkwell<br /><span className="font-(family-name:--font-heading) font-bold">&amp;</span> Moth</span>
    </span>
  )
}
