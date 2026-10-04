import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export function Crumbs({ trail, here }: { trail: { label: string; href: string }[]; here: string }) {
  return (
    <Breadcrumb className="px-(--gutter) pt-8">
      <BreadcrumbList className="type-utility mx-auto max-w-(--container) text-(--color-muted)">
        {trail.map((t) => (
          <span key={t.href} className="contents">
            <BreadcrumbItem><BreadcrumbLink asChild><Link href={t.href} className="hover:text-(--color-text)">{t.label}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
          </span>
        ))}
        <BreadcrumbItem><BreadcrumbPage className="text-(--color-text)">{here}</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
