import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * Latar belakang berlapis:
 *  1. tiga blob gradasi yang mengambang (CSS)
 *  2. kanvas partikel yang saling terhubung & bereaksi ke kursor
 *  3. grid tipis + tekstur noise
 *
 * Catatan performa (penting kalau mau diubah-ubah):
 *  - semua garis digambar dalam SATU path per kelompok, bukan satu stroke
 *    per garis. Ini bedanya ribuan panggilan stroke vs. tiga panggilan.
 *  - jarak dibandingkan dalam bentuk kuadrat, jadi tidak perlu akar kuadrat.
 *  - warna aksen dibaca sekali dan hanya diperbarui saat temanya diganti,
 *    karena getComputedStyle di dalam loop memaksa browser menghitung ulang layout.
 *  - kalau fps terukur rendah, jumlah partikel dipangkas sendiri, lalu kanvas
 *    dimatikan total bila masih berat.
 */

const TAU = Math.PI * 2

// jarak sambung antar partikel (dalam kuadrat, supaya tidak perlu Math.hypot)
const LINK = 118
const LINK_SQ = LINK * LINK
const NEAR_SQ = (LINK * 0.6) * (LINK * 0.6)
const MOUSE = 150
const MOUSE_SQ = MOUSE * MOUSE

export default function Background() {
  const layerRef = useRef(null)
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  /* ---------- parallax: satu transform pada satu pembungkus ---------- */
  useEffect(() => {
    const layer = layerRef.current
    if (!layer || reduced) return
    if (!window.matchMedia('(hover: hover)').matches) return

    let frame = 0

    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = (e.clientX / window.innerWidth - 0.5) * 26
        const y = (e.clientY / window.innerHeight - 0.5) * 26
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [reduced])

  /* ---------- kanvas partikel ---------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    const mouse = { x: -9999, y: -9999 }
    const root = document.documentElement

    let particles = []
    let frame = 0
    let w = 0
    let h = 0
    let stopped = false

    // Warna aksen dibaca sekali saja, lalu diperbarui hanya kalau temanya berubah.
    let rgb = '167, 139, 250'
    const readAccent = () => {
      rgb = getComputedStyle(root).getPropertyValue('--a1-rgb').trim() || rgb
    }
    readAccent()

    const themeWatcher = new MutationObserver(readAccent)
    themeWatcher.observe(root, { attributes: true, attributeFilter: ['data-accent'] })

    // Laptop dengan CPU sedikit dapat jatah partikel lebih sedikit sejak awal.
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4
    const density = lowPower ? 34000 : 22000
    const cap = lowPower ? 34 : 64

    const setup = () => {
      // kanvas partikel tidak perlu resolusi retina penuh — 1.5x sudah tajam
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(18, Math.min(Math.round((w * h) / density), cap))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const drawDots = () => {
      ctx.beginPath()
      for (const p of particles) {
        ctx.moveTo(p.x + p.r, p.y)
        ctx.arc(p.x, p.y, p.r, 0, TAU)
      }
      ctx.fillStyle = `rgba(${rgb}, 0.5)`
      ctx.fill()
    }

    /* --- pengukur fps sederhana untuk menurunkan beban secara otomatis --- */
    let frames = 0
    let mark = 0
    let degraded = false

    const guard = (now) => {
      frames++
      if (!mark) mark = now
      if (now - mark < 1500) return

      const fps = (frames * 1000) / (now - mark)
      frames = 0
      mark = now

      if (fps < 24) {
        // masih berat walau sudah dipangkas → matikan kanvasnya
        stopped = true
        ctx.clearRect(0, 0, w, h)
        canvas.style.display = 'none'
      } else if (fps < 40 && !degraded) {
        degraded = true
        particles = particles.slice(0, Math.max(14, Math.floor(particles.length * 0.55)))
      }
    }

    const draw = (now) => {
      if (stopped) return

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }

      drawDots()

      // Garis dikumpulkan ke dalam dua path: yang dekat (jelas) dan yang jauh (samar).
      ctx.lineWidth = 0.6
      ctx.beginPath()
      const faint = []

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_SQ) continue

          if (d2 < NEAR_SQ) {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          } else {
            faint.push(a, b)
          }
        }
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.075)'
      ctx.stroke()

      if (faint.length) {
        ctx.beginPath()
        for (let i = 0; i < faint.length; i += 2) {
          ctx.moveTo(faint[i].x, faint[i].y)
          ctx.lineTo(faint[i + 1].x, faint[i + 1].y)
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.032)'
        ctx.stroke()
      }

      // garis ke kursor — juga satu path saja
      if (mouse.x > -9000) {
        ctx.beginPath()
        let any = false
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          if (dx * dx + dy * dy > MOUSE_SQ) continue
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          any = true
        }
        if (any) {
          ctx.strokeStyle = `rgba(${rgb}, 0.22)`
          ctx.stroke()
        }
      }

      guard(now)
      frame = requestAnimationFrame(draw)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      drawDots()
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setup()
        if (reduced || stopped) drawStatic()
      }, 180)
    }

    // hemat baterai: berhenti menggambar saat tab tidak aktif
    const onVisibility = () => {
      if (reduced || stopped) return
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        mark = 0
        frames = 0
      } else if (!frame) {
        frame = requestAnimationFrame(draw)
      }
    }

    setup()
    if (reduced) {
      drawStatic()
    } else {
      frame = requestAnimationFrame(draw)
      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(resizeTimer)
      themeWatcher.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__layer" ref={layerRef}>
        <div className="bg__blob bg__blob--1" />
        <div className="bg__blob bg__blob--2" />
        <div className="bg__blob bg__blob--3" />
      </div>
      <canvas className="bg__canvas" ref={canvasRef} />
      <div className="bg__grid" />
      <div className="bg__noise" />
    </div>
  )
}
