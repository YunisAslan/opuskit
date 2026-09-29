import type { Metadata } from "next"
import { Gallery } from "@/components/Gallery"
import { ImageTrail } from "@/components/ImageTrail"
import { galleryKeys } from "@/config/assets"

export const metadata: Metadata = { title: "Gallery", description: "Horses, grooms and the grounds around Sheki." }

const photos = [
  { id: "photoHerd", caption: "Turnout, early morning" },
  { id: "photoRider", caption: "Walking to the lines" },
  { id: "photoJump", caption: "Schooling over fences" },
  { id: "photoPalomino", caption: "Waiting at the box door" },
  { id: "photoGallop", caption: "A loose canter" },
  { id: "photoBox", caption: "Stable block, midday" },
  { id: "photoGroom", caption: "Groom and pony" },
  { id: "photoPonies", caption: "Ponies in the hill pasture" },
] as const

export default function GalleryPage() {
  return (
    <section className="page pt-16 pb-24 lg:pb-32">
      <ImageTrail images={galleryKeys}>
        <p className="type-utility mb-6">Gallery</p>
        <h1 className="type-display">
          <span className="hidden sm:inline">Horses, grooms<br />and the ground</span>
          <span className="sm:hidden">Horses,<br />grooms and<br />the ground</span>
        </h1>
        <p className="mt-8 max-w-[30rem]">
          Eight photographs from the yards and pastures around the ground. Select any photo below to see it large.
        </p>
      </ImageTrail>

      <div className="border-t border-text pt-10">
        <Gallery photos={[...photos]} />
      </div>
    </section>
  )
}
