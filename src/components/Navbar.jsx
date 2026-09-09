import { useEffect, useState } from 'react'
import { navLinks, accents, profile } from '../data/content'
import {
  useAccent,
  useActiveSection,
  useBodyLock,
  useScrolledPast,
  useScrollTo,
} from '../hooks/useAnimations'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [accent, setAccent] = useAccent()
  const stuck = useScrolledPast(30)
  const active = useActiveSection(ids)
  const scrollTo = useScrollTo(80)

  useBodyLock(open)

  // tutup menu kalau layar dibesarkan ke ukuran desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  // tutup menu dengan tombol Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(id)
  }

  return (
    <>
      <header className={`nav ${stuck ? 'is-stuck' : ''}`}>
        <nav className="shell nav__row" aria-label="Navigasi utama">
          <a
            className="nav__logo"
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="nav__dot" />
            {profile.name}
            <span style={{ color: 'var(--a1)' }}>.</span>
          </a>

          <ul className="nav__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__side">
            <div className="palette" role="group" aria-label="Warna aksen">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="palette__swatch"
                  style={{ background: a.color }}
                  aria-label={`Warna aksen ${a.label}`}
                  aria-pressed={accent === a.id}
                  onClick={() => setAccent(a.id)}
                />
              ))}
            </div>

            <button
              type="button"
              className={`burger ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {navLinks.map((link, i) => (
          <a key={link.id} href={`#${link.id}`} style={{ '--i': i }} onClick={go(link.id)}>
            <span>0{i + 1}</span>
            {link.label}
          </a>
        ))}

        <div className="palette" style={{ marginTop: 28, width: 'fit-content' }}>
          {accents.map((a) => (
            <button
              key={a.id}
              type="button"
              className="palette__swatch"
              style={{ background: a.color }}
              aria-label={`Warna aksen ${a.label}`}
              aria-pressed={accent === a.id}
              onClick={() => setAccent(a.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
