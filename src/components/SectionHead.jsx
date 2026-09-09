import Reveal from './Reveal'

/** Judul standar untuk tiap section: eyebrow kecil, judul besar, deskripsi. */
export default function SectionHead({ eyebrow, title, desc, align = 'left' }) {
  return (
    <header className="head" style={align === 'center' ? { justifyItems: 'center', textAlign: 'center' } : undefined}>
      <Reveal y={18}>
        <span className="head__eyebrow mono">{eyebrow}</span>
      </Reveal>

      <Reveal delay={0.08} y={26}>
        <h2 className="head__title">{title}</h2>
      </Reveal>

      {desc && (
        <Reveal delay={0.16} y={26}>
          <p className="head__desc">{desc}</p>
        </Reveal>
      )}
    </header>
  )
}
