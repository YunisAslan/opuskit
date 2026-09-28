import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section aria-labelledby="cta" className="container-content grid grid-cols-12 gap-6 pt-40 pb-32 md:pt-60 md:pb-40">
      <div className="col-span-12 md:col-span-9">
        <h1 id="cta" className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-bold tracking-[-0.04em]">
          Write to us. <br className="hidden md:block" />A person answers.
        </h1>
        <p className="mt-8 max-w-[48ch] text-lg">Orders, returns, wholesale or a sleeve that came loose. We reply within one working day, usually faster.</p>
        <a href="mailto:hello@buytolose.com" className="btn btn-primary mt-12 min-h-16 w-full px-10 text-lg sm:w-auto">Start a conversation</a>
        <p className="mt-6">
          <a href="mailto:hello@buytolose.com" className="link inline-flex min-h-11 items-center font-heading text-heading">hello@buytolose.com</a>
        </p>
        <p className="mt-4 text-muted">Rua do Almada 88, Porto. Studio open Saturdays, 11:00 to 17:00.</p>
      </div>
    </section>
  );
}
