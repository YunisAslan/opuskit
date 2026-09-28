import type { AssetKey } from "@/config/assets"

export type Product = {
  slug: string
  name: string
  price: number
  images: [AssetKey, AssetKey]
  availability: "In stock" | "Low stock" | "Sold out"
  sizes?: string[]
  summary: string
  details: string[]
}

export const products: Product[] = [
  {
    slug: "crossing-hoodie", name: "Crossing Hoodie", price: 118, images: ["hoodieA", "hoodieB"], availability: "In stock",
    sizes: ["XS", "S", "M", "L", "XL"],
    summary: "Heavy 480gsm loopback fleece with a two-way zip. Cut boxy and a little short, so it stays put when you don't.",
    details: ["480gsm cotton loopback fleece", "Two-way metal zip", "Garment-dyed grey", "Made in Porto"],
  },
  {
    slug: "crossing-sweatpant", name: "Crossing Sweatpant", price: 96, images: ["pantA", "pantB"], availability: "In stock",
    sizes: ["XS", "S", "M", "L", "XL"],
    summary: "The hoodie's other half. Wide straight leg, a deep gusset and knees reinforced for landing on asphalt.",
    details: ["480gsm cotton loopback fleece", "Reinforced knee panels", "Open hem, 31in inseam", "Made in Porto"],
  },
  {
    slug: "star-sling", name: "Star Sling", price: 64, images: ["slingA", "slingB"], availability: "Low stock",
    summary: "A padded sling in star-print nylon. Holds a phone, keys and a bad decision. Survives being thrown.",
    details: ["Water-repellent 420D nylon", "32 × 18 × 9 cm", "Adjustable 38mm strap", "Two inner pockets"],
  },
  {
    slug: "backwards-cap", name: "Backwards Cap", price: 42, images: ["capA", "capB"], availability: "In stock",
    summary: "Six-panel twill in cobalt. Unstructured, so it bends to your head, and cut to be worn the wrong way round.",
    details: ["Washed cotton twill", "Brass slide closure", "One size", "Embroidered eyelets"],
  },
  {
    slug: "spill-cup", name: "Spill Cup", price: 28, images: ["cupA", "cupB"], availability: "In stock",
    summary: "A 700ml double-wall cup with a reusable straw. The lid seals. What you do with it after that is up to you.",
    details: ["Double-wall Tritan", "700ml", "Dishwasher safe", "Reusable straw included"],
  },
  {
    slug: "sparko-crisps", name: "Sparko Crisps", price: 6, images: ["crispsA", "crispsB"], availability: "Sold out",
    summary: "Salt and cider vinegar crisps in our silver bag. Very loud to open. Restocks every Friday.",
    details: ["Salt and cider vinegar", "150g", "Vegan", "Fried in sunflower oil"],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
export const formatPrice = (n: number) => `€${n.toFixed(0)}`
