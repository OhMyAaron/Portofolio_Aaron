import { useEffect, useState } from 'react'
import { useBodyLock } from '../hooks/useAnimations'

/**
 * Layar pembuka: angka 0 → 100 lalu tirai terangkat.
 * onDone dipanggil setelah animasi tirai selesai, supaya animasi
 * hero baru mulai ketika halaman benar-benar terlihat.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useBodyLock(!done)

  useEffect(() => {
    let value = 0
    const id = setInterval(() => {
      // naik tidak rata supaya terasa seperti loading sungguhan
      value = Math.min(value + Math.random() * 14 + 4, 100)
      setCount(Math.floor(value))

      if (value >= 100) {
        clearInterval(id)
        setTimeout(() => setDone(true), 260)
        setTimeout(() => onDone?.(), 1100)
      }
    }, 90)

    return () => clearInterval(id)
    // onDone dibungkus useCallback di App, jadi effect ini hanya jalan sekali
  }, [onDone])

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden={done}>
      <div className="preloader__inner">
        <div className="preloader__num grad-text">{String(count).padStart(3, '0')}</div>
        <div className="preloader__bar">
          <div className="preloader__fill" style={{ '--p': count / 100 }} />
        </div>
        <div className="preloader__label mono">Menyiapkan portofolio</div>
      </div>
    </div>
  )
}
