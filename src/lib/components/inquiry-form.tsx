"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { customKinds, findStone, openStones, stoneTitle } from "@/lib/pieces"
import { mailHref, site } from "@/lib/site"

type Field = "about" | "name" | "reply" | "message"
type Errors = Partial<Record<Field, string>>

/** Visual (and DOM) order of the fields: the first invalid one in this order gets focus. */
const ORDER: Field[] = ["about", "name", "reply", "message"]
const MAX_NOTE = 1500

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+()\d\s.-]+$/
const digits = (v: string) => v.replace(/\D/g, "").length

function check(field: Field, value: string): string | undefined {
  const v = value.trim()
  if (field === "about" && !v) return "Please choose a stone or what you’re asking about."
  if (field === "name" && !v) return "Please add your name."
  if (field === "reply") {
    if (!v) return "Please add an email or phone number so we can answer."
    const isEmail = emailRe.test(v)
    const isPhone = phoneRe.test(v) && digits(v) >= 7
    if (!isEmail && !isPhone) return "That doesn’t look like an email address or a phone number (at least 7 digits) yet."
  }
  if (field === "message" && v.length < 2) return "Please write a short note."
  return undefined
}

export function describe(about: string): string {
  if (about.startsWith("stone:")) {
    const s = findStone(about.slice(6))
    return s ? `the ${stoneTitle(s)} (${s.origin})` : "a stone"
  }
  if (about.startsWith("custom:")) {
    const k = customKinds.find((c) => c.id === about.slice(7))
    return k ? `custom jewelry: ${k.label.toLowerCase()}` : "custom jewelry"
  }
  if (about === "wholesale") return "wholesale gemstones (for jewelers)"
  return "something else"
}

/**
 * The inquiry form. Nothing is sent to a server: on submit it writes the note into an email to
 * the owners and opens the visitor's own email app. Nothing is sent until they press send there.
 */
export function InquiryForm({ initial }: { initial: string }) {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<{ href: string; name: string } | null>(null)
  const [length, setLength] = useState(0)
  const form = useRef<HTMLFormElement>(null)
  const done = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) done.current?.focus()
  }, [sent])

  const blur = (field: Field) => (e: { currentTarget: { value: string } }) => {
    const msg = check(field, e.currentTarget.value)
    setErrors((prev) => ({ ...prev, [field]: msg }))
  }
  const clear = (field: Field) => () => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = Object.fromEntries(ORDER.map((f) => [f, String(data.get(f) ?? "")])) as Record<Field, string>
    const next: Errors = {}
    for (const f of ORDER) next[f] = check(f, values[f])
    setErrors(next)
    const first = ORDER.find((f) => next[f])
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const about = describe(values.about)
    const subject = `Inquiry about ${about}`
    const body = `${values.message.trim()}\n\nAsking about: ${about}\nFrom: ${values.name.trim()}\nReply to: ${values.reply.trim()}`
    const href = mailHref(subject, body)
    setSent({ href, name: values.name.trim().split(/\s+/)[0] })
    window.location.href = href
  }

  if (sent) {
    return (
      <div role="status" className="surface-onyx p-8 md:p-10">
        <h2 ref={done} tabIndex={-1} className="font-display text-d3 italic focus:outline-none">
          Thank you, {sent.name}.
        </h2>
        <p className="mt-4 max-w-[44ch] text-paper/90">
          Your email app should have opened with the note written out to us at {site.inquiry.email}. Nothing is sent until you press send there.
        </p>
        <a href={sent.href} className="link-under mt-4 text-gold-light">
          <span className="u">Didn’t open? Try again</span>
        </a>
      </div>
    )
  }

  const err = (f: Field) =>
    errors[f] && (
      <p id={`${f}-error`} className="mt-2 font-medium text-ruby">
        <span aria-hidden="true">! </span>
        {errors[f]}
      </p>
    )
  const input = (f: Field) =>
    `mt-2 block w-full min-h-[48px] border bg-paper px-4 py-3 text-onyx placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-sapphire focus:ring-offset-0 ${
      errors[f] ? "border-2 border-ruby" : "border-onyx/45 focus:border-sapphire"
    }`
  const aria = (f: Field) => ({ "aria-invalid": Boolean(errors[f]), "aria-describedby": errors[f] ? `${f}-error` : undefined })

  return (
    <form ref={form} noValidate onSubmit={submit} className="grid gap-6">
      <div>
        <label htmlFor="about" className="tag-label">
          Asking about <span aria-hidden="true">*</span>
        </label>
        <select id="about" name="about" defaultValue={initial} required onBlur={blur("about")} onChange={clear("about")} className={input("about")} {...aria("about")}>
          <option value="">Choose one</option>
          <optgroup label="Loose gemstones">
            {openStones.map((s) => (
              <option key={s.id} value={`stone:${s.id}`}>
                {s.carat} ct {s.name.toLowerCase()}, {s.origin}
              </option>
            ))}
          </optgroup>
          <optgroup label="Custom jewelry">
            {customKinds.map((k) => (
              <option key={k.id} value={`custom:${k.id}`}>
                {k.label}
              </option>
            ))}
          </optgroup>
          <option value="wholesale">Wholesale gemstones (for jewelers)</option>
          <option value="other">Something else</option>
        </select>
        {err("about")}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="tag-label">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required onBlur={blur("name")} onChange={clear("name")} className={input("name")} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="reply" className="tag-label">
            Email or phone <span aria-hidden="true">*</span>
          </label>
          <input id="reply" name="reply" autoComplete="email" required onBlur={blur("reply")} onChange={clear("reply")} className={input("reply")} {...aria("reply")} />
          {err("reply")}
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="message" className="tag-label">
            Your note <span aria-hidden="true">*</span>
          </label>
          <span className="text-[0.9rem] text-ink-soft" aria-hidden="true">
            {length}/{MAX_NOTE}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={MAX_NOTE}
          placeholder="For example: is the 5.43 ct blue star sapphire still available?"
          onBlur={blur("message")}
          onChange={(e) => {
            setLength(e.currentTarget.value.length)
            clear("message")()
          }}
          className={input("message")}
          {...aria("message")}
        />
        {err("message")}
      </div>
      <p className="text-ink-soft">
        <span aria-hidden="true">*</span> Required. This opens your email app with the note written out to us. Nothing is sent until you press send.
      </p>
      <button type="submit" className="btn btn-sapphire w-fit">
        Write the email <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}
