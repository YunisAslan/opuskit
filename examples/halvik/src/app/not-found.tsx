import { Chapter } from "@/components/Chapter";
import { MotionSiteLink } from "@/components/SiteLink";
import { UnderlineFill } from "@/components/pieces/UnderlineFill";

export default function NotFound() {
  return (
    <section className="px-5 pb-32 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <Chapter as="h1" effect slot={{ className: "size-[clamp(2.25rem,5vw,4.5rem)]", rotate: 20, first: true }} className="type-display [font-size:clamp(2.5rem,6.5vw,6rem)]">This key isn’t mapped</Chapter>
        <p className="type-body mt-6 max-w-[46ch] text-(--color-muted)">The page you pressed for doesn’t exist, or it moved. Everything else is still where you left it.</p>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 type-body">
          <UnderlineFill link={MotionSiteLink} href="/">Back to Halvik 65</UnderlineFill>
          <UnderlineFill link={MotionSiteLink} href="/contact">Ask us</UnderlineFill>
        </p>
      </div>
    </section>
  );
}
