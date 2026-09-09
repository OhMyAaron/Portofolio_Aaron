import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__row">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. Dibuat dengan React + Vite.
        </p>

        <nav className="footer__links" aria-label="Tautan sosial">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
