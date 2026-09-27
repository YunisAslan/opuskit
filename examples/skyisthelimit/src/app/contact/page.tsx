import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact", description: "Start something with SKYISTHELIMIT." };

export default function Contact() {
  return (
    <section aria-labelledby="contact-title" className="grid-24 gap-y-12 px-4 pt-40 pb-60 lg:px-8">
      <SectionHeader index="01" label="Contact" className="col-span-24 md:col-span-5 md:col-start-2" />
      <h1 id="contact-title" className="t-display col-span-24 md:col-span-22 md:col-start-2">
        <span className="hidden md:block">
          Bring the<br />
          <span className="ml-[20vw]">brief.</span><br />
          We’ll bring<br />
          <span className="ml-[32vw]">the sky.</span>
        </span>
        <span className="md:hidden">Bring the<br />brief.<br />We’ll<br />bring the<br />sky.</span>
      </h1>
      <div className="col-span-24 flex flex-col gap-6 md:col-span-11 md:col-start-8">
        <a
          href={`mailto:${site.email}?subject=Start%20something`}
          className="t-heading flex min-h-24 items-center justify-between gap-4 border border-border bg-primary px-6 text-background hover:bg-secondary hover:text-text"
        >
          Start something <span aria-hidden>→</span>
        </a>
        <p className="t-utility text-muted">
          Or write directly: <a href={`mailto:${site.email}`} className="link-fill text-text">{site.email}</a> · Replies within two working days
        </p>
        <p className="t-utility text-muted">{site.address}</p>
      </div>
    </section>
  );
}
