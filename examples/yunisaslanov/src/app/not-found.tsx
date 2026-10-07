import { SiteLink } from '@/components/SiteLink'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-end px-(--gutter) pb-(--section-y) pt-40">
      <h1 className="type-display [font-size:15vw] md:ml-[calc(1/24*100%)] md:[font-size:9vw]">This page<br />wandered off.</h1>
      <p className="type-body mt-10 max-w-[44ch] md:ml-[calc(1/24*100%)]">
        It happens to the best of us. Try the <SiteLink href="/projects">projects</SiteLink>, or start again at the <SiteLink href="/">front door</SiteLink>.
      </p>
    </section>
  )
}
