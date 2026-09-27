import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Space_Mono } from "next/font/google";
import MotionRoot from "@/components/MotionRoot";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Bluestone — Fine jewellery, formed in stone",
  description:
    "Diamond rings and earrings from the Bluestone atelier. Collection 07, Emberstone: pieces set in volcanic light.",
};

export const viewport: Viewport = { themeColor: "#2B2620" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
