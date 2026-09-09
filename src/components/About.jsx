import { about, facts, stats } from '../data/content'
import { useCountUp, useInView } from '../hooks/useAnimations'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

/** Mengubah penanda **tebal** di teks menjadi elemen <strong>. */
function RichText({ text }) {
  return (
    <p>
      {text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
        chunk.startsWith('**') ? (
          <strong key={i}>{chunk.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </p>
  )
}

function Stat({ value, suffix, label, delay }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const shown = useCountUp(value, inView)

  return (
    <Reveal className="stat" delay={delay} y={26}>
      <div ref={ref}>
        <div className="stat__num grad-text">
          {shown}
          {suffix}
        </div>
        <div className="stat__label">{label}</div>
      </div>
    </Reveal>
  )
}

export default function About() {
  return (
    <section className="section shell" id="about">
      <SectionHead
        eyebrow="About"
        title="Where I come from and how I work"
        desc="A brief background on the way I work and the things I pay attention to."
      />

      <div className="about__grid">
        <div className="about__body">
          {about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08} y={26}>
              <RichText text={paragraph} />
            </Reveal>
          ))}
        </div>

        <div className="about__side">
          <Reveal className="about__facts" delay={0.06} y={26}>
            <dl>
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="about__stats">
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} delay={0.06 * i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
