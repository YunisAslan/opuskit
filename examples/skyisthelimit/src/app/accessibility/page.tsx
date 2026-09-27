import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Accessibility", description: "The accessibility standard we aim for and how to report a problem." };

export default function Accessibility() {
  return (
    <LegalPage label="Accessibility" title="Experimental, not exclusive." updated="27 September 2026">
      <p>We aim for WCAG 2.2 level AA across this site. Breaking the grid is a design choice; breaking access is not.</p>
      <h2>What we do</h2>
      <ul>
        <li>Body text is ink on cream at 17:1 contrast.</li>
        <li>Everything works with a keyboard, with a visible focus outline.</li>
        <li>The 3D sky is decoration. Every word it sits behind is real HTML.</li>
        <li>With reduced motion turned on, the sky becomes a still image and nothing slides or drifts.</li>
        <li>The cursor is always your own. We never hijack scrolling.</li>
      </ul>
      <h2>Known limits</h2>
      <p>Some display headlines are very large and may need horizontal room when zoomed past 300%. We are working on it.</p>
      <h2>Report a problem</h2>
      <p>If something gets in your way, email <a href={`mailto:${site.email}`}>{site.email}</a> with the page and what happened. We reply within two working days and fix what we can within two weeks.</p>
    </LegalPage>
  );
}
