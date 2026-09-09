import { useMagnetic } from '../hooks/useAnimations'

/** Pembungkus kecil supaya elemen di dalamnya "menempel" ke kursor. */
export default function Magnetic({ children, strength = 0.3, className = '', ...rest }) {
  const ref = useMagnetic(strength)

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', transition: 'transform 0.45s var(--ease)' }}
      {...rest}
    >
      {children}
    </span>
  )
}
