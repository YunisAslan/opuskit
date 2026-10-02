import type { Metadata, Viewport } from "next";
import { Hubot_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/pieces/SmoothScroll";
import { BuyProvider } from "@/components/Buy";
import { Nav, MobileBuyBar } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { MotifLayer } from "@/components/Motif";
import { Reveals } from "@/components/Reveals";
import { Toaster } from "@/components/ui/sonner";

// Hubot Sans for display and headings (wide: the width axis), IBM Plex Sans for body and labels.
const hubot = Hubot_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-hubot", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-plex", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Halvik 65, a compact aluminium keyboard", template: "%s | Halvik" },
  description: "Halvik 65 is a compact mechanical keyboard in a powder-coated aluminium case, with hot-swap switches and a matching dial pad. From $159.",
};

export const viewport: Viewport = { themeColor: "#9D91E3" };

// Set before first paint, so reveal-on-scroll content starts hidden only when JavaScript is there to reveal it.
const revealOn = "document.documentElement.classList.add('reveal-on')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hubot.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: revealOn }} />
        <SmoothScroll />
        <BuyProvider>
          <Nav />
          <main>{children}</main>
          <SiteFooter />
          <MobileBuyBar />
          <MotifLayer />
        </BuyProvider>
        <Reveals />
        <Toaster />
      </body>
    </html>
  );
}
