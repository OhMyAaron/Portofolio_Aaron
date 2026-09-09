import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

/**
 * Galeri gambar yang bisa digeser di dalam kartu proyek.
 *
 * Penggeserannya memakai scroll bawaan browser + CSS scroll-snap, bukan
 * transform yang dihitung sendiri. Konsekuensinya: geser dengan jari di
 * ponsel dan dua jari di trackpad langsung bekerja tanpa kode tambahan,
 * dan React tidak perlu me-render ulang apa pun selama jarinya bergerak.
 * Tombol panah hanya memanggil scrollTo, karena menyeret dengan tetikus
 * bukan gerakan yang didukung browser secara bawaan.
 */
export default function Gallery({ images, title }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current
      if (!track) return
      const target = Math.max(0, Math.min(i, images.length - 1))
      track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
    },
    [images.length],
  )

  /* Menyelaraskan titik penanda dengan posisi scroll yang sebenarnya —
     termasuk ketika digeser dengan jari, bukan lewat tombol. */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    let last = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const current = Math.round(track.scrollLeft / track.clientWidth)
        if (current !== last) {
          last = current
          setIndex(current)
        }
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  const atStart = index === 0
  const atEnd = index === images.length - 1

  return (
    <div className="gal">
      <div className="gal__track" ref={trackRef}>
        {images.map((src, i) => (
          <div className="gal__slide" key={src}>
            <img
              src={src}
              alt={`${title} — screen ${i + 1} of ${images.length}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable="false"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="gal__nav gal__nav--prev"
        onClick={() => goTo(index - 1)}
        disabled={atStart}
        aria-label="Previous image"
      >
        <ChevronLeft width={18} height={18} />
      </button>

      <button
        type="button"
        className="gal__nav gal__nav--next"
        onClick={() => goTo(index + 1)}
        disabled={atEnd}
        aria-label="Next image"
      >
        <ChevronRight width={18} height={18} />
      </button>

      <div className="gal__dots">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`gal__dot ${i === index ? 'is-on' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  )
}
