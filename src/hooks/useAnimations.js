import { useCallback, useEffect, useRef, useState } from 'react'

/* ============================================================
   Kumpulan hook animasi. Semuanya vanilla — tanpa library luar,
   dan semuanya mati sendiri kalau user memilih "reduce motion".
   ============================================================ */

const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

/** Apakah user minta animasi dikurangi (setting OS). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

/**
 * Menambahkan class `is-in` saat elemen masuk viewport.
 * once = true (default) berarti animasi hanya jalan sekali.
 */
export function useInView({ threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

/** Progres scroll halaman, 0 → 1. Dipakai untuk bar di atas layar. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/** true kalau halaman sudah di-scroll melewati `offset` px. */
export function useScrolledPast(offset = 40) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    // simpan nilai terakhir supaya React tidak diganggu di tiap event scroll
    let last = null

    const onScroll = () => {
      const value = window.scrollY > offset
      if (value === last) return
      last = value
      setPast(value)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return past
}

/** Section mana yang sedang dilihat — untuk highlight menu. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6, 1] },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** Tombol/elemen yang "menempel" ke kursor saat didekati. */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !canHover()) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const onLeave = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      onLeave()
    }
  }, [strength, reduced])

  return ref
}

/**
 * Miring 3D mengikuti kursor + set variabel --mx/--my
 * supaya efek sorotan (spotlight) bisa ikut posisi kursor lewat CSS.
 */
export function useTilt({ max = 8, scale = 1, spotlight = true } = {}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced || !canHover()) return

    let frame = 0

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform =
          `perspective(1000px) rotateX(${(0.5 - py) * max * 2}deg) ` +
          `rotateY(${(px - 0.5) * max * 2}deg) scale(${scale})`
        if (spotlight) {
          el.style.setProperty('--mx', `${px * 100}%`)
          el.style.setProperty('--my', `${py * 100}%`)
        }
      })
    }

    const onEnter = () => {
      el.style.transition = 'transform 0.25s var(--ease)'
      setTimeout(() => {
        if (el) el.style.transition = 'transform 0.12s linear'
      }, 250)
    }

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      el.style.transition = 'transform 0.7s var(--ease)'
      el.style.transform = ''
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max, scale, spotlight, reduced])

  return ref
}

/** Angka yang menghitung naik saat pertama kali terlihat. */
export function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active || reduced) return

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo — cepat di awal, melambat di akhir
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration, reduced])

  // kalau animasi dimatikan, langsung tampilkan angka akhirnya
  return reduced ? target : value
}

/** Efek mesin ketik yang berputar antar beberapa kalimat. */
export function useTypewriter(words, { type = 65, erase = 32, hold = 1700 } = {}) {
  const [text, setText] = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let index = 0
    let char = 0
    let deleting = false
    let timer

    const step = () => {
      const word = words[index]
      char += deleting ? -1 : 1
      setText(word.slice(0, char))

      let delay = deleting ? erase : type

      if (!deleting && char === word.length) {
        deleting = true
        delay = hold
      } else if (deleting && char === 0) {
        deleting = false
        index = (index + 1) % words.length
        delay = 320
      }

      timer = setTimeout(step, delay)
    }

    timer = setTimeout(step, 700)
    return () => clearTimeout(timer)
  }, [words, type, erase, hold, reduced])

  return reduced ? words[0] : text
}

/** Mengunci scroll body (dipakai preloader & menu mobile). */
export function useBodyLock(locked) {
  useEffect(() => {
    document.body.classList.toggle('is-locked', locked)
    return () => document.body.classList.remove('is-locked')
  }, [locked])
}

/** Menyimpan pilihan warna aksen di localStorage. */
export function useAccent(initial = 'violet') {
  const [accent, setAccent] = useState(() => {
    try {
      return localStorage.getItem('accent') || initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    try {
      localStorage.setItem('accent', accent)
    } catch {
      /* mode privat / storage diblokir — abaikan saja */
    }
  }, [accent])

  return [accent, setAccent]
}

/** Scroll halus ke sebuah section dengan kompensasi tinggi navbar. */
export function useScrollTo(offset = 72) {
  return useCallback(
    (id) => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [offset],
  )
}
