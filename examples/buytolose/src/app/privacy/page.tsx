import type { Metadata } from "next";
import { PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <>
      <PageIntro word="PRIVATE" title="Privacy policy">Last updated 1 September 2026.</PageIntro>
      <Prose>
        <h2>What we collect</h2>
        <p>When you order: your name, email, delivery address and what you bought. Payment details go straight to our payment provider; we never see or store your card number.</p>
        <p>When you browse: pages visited and device type, only if you accept analytics cookies.</p>
        <h2>What we use it for</h2>
        <ul>
          <li>Delivering orders and handling returns.</li>
          <li>Sending order and shipping emails.</li>
          <li>Sending news about new runs, only if you opted in.</li>
        </ul>
        <h2>Who we share it with</h2>
        <p>Our payment provider, our couriers (CTT and DPD) and our email service. Nobody else, and we never sell it.</p>
        <h2>How long we keep it</h2>
        <p>Order records for 10 years, as Portuguese tax law requires. Marketing preferences until you unsubscribe.</p>
        <h2>Your rights</h2>
        <p>Under GDPR you can see, correct, export or delete your data. Email privacy@buytolose.com and we answer within 30 days. BUYTOLOSE Lda, Rua do Almada 88, 4050-031 Porto, is the data controller.</p>
      </Prose>
    </>
  );
}
