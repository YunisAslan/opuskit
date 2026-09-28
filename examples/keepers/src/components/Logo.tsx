// Temporary wordmark (manifest: logo, status create). Replace with the brand SVG.
export default function Logo({ className = 'text-[1.75rem]' }: { className?: string }) {
  return <span className={`font-display font-extrabold uppercase leading-none ${className}`}>Keepers</span>
}
