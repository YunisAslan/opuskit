import { redirect } from 'next/navigation'

// The plan now lives inside the showcase builder (/kit, step 3).
export default function PlanPage() { redirect('/kit?step=create') }
