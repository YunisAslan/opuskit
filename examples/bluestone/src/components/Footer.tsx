import Logo from "./Logo";
import Lines from "./Lines";

// Placeholder contact details — replace with the real atelier address.
export default function Footer() {
  return (
    <footer id="contact" className="bg-text text-background">
      <div className="container-inner flex flex-col items-center py-32 text-center md:py-40">
        <p className="t-utility mb-6 text-secondary">Private viewings, by appointment</p>
        <Lines as="p" lines={["Start a", "conversation"]} className="t-display" />
        <a href="mailto:atelier@bluestone.example" className="t-utility link link-static mt-10 text-secondary">
          atelier@bluestone.example
        </a>
      </div>

      <div className="container-inner grid grid-cols-1 gap-12 border-t border-background/15 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 text-sm text-background/80">
          <Logo className="mb-4 text-background" />
          <address className="not-italic">
            Bluestone Atelier
            <br />
            Street address, City
          </address>
          <p>
            <a href="mailto:atelier@bluestone.example" className="link">atelier@bluestone.example</a>
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <p className="t-utility mb-4 text-secondary">Explore</p>
          <ul className="space-y-2">
            {[
              ["#collection", "Collection"],
              ["#lookbook", "Lookbook"],
              ["#story", "Story"],
              ["#shop", "Shop"],
              ["#journal", "Journal"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="t-utility mb-4 text-secondary">Follow</p>
          <ul className="space-y-2">
            <li><a href="#" className="link">Instagram</a></li>
            <li><a href="#" className="link">Pinterest</a></li>
            <li><a href="#" className="link">YouTube</a></li>
          </ul>
        </div>
        <div className="text-sm text-background/70">
          <p className="t-utility mb-4 text-secondary">Legal</p>
          <ul className="space-y-2">
            <li><a href="#" className="link">Privacy</a></li>
            <li><a href="#" className="link">Terms</a></li>
            <li><a href="#" className="link">Care &amp; returns</a></li>
          </ul>
          <p className="mt-8">© 2026 Bluestone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
