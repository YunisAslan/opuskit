import { Badge } from '@/components/ui/badge'
import { statusLabel, type Status } from '@/data/houses'

// Availability, outlined (hairline): free houses on the ground colour, reserved and sold quieter.
export function StatusBadge({ status }: { status: Status }) {
  const tone = status === 'available' ? 'bg-(--color-background) text-(--color-text) border-(--color-text)' : status === 'reserved' ? 'bg-(--color-surface) text-(--color-muted) border-(--color-border)' : 'bg-(--color-text) text-(--color-background) border-(--color-text)'
  return <Badge variant="outline" className={`type-utility h-6 rounded-(--radius-button) px-2 ${tone}`}>{statusLabel[status]}</Badge>
}
