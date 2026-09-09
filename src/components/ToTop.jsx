import { useScrolledPast } from '../hooks/useAnimations'
import { ArrowUp } from './Icons'

export default function ToTop() {
  const show = useScrolledPast(700)

  return (
    <button
      type="button"
      className={`totop ${show ? 'is-on' : ''}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp width={18} height={18} />
    </button>
  )
}
