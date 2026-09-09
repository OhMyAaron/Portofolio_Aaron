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
      // clipboard API bisa diblokir (misalnya di http) — buka email client saja
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
          Kontak
        </p>

        <h2 className="contact__title">
          Punya ide? <span className="grad-text">Mari dibicarakan.</span>
        </h2>

        <p className="contact__desc">
          Saya terbuka untuk proyek freelance, kerja penuh waktu, atau sekadar berdiskusi soal
          teknologi. Paling cepat lewat WhatsApp — balasan biasanya dalam 1×24 jam.
        </p>

        <div className="contact__actions">
          <Magnetic strength={0.25}>
            <a className="btn btn--solid" href={`mailto:${profile.email}`}>
              Kirim Email
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
            {copied ? 'Tersalin!' : profile.email}
          </button>
        </div>
      </Reveal>
    </section>
  )
}
