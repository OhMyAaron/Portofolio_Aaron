import { stackGroups } from '../data/content'
import { icons } from './iconMap'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

/** Sorotan lembut yang mengikuti kursor di dalam kartu. */
const followPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Stack() {
  return (
    <section className="section shell" id="stack">
      <SectionHead
        eyebrow="Skills"
        title="The tools I work with day to day"
        desc="The languages, frameworks, and tools I rely on for coursework, personal projects, and organizational work."
      />

      <div className="stack__groups">
        {stackGroups.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <Reveal
              key={group.title}
              className="stack__card"
              delay={i * 0.08}
              y={40}
              onMouseMove={followPointer}
            >
              <div className="stack__inner">
                <span className="stack__icon">
                  <Icon />
                </span>
                <h3>{group.title}</h3>
                <ul className="stack__tags">
                  {group.items.map((item) => (
                    <li className="tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
