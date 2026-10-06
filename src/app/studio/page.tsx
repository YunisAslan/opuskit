import { redirect } from 'next/navigation'

// The Studio is the Collection (in the header) plus its steps; its own address goes to the first step.
export default function StudioPage() {
  redirect('/studio/brand')
}
