import { redirect } from 'next/navigation'
import { projects } from '@/config/site'

// The Projects page is one project in full; the menu opens on the newest.
export default function Projects() { redirect(`/projects/${projects[0].slug}`) }
