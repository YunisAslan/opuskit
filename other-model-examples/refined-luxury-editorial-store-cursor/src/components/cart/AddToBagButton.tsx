'use client'
import { toast } from 'sonner'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useCart } from '@/components/cart/cart-context'

// The one button the store is built around: add a scent to the bag and confirm it with a toast.
export function AddToBagButton({
  slug,
  name,
  qty = 1,
  option,
  label = 'Add to bag',
  ...props
}: { slug: string; name: string; qty?: number; option?: string; label?: string } & Omit<ButtonProps, 'onClick'>) {
  const { add } = useCart()
  return (
    <Button
      {...props}
      onClick={() => {
        add(slug, qty, option)
        toast.success(`${name} added to your bag`, { description: 'Posted from the studio within two days.' })
      }}
    >
      {label}
    </Button>
  )
}