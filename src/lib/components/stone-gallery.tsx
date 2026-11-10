"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react"
import { families, stoneTitle, type Family, type Stone } from "@/lib/pieces"
import { smsHref, telHref } from "@/lib/site"
import { Reveal } from "./reveal"

type Filter = Family | "all"
type Props = { stones: Stone[]; initialFilter: Filter; initialStone?: string }

/* The tray is laid out loose, the way stones sit on a dealer's black cloth: alternating sizes and drops. */
const place = [
  "lg:col-span-6",
  "lg:col-span-4 lg:col-start-8 lg:mt-28",
  "lg:col-span-4 lg:col-start-2 lg:-mt-6",
  "lg:col-span-5 lg:col-start-7 lg:mt-12",
]
const placeMd = ["", "md:mt-20", "md:-mt-6", "md:mt-14"]
const placeSm = ["mr-auto w-[92%]", "ml-auto w-[86%]", "mr-auto w-[86%]", "ml-auto w-[92%]"]

function setParam(key: string, value: string | null) {
  const url = new URL(window.location.href)
  if (value) url.searchParams.set(key, value)
  else url.searchParams.delete(key)
  window.history.replaceState(null, "", url)
}

const ask = (s: Stone) => `/contact?stone=${encodeURIComponent(s.id)}`

/**
 * The stones on the onyx tray. Filter by kind of stone (the count is announced politely), open any
 * stone full size in a native modal dialog: focus moves in and returns to the stone that opened it,
 * Escape or a click on the backdrop closes it, and the page behind does not scroll while it is open.
 */
export function StoneGallery({ stones, initialFilter, initialStone }: Props) {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [open, setOpen] = useState<Stone | null>(() => stones.find((s) => s.id === initialStone) ?? null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  /* Close synchronously from every path (button, backdrop, Escape) instead of waiting for the
     dialog's own close event, so the URL, scroll lock and focus are always back in step. */
  const close = useCallback(() => {
    if (dialog.current?.open) dialog.current.close()
    setOpen(null)
    setParam("stone", null)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      document.documentElement.style.overflow = "hidden"
    }
    if (!open && d.open) d.close()
    if (!open) {
      document.documentElement.style.overflow = ""
      opener.current?.focus()
    }
  }, [open])

  useEffect(() => () => void (document.documentElement.style.overflow = ""), [])

  const openStone = (s: Stone, e: MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget
    setOpen(s)
    setParam("stone", s.id)
  }

  // A click that lands on the <dialog> element itself (not its content) is a click on the backdrop.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close()
  }
  const onDialogKey = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  const choose = (f: Filter) => {
    setFilter(f)
    setParam("kind", f === "all" ? null : f)
  }

  const shown = filter === "all" ? stones : stones.filter((s) => s.family === filter)
  const openCount = shown.filter((s) => s.status !== "sold").length
  const soldCount = shown.length - openCount
  const kindWord = filter === "all" ? (shown.length === 1 ? "stone" : "stones") : shown.length === 1 ? families.find((f) => f.id === filter)!.label.replace(/s$/, "").toLowerCase() : families.find((f) => f.id === filter)!.plural
  const summary = `Showing ${shown.length} ${kindWord}: ${openCount} to ask about${soldCount ? `, ${soldCount} sold` : ""}.`

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All stones", count: stones.filter((s) => s.status !== "sold").length },
    ...families.map((f) => ({ id: f.id as Filter, label: f.label, count: stones.filter((s) => s.family === f.id && s.status !== "sold").length })),
  ]

  return (
    <div className="surface-onyx">
      <div className="container-site pb-24 pt-10 md:pb-32">
        <div className="flex flex-col gap-5 border-b border-paper/20 pb-8 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Show stones by kind" className="flex flex-wrap gap-3">
            {filters.map((f) => {
              const on = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(f.id)}
                  className={`tag min-h-[44px] py-2.5 text-[0.98rem] ${on ? "" : "tag-dark hover:text-gold-light"}`}
                >
                  {f.label}
                  <span className={`ml-2 text-[0.95rem] ${on ? "text-ink-soft" : "text-paper/75"}`}>
                    {f.count > 0 ? f.count : "sold"}
                    <span className="sr-only">{f.count > 0 ? " to ask about" : ""}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <p aria-live="polite" className="text-paper/80">
            {summary}
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-16 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          {shown.map((s, i) => (
            <Reveal as="li" i={i % 2} key={s.id} className={`${placeSm[i % 4]} md:mx-0 md:w-auto ${placeMd[i % 4]} ${place[i % 4]}`}>
              <button type="button" onClick={(e) => openStone(s, e)} className="group block w-full text-left">
                <span className="relative block overflow-hidden bg-onyx-soft">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 88vw"
                    className={`block h-auto w-full transition-transform duration-700 ease-gem group-hover:scale-[1.03] ${s.status === "sold" ? "opacity-60" : ""}`}
                  />
                </span>
                <span className="tag -mt-8 ml-4 block w-fit max-w-[92%] py-3 pr-6 md:ml-6">
                  <span className="tag-label block text-ink-soft">
                    {s.carat} ct · {s.origin.replace(" (Sri Lanka)", "")}
                  </span>
                  <span className="mt-1 block font-display text-[1.45rem] italic leading-tight">{s.name}</span>
                  <span className="mt-1 block text-[0.95rem]">
                    {s.status === "sold" ? <strong className="font-medium text-ruby">Sold</strong> : "Ask if it’s still available"}
                  </span>
                </span>
                <span className="sr-only">. Open details</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={() => open && close()}
        onClick={onDialogClick}
        onKeyDown={onDialogKey}
        aria-labelledby="stone-title"
        className="surface-paper m-auto max-h-[calc(100dvh-1.5rem)] w-[min(100vw-1.5rem,1100px)] max-w-none overflow-y-auto p-0 backdrop:bg-onyx/85"
      >
        {open && (
          <div className="grid md:grid-cols-12">
            <div className="bg-onyx md:col-span-7">
              <Image
                src={open.image.src}
                alt={open.image.alt}
                width={open.image.width}
                height={open.image.height}
                sizes="(min-width: 768px) 60vw, 100vw"
                loading="eager"
                className="mx-auto block h-auto max-h-[72vh] w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <p className="tag-label pt-3 text-ink-soft">{open.carat} ct</p>
                <button type="button" onClick={close} className="btn btn-line -mr-2 -mt-1 min-h-[44px] px-4">
                  Close
                </button>
              </div>
              <h2 id="stone-title" className="font-display text-d3 italic">
                {open.stone}
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-onyx/15 pt-5">
                {(
                  [
                    ["Origin", open.origin],
                    ["Carat", `${open.carat} ct`],
                    ["Cut", open.cut],
                    ["Treatment", open.treatment],
                    ["Certificate", open.certification],
                    ["Status", open.status === "sold" ? "Sold" : "Ask if it’s still available"],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="tag-label pt-1 text-ink-soft">{k}</dt>
                      <dd className={k === "Status" && open.status === "sold" ? "font-medium text-ruby" : ""}>{v}</dd>
                    </div>
                  ))}
              </dl>
              {open.status === "sold" ? (
                <div className="mt-auto">
                  <p className="text-ink-soft">This stone has sold. Ask what else we have, or about a custom piece.</p>
                  <Link href="/contact" className="btn btn-sapphire mt-4 w-fit">
                    Ask about other stones <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <div className="mt-auto flex flex-col gap-2">
                  <Link href={ask(open)} className="btn btn-sapphire w-fit">
                    Ask if it’s still available <span aria-hidden="true">→</span>
                  </Link>
                  <div className="flex flex-wrap gap-x-6">
                    <a href={smsHref(`Hello, is the ${stoneTitle(open)} (${open.origin}) still available?`)} className="link-under">
                      <span className="u">Text about it</span>
                    </a>
                    <a href={telHref} className="link-under">
                      <span className="u">Call</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
