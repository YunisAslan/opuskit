import SectionHeader from "@/components/SectionHeader";

/** Plain reading page for legal/utility content: one heading, one narrow column. */
export default function LegalPage({ label, title, updated, children }: { label: string; title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="grid-24 px-4 pt-40 pb-32 lg:px-8">
      <div className="col-span-24 md:col-span-7 md:col-start-2">
        <SectionHeader index="—" label={label} as="h1">{title}</SectionHeader>
        <p className="t-utility mt-6 text-muted">Last updated {updated}</p>
      </div>
      <div className="col-span-24 mt-12 flex max-w-[65ch] flex-col gap-6 md:col-span-11 md:col-start-11 md:mt-0 [&_h2]:t-utility [&_h2]:mt-6 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}
