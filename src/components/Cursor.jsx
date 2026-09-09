import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * Kursor kustom: titik kecil mengikuti persis, cincin besar menyusul
 * dengan sedikit jeda. Cincin membesar di atas elemen interaktif dan
 * berubah jadi label "VIEW" di atas kartu proyek.
 *
 * Otomatis tidak dirender pada perangkat sentuh (lewat CSS).
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(hover: hover)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...target }
    let frame = 0
    let visible = false

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY

      if (!visible) {
        visible = true
        ringPos.x = target.x
        ringPos.y = target.y
        dot.style.opacity = ring.style.opacity = '1'
        ring.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      if (!frame) frame = requestAnimationFrame(tick)
    }

    let mode = ''
    const onOver = (e) => {
      const el = e.target.closest?.('a, button, [data-cursor]')
      const next = el ? el.dataset.cursor || 'hover' : ''
      if (next === mode) return
      mode = next
      ring.classList.toggle('is-view', next === 'view')
      ring.classList.toggle('is-hover', next === 'hover')
    }

    const onLeave = () => {
      dot.style.opacity = ring.style.opacity = '0'
      visible = false
    }

    const tick = () => {
      const dx = target.x - ringPos.x
      const dy = target.y - ringPos.y

      // sudah sampai — hentikan loop sampai kursor bergerak lagi
      if (dx * dx + dy * dy < 0.02) {
        frame = 0
        return
      }

      // lerp — makin kecil faktornya, makin "malas" cincinnya menyusul
      ringPos.x += dx * 0.16
      ringPos.y += dy * 0.16
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    dot.style.opacity = ring.style.opacity = '0'
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring__label">VIEW</span>
      </div>
    </>
  )
}
