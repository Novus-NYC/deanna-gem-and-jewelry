"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { categories, type Category, type Piece } from "@/lib/pieces"
import { inquiryOpen } from "@/lib/site"
import { Reveal } from "./reveal"

type Props = { pieces: Piece[]; initial: Category | "all" }

/**
 * The case: filter by kind with tag-shaped toggles, open any piece full size in a native dialog
 * (focus is trapped and Escape closes it), and ask about it by number.
 * With no pieces yet, it shows each kind as an empty velvet slot with a way to ask.
 */
export function CaseGallery({ pieces, initial }: Props) {
  const [filter, setFilter] = useState<Category | "all">(initial)
  const [open, setOpen] = useState<Piece | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const choose = (f: Category | "all") => {
    setFilter(f)
    const url = new URL(window.location.href)
    if (f === "all") url.searchParams.delete("category")
    else url.searchParams.set("category", f)
    window.history.replaceState(null, "", url)
  }

  const shown = filter === "all" ? pieces : pieces.filter((p) => p.category === filter)
  const askHref = (q: string) => `/contact?${q}`

  if (pieces.length === 0) {
    return (
      <div className="bg-garnet text-ivory">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="font-display text-d2">
                The case is <span className="italic">being filled.</span>
              </h2>
              <p className="mt-6 max-w-[34ch] text-[1.1rem] text-ivory/90">
                Pieces will appear here, each with its tag, as they are photographed.{" "}
                {inquiryOpen ? "Until then, ask what is in the case now." : "Online inquiries open soon, so check back."}
              </p>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {categories.map((c, i) => (
                <Reveal as="li" i={i} key={c.id} className={i === 1 ? "lg:mt-10" : i === 4 ? "lg:-mt-6" : ""}>
                  <div
                    id={c.id}
                    className={`flex flex-col justify-between gap-6 border sm:aspect-[4/3] sm:gap-0 border-ivory/20 bg-garnet-deep p-5 ${filter === c.id ? "outline outline-2 outline-offset-4 outline-loupe" : ""}`}
                  >
                    <div className="tag w-fit pr-6">
                      <p className="font-display text-[1.5rem] italic leading-none">{c.label}</p>
                    </div>
                    {inquiryOpen ? (
                      <Link href={askHref(`category=${c.id}`)} className="link-under inline-flex min-h-[44px] w-fit items-center">
                        Ask what&apos;s in the case <span aria-hidden="true" className="ml-2">→</span>
                      </Link>
                    ) : (
                      <p className="text-ivory/80">No pieces shown yet</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ivory">
      <div className="container-site pb-20 md:pb-28">
        <div role="group" aria-label="Show pieces by kind" className="flex flex-wrap gap-3 border-b border-ink/15 pb-8">
          {[{ id: "all" as const, label: "Everything" }, ...categories].map((c) => {
            const on = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => choose(c.id)}
                className={`tag min-h-[44px] py-2.5 text-[0.95rem] transition-colors ${on ? "tag-garnet" : "hover:text-garnet"}`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {shown.length === 0 ? (
          <p className="py-16 text-[1.15rem]">
            Nothing in this part of the case right now.{" "}
            {inquiryOpen && (
              <Link href={askHref(`category=${filter}`)} className="link-under">
                Ask what is coming
              </Link>
            )}
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
            {shown.map((p, i) => (
              <Reveal as="li" i={i % 4} key={p.id}>
                <button type="button" onClick={() => setOpen(p)} className="group block w-full text-left">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-garnet">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-case group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="tag -mt-5 ml-3 block w-fit max-w-[90%] py-2 pr-4">
                    <span className="tag-label block text-ink-soft">No. {p.id}</span>
                    <span className="block font-display text-[1.15rem] italic leading-tight">{p.name}</span>
                  </span>
                  <span className="sr-only">Open full size</span>
                </button>
              </Reveal>
            ))}
          </ul>
        )}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        aria-labelledby="piece-title"
        className="m-auto w-[min(100vw-1.5rem,1100px)] max-w-none bg-ivory p-0 text-ink backdrop:bg-ink/80"
      >
        {open && (
          <div className="grid md:grid-cols-12">
            <div className="relative bg-garnet md:col-span-7">
              <Image
                src={open.image.src}
                alt={open.image.alt}
                width={open.image.width}
                height={open.image.height}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="h-auto max-h-[70vh] w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <p className="tag-label text-ink-soft">No. {open.id}</p>
                <button type="button" onClick={() => setOpen(null)} className="btn btn-line -mr-2 -mt-2 min-h-[44px] px-4">
                  Close
                </button>
              </div>
              <h2 id="piece-title" className="font-display text-d3 italic">
                {open.name}
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className="tag-label pt-1 text-ink-soft">Kind</dt>
                <dd>{categories.find((c) => c.id === open.category)?.label}</dd>
                {open.stone && (
                  <>
                    <dt className="tag-label pt-1 text-ink-soft">Stone</dt>
                    <dd>{open.stone}</dd>
                  </>
                )}
                {open.metal && (
                  <>
                    <dt className="tag-label pt-1 text-ink-soft">Metal</dt>
                    <dd>{open.metal}</dd>
                  </>
                )}
                {open.status && (
                  <>
                    <dt className="tag-label pt-1 text-ink-soft">Status</dt>
                    <dd className="capitalize">{open.status}</dd>
                  </>
                )}
              </dl>
              {inquiryOpen ? (
                <Link href={askHref(`piece=${encodeURIComponent(open.id)}`)} className="btn btn-garnet mt-auto w-fit">
                  Ask about No. {open.id} <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <p className="mt-auto text-ink-soft">Online inquiries open soon. Note the tag number and check back.</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
