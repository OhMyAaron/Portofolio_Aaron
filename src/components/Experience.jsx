import { useEffect, useMemo, useRef, useState } from 'react'
import { timeline } from '../data/content'
import { useInView } from '../hooks/useAnimations'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

/** Satu titik pada garis waktu — menyala saat masuk layar. */
function Item({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 })

  return (
    <li className={`tl-item ${inView ? 'is-in' : ''}`} ref={ref}>
      <span className="tl-item__dot" />
      <Reveal delay={0.05 + index * 0.04} y={26}>
        <div className="tl-item__meta">
          <span className="mono">{item.period}</span>
        </div>
        <h3>{item.role}</h3>
        <p className="tl-item__where">{item.where}</p>
        {item.points.length > 0 && (
          <ul className="tl-item__points">
            {item.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </Reveal>
    </li>
  )
}

export default function Experience() {
  const tabs = useMemo(() => Object.keys(timeline), [])
  const [tab, setTab] = useState(tabs[0])
  const listRef = useRef(null)
  const railRef = useRef(null)

  /* Garis vertikal terisi mengikuti posisi scroll di dalam daftar.
     Nilainya ditulis langsung ke variabel CSS supaya tidak memicu render
     ulang React di setiap frame scroll. */
  useEffect(() => {
    const el = listRef.current
    const rail = railRef.current
    if (!el || !rail) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        const anchor = window.innerHeight * 0.62
        const p = (anchor - r.top) / r.height
        rail.style.setProperty('--p', Math.max(0, Math.min(p, 1)))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // tinggi daftar berubah tiap ganti tab, jadi perlu diukur ulang
  }, [tab])

  return (
    <section className="section shell" id="experience">
      <SectionHead
        eyebrow="Riwayat"
        title="Perjalanan sejauh ini"
        desc="Tempat saya belajar, memimpin, dan sesekali gagal lalu memperbaikinya."
      />

      <div className="projects__filters" role="tablist" aria-label="Kategori riwayat">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            className={`filter ${tab === name ? 'is-active' : ''}`}
            onClick={() => setTab(name)}
          >
            {name}
            <span className="filter__count">{timeline[name].length}</span>
          </button>
        ))}
      </div>

      <div className="timeline" ref={listRef}>
        <span className="timeline__rail" ref={railRef} />
        <ol>
          {timeline[tab].map((item, i) => (
            // key ikut tab supaya animasinya jalan lagi setiap ganti kategori
            <Item key={`${tab}-${item.role}-${item.period}`} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
