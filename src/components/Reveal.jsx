import { useInView } from '../hooks/useAnimations'

/**
 * Membungkus apa saja agar muncul dengan animasi ketika masuk layar.
 *
 * <Reveal delay={0.1} y={40}>...</Reveal>
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  x = 0,
  y = 34,
  scale = 1,
  className = '',
  once = true,
  ...rest
}) {
  const [ref, inView] = useInView({ once })

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{
        '--rd': `${delay}s`,
        '--rx': `${x}px`,
        '--ry': `${y}px`,
        '--rs': scale,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
