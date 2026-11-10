"use client"

import { useRef, useState, type FormEvent } from "react"
import { categories, pieces } from "@/lib/pieces"
import { site } from "@/lib/site"

type Field = "name" | "reply" | "about" | "message"
type Errors = Partial<Record<Field, string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+()\d\s.-]{7,}$/

function check(field: Field, value: string): string | undefined {
  const v = value.trim()
  if (field === "name" && !v) return "Please add your name."
  if (field === "reply") {
    if (!v) return "Please add an email or phone number so we can answer."
    if (!emailRe.test(v) && !phoneRe.test(v)) return "That doesn't look like an email or phone number yet."
  }
  if (field === "about" && !v) return "Please choose a piece or a kind of piece."
  if (field === "message" && v.length < 2) return "Please write a short note."
  return undefined
}

/**
 * The inquiry form. It does not send anything to a server: on submit it writes the note out
 * and opens the visitor's own email app (or text messages, if only a phone is configured),
 * addressed to the owner's inbox from site.ts. Only rendered when that inbox is set.
 */
export function InquiryForm({ initial }: { initial: string }) {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<{ href: string; name: string } | null>(null)
  const form = useRef<HTMLFormElement>(null)

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
    const values = Object.fromEntries((["name", "reply", "about", "message"] as Field[]).map((f) => [f, String(data.get(f) ?? "")])) as Record<Field, string>
    const next: Errors = {}
    for (const f of Object.keys(values) as Field[]) next[f] = check(f, values[f])
    setErrors(next)
    const first = (Object.keys(next) as Field[]).find((f) => next[f])
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const about = describe(values.about)
    const body = `${values.message.trim()}\n\nAbout: ${about}\nFrom: ${values.name.trim()}\nReply to: ${values.reply.trim()}`
    const subject = `Inquiry: ${about}`
    const href = site.inquiry.email
      ? `mailto:${site.inquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      : `sms:${site.inquiry.phone.replace(/[^\d+]/g, "")}?&body=${encodeURIComponent(`${subject}\n${body}`)}`
    setSent({ href, name: values.name.trim().split(/\s+/)[0] })
    window.location.href = href
  }

  if (sent) {
    return (
      <div role="status" className="tag tag-garnet p-8 pl-12">
        <p className="font-display text-d3 italic">Thank you, {sent.name}.</p>
        <p className="mt-4 max-w-[44ch] text-ivory/90">
          Your {site.inquiry.email ? "email app" : "messages app"} should have opened with the note written out. Press send there to reach us.
        </p>
        <a href={sent.href} className="link-under mt-6 inline-flex min-h-[44px] items-center">
          Didn&apos;t open? Try again
        </a>
      </div>
    )
  }

  const err = (f: Field) => errors[f] && (
    <p id={`${f}-error`} className="mt-2 font-medium text-garnet">
      <span aria-hidden="true">! </span>
      {errors[f]}
    </p>
  )
  const input = "mt-2 block w-full min-h-[48px] border border-ink/40 bg-ivory px-4 py-3 text-ink focus:border-garnet focus:outline-none focus:ring-2 focus:ring-garnet/40"
  const aria = (f: Field) => ({ "aria-invalid": Boolean(errors[f]), "aria-describedby": errors[f] ? `${f}-error` : undefined })

  return (
    <form ref={form} noValidate onSubmit={submit} className="grid gap-6">
      <div>
        <label htmlFor="about" className="tag-label">
          Asking about <span aria-hidden="true">*</span>
        </label>
        <select id="about" name="about" defaultValue={initial} required onBlur={blur("about")} onChange={clear("about")} className={input} {...aria("about")}>
          <option value="">Choose one</option>
          {pieces.length > 0 && (
            <optgroup label="Pieces in the case">
              {pieces.map((p) => (
                <option key={p.id} value={`piece:${p.id}`}>
                  No. {p.id}, {p.name}
                </option>
              ))}
            </optgroup>
          )}
          <optgroup label="A kind of piece">
            {categories.map((c) => (
              <option key={c.id} value={`category:${c.id}`}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <option value="other">Something else</option>
        </select>
        {err("about")}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="tag-label">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required onBlur={blur("name")} onChange={clear("name")} className={input} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="reply" className="tag-label">
            Email or phone <span aria-hidden="true">*</span>
          </label>
          <input id="reply" name="reply" autoComplete="email" required onBlur={blur("reply")} onChange={clear("reply")} className={input} {...aria("reply")} />
          {err("reply")}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="tag-label">
          Your note <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="For example: is No. 14 still available?"
          onBlur={blur("message")}
          onChange={clear("message")}
          className={input}
          {...aria("message")}
        />
        {err("message")}
      </div>
      <p className="text-ink-soft">
        <span aria-hidden="true">*</span> Required. Sending opens your {site.inquiry.email ? "email" : "messages"} app with the note written out.
      </p>
      <button type="submit" className="btn btn-garnet w-fit">
        Write the note <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

function describe(about: string): string {
  if (about.startsWith("piece:")) {
    const p = pieces.find((x) => x.id === about.slice(6))
    return p ? `No. ${p.id}, ${p.name}` : about.slice(6)
  }
  if (about.startsWith("category:")) return categories.find((c) => c.id === about.slice(9))?.label ?? "A piece"
  return "Something else"
}
