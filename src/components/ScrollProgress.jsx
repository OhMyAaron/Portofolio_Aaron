import { useEffect, useRef } from 'react'

/**
 * Bar progres scroll.
 *
 * Sengaja TIDAK memakai useState: kalau nilainya disimpan di state, setiap
 * frame scroll akan me-render ulang seluruh pohon komponen (App → Hero →
 * Projects → dst). Di sini nilainya ditulis langsung ke variabel CSS elemen
 * ini saja, jadi React tidak ikut bekerja saat halaman di-scroll.
 */
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        el.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1) : 0)
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
  }, [])

  return <div className="progress" ref={ref} aria-hidden="true" />
}
