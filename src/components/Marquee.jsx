import { marqueeItems } from '../data/content'

/**
 * Pita teknologi yang berjalan terus-menerus.
 * Daftar digandakan dua kali supaya perulangannya tidak terlihat sambungannya.
 */
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="marquee" aria-label="Teknologi yang saya pakai">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= marqueeItems.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
