import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import { CartProvider } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["600", "700"] });
const onest = Onest({ variable: "--font-onest", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "BUYTOLOSE", template: "%s | BUYTOLOSE" },
  description: "Fleece, carry and snacks from one Porto workshop, made in runs of two hundred.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${onest.variable} antialiased`}>
      <body className="min-h-svh overflow-x-clip font-body text-body">
        <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]">Skip to content</a>
        <CartProvider>
          <SmoothScroll />
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
