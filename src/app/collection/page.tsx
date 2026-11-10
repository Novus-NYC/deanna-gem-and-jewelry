import type { Metadata } from "next"
import { CaseGallery } from "@/lib/components/case-gallery"
import { Loupe } from "@/lib/components/loupe"
import { photos } from "@/lib/images"
import { categories, pieces, type Category } from "@/lib/pieces"

export const metadata: Metadata = {
  title: "The case",
  description: "Browse photos of the pieces at Deana Gem and Jewelry by kind, open any one full size, and ask about it by its tag number.",
  alternates: { canonical: "/collection" },
}

type Props = { searchParams: Promise<{ category?: string }> }

export default async function CollectionPage({ searchParams }: Props) {
  const { category } = await searchParams
  const initial = categories.some((c) => c.id === category) ? (category as Category) : "all"
  return (
    <>
      <section className="relative overflow-hidden bg-ivory">
        <div className="container-site grid gap-10 pb-12 pt-14 md:pt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="tag-label text-ink-soft">Deana Gem and Jewelry</p>
            <h1 className="mt-5 font-display text-mega">
              The <span className="italic">case.</span>
            </h1>
            <p className="mt-6 max-w-[42ch] text-[1.15rem] text-ink-soft">
              Every piece wears a numbered tag. Open one to see it full size, then ask about it by its number.
            </p>
          </div>
          <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <Loupe photo={photos.rough} focus="50% 40%" sizes="22vw" priority />
          </div>
        </div>
      </section>
      <CaseGallery pieces={pieces} initial={initial} />
    </>
  )
}
