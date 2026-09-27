import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Lookbook from "@/components/Lookbook";
import Editorial from "@/components/Editorial";
import ProductGrid from "@/components/ProductGrid";
import Journal from "@/components/Journal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="t-utility sr-only z-[70] bg-background p-4 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <span id="top" />
        <Hero />
        <Collection />
        <Lookbook />
        <Editorial />
        <ProductGrid />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
