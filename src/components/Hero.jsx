import { useState } from 'react'
import { profile } from '../data/content'
import { useTilt, useTypewriter, useScrollTo } from '../hooks/useAnimations'
import { ArrowRight, Download } from './Icons'
import { icons } from './iconMap'
import Magnetic from './Magnetic'

/** Memecah kalimat jadi huruf-huruf agar bisa dianimasikan satu per satu. */
function SplitLine({ text, offset = 0, running }) {
  return (
    <span className="hero__line">
      {[...text].map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="hero__char hero__char--space" />
        ) : (
          <span
            key={i}
            className="hero__char"
            style={{
              '--d': `${offset + i * 0.035}s`,
              animationPlayState: running ? 'running' : 'paused',
            }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  )
}

export default function Hero({ ready }) {
  const cardRef = useTilt({ max: 7 })
  // kalau file fotonya belum ada di public/, jatuh ke inisial bergradasi
  const [hasPhoto, setHasPhoto] = useState(Boolean(profile.photo))
  const role = useTypewriter(profile.roles)
  const scrollTo = useScrollTo(80)

  const [line1, line2] = profile.tagline

  return (
    <section className="hero shell" id="top">
      <div className="hero__grid">
        {/* ------------------------------- kiri ------------------------------- */}
        <div>
          {profile.available && (
            <div className="hero__badge">
              <span className="hero__pulse" />
              {profile.availableText}
            </div>
          )}

          <h1 className="hero__title">
            <SplitLine text={line1} offset={0.15} running={ready} />
            <SplitLine text={line2} offset={0.15 + line1.length * 0.035} running={ready} />
          </h1>

          <p className="hero__role">
            {role}
            <span className="hero__caret" />
          </p>

          <p className="hero__desc">{profile.intro}</p>

          <div className="hero__cta">
            <Magnetic strength={0.25}>
              <a
                className="btn btn--solid"
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('work')
                }}
              >
                Lihat Proyek
                <ArrowRight className="btn__icon" width={18} height={18} />
              </a>
            </Magnetic>

            {/* tombol CV hanya muncul kalau path-nya diisi di content.js */}
            {profile.cv && (
              <Magnetic strength={0.25}>
                <a className="btn" href={profile.cv} download>
                  Unduh CV
                  <Download className="btn__icon" width={18} height={18} />
                </a>
              </Magnetic>
            )}
          </div>

          <div className="hero__socials">
            {profile.socials.map((s) => {
              const Icon = icons[s.icon]
              return (
                <a
                  key={s.label}
                  className="icon-btn"
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>

        {/* ------------------------------ kanan ------------------------------- */}
        <div ref={cardRef} className="hero__photo">
          <div className="hero__photo-frame">
            {hasPhoto ? (
              <img
                src={profile.photo}
                alt={`Foto ${profile.fullName}`}
                onError={() => setHasPhoto(false)}
                fetchPriority="high"
              />
            ) : (
              <span className="hero__photo-ph">{profile.initials}</span>
            )}
            <span className="hero__photo-veil" />
          </div>

          <div className="hero__plate">
            <span className="hero__plate-name">{profile.fullName}</span>
            <span className="hero__plate-role mono">{profile.role}</span>
          </div>
        </div>
      </div>

      <div className="hero__cue" aria-hidden="true">
        <span className="mono">Scroll</span>
        <span className="hero__cue-rail" />
      </div>
    </section>
  )
}
