import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { InquiryForm } from "@/lib/components/inquiry-form"
import { Loupe } from "@/lib/components/loupe"
import { Tag } from "@/lib/components/tag"
import { photos } from "@/lib/images"
import { categories, categoryLabel, findPiece } from "@/lib/pieces"
import { inquiryOpen } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ask about a piece",
  description: "Ask Deana Gem and Jewelry whether a piece is available. Send its tag number, or ask what is in the case.",
  alternates: { canonical: "/contact" },
}

type Props = { searchParams: Promise<{ piece?: string; category?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const { piece: pieceId, category } = await searchParams
  const piece = findPiece(pieceId)
  const cat = categories.find((c) => c.id === category)
  const initial = piece ? `piece:${piece.id}` : cat ? `category:${cat.id}` : ""

  return (
    <section className="bg-ivory">
      <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="font-display text-d1">
            Ask about <span className="block italic">a piece.</span>
          </h1>
          <p className="mt-6 max-w-[36ch] text-[1.15rem] text-ink-soft">
            Tell us the tag number, or the kind of piece you are looking for, and ask if it is available.
          </p>
          {piece ? (
            <div className="mt-10 flex items-end gap-4">
              <div className="relative h-36 w-28 shrink-0 overflow-hidden bg-garnet">
                <Image src={piece.image.src} alt={piece.image.alt} fill sizes="7rem" className="object-cover" />
              </div>
              <Tag label={`No. ${piece.id}`}>
                <p className="font-display text-[1.3rem] italic leading-tight">{piece.name}</p>
                <p className="text-ink-soft">{categoryLabel(piece.category)}</p>
              </Tag>
            </div>
          ) : (
            <div className="mt-12 hidden w-64 lg:block">
              <Loupe photo={photos.blue} sizes="16rem" focus="45% 45%" />
            </div>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {inquiryOpen ? (
            <div className="border border-ink/15 bg-ivory-warm p-6 md:p-10">
              <InquiryForm initial={initial} />
            </div>
          ) : (
            <div className="bg-garnet p-8 text-ivory md:p-12">
              <p className="tag-label text-loupe">Inquiries</p>
              <h2 className="mt-4 font-display text-d2">
                Opening <span className="italic">soon.</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[1.1rem] text-ivory/90">
                Online inquiries are not open yet. Browse the case in the meantime, note the tag numbers you like, and check back here.
              </p>
              <Link href={cat ? `/collection?category=${cat.id}` : "/collection"} className="btn btn-ivory mt-8">
                Browse the case <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
