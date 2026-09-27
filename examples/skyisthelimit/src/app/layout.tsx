import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/tokens.css";

const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["600", "700"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: "400" });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: "400", preload: false });

export const metadata: Metadata = {
  title: { default: "SKYISTHELIMIT — art direction with the ceiling removed", template: "%s — SKYISTHELIMIT" },
  description: "An art direction studio working at the edge of type, depth and motion.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <a href="#main" className="t-utility sr-only z-50 bg-surface p-4 min-h-11 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        <Nav />
        <ViewTransition>
          <main id="main" className="flex-1">{children}</main>
        </ViewTransition>
        <Footer />
      </body>
    </html>
  );
}
