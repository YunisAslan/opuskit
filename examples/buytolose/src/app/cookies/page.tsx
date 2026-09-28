import type { Metadata } from "next";
import { PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Cookies() {
  return (
    <>
      <PageIntro word="COOKIES" title="Cookie policy">Last updated 1 September 2026.</PageIntro>
      <Prose>
        <h2>Necessary</h2>
        <p>Your bag is kept in your browser&apos;s local storage so it survives a refresh. Checkout and sign-in set session cookies. These cannot be switched off because the shop does not work without them.</p>
        <h2>Analytics</h2>
        <p>If you accept, we count page views and device types with a privacy-friendly analytics tool. No cross-site tracking, no advertising profiles.</p>
        <h2>Marketing</h2>
        <p>None. We do not run ad pixels.</p>
        <h2>Changing your mind</h2>
        <p>Clear this site&apos;s data in your browser settings at any time, or email privacy@buytolose.com.</p>
      </Prose>
    </>
  );
}
