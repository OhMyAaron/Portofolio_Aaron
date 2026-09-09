import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { ArrowUpRight, Check, Copy, Whatsapp } from './Icons'
import Magnetic from './Magnetic'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // the clipboard API may be blocked (e.g. over plain http) — fall back to mailto
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section shell contact" id="contact">
      <Reveal className="contact__panel" y={40}>
        <span className="contact__ghost" aria-hidden="true">
          {profile.name}
        </span>

        <p className="head__eyebrow mono" style={{ justifyContent: 'center', marginBottom: 18 }}>
          Contact
        </p>

        <h2 className="contact__title">
          Have a project in mind? <span className="grad-text">I would be glad to hear it.</span>
        </h2>

        <p className="contact__desc">
          I am open to freelance projects, full-time roles, or simply a conversation about
          technology. WhatsApp is the quickest route — I normally reply within 24 hours.
        </p>

        <div className="contact__actions">
          <Magnetic strength={0.25}>
            <a className="btn btn--solid" href={`mailto:${profile.email}`}>
              Send Email
              <ArrowUpRight className="btn__icon" width={18} height={18} />
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              className="btn"
              href={profile.socials.find((s) => s.icon === 'whatsapp')?.href}
              target="_blank"
              rel="noreferrer"
            >
              <Whatsapp className="btn__icon" width={18} height={18} />
              WhatsApp
            </a>
          </Magnetic>

          <button
            type="button"
            className={`copy ${copied ? 'is-copied' : ''}`}
            onClick={copyEmail}
            aria-live="polite"
          >
            {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
            {copied ? 'Copied' : profile.email}
          </button>
        </div>
      </Reveal>
    </section>
  )
}
