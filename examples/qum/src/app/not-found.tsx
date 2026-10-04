import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/site/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader title="You have wandered off the path" line="This page is not here, or it has moved. It happens; the lake moves a little every year too." />
      <div className="flex flex-wrap gap-3 px-(--gutter) pb-(--section-y) pt-6">
        <div className="mx-auto flex w-full max-w-(--container) flex-wrap gap-3">
          <Button asChild><Link href="/">Back to the start</Link></Button>
          <Button asChild variant="outline"><Link href="/shop">See the six</Link></Button>
        </div>
      </div>
    </>
  )
}
