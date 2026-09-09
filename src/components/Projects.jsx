import { useMemo, useState } from 'react'
import { projects } from '../data/content'
import { useTilt } from '../hooks/useAnimations'
import { ArrowUpRight } from './Icons'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

function ProjectCard({ project, index }) {
  const ref = useTilt({ max: 5 })

  return (
    <Reveal
      className={project.featured ? 'card--featured' : ''}
      delay={(index % 3) * 0.09}
      y={44}
      key={project.title}
    >
      <a
        ref={ref}
        className={`card ${project.featured ? 'card--featured' : ''}`}
        href={project.href}
        target={project.href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        data-cursor="view"
      >
        <span className="card__spot" />
        <span className="card__year mono">{project.year}</span>

        <div className="card__thumb">
          {project.image ? (
            <img src={project.image} alt={`Tangkapan layar ${project.title}`} loading="lazy" />
          ) : (
            <span className="card__ph">{project.title.slice(0, 2).toUpperCase()}</span>
          )}
        </div>

        <div className="card__body">
          <div className="card__title">
            <h3>{project.title}</h3>
            <ArrowUpRight className="card__arrow" width={18} height={18} />
          </div>
          <p className="card__desc">{project.desc}</p>
          <ul className="card__tags">
            {project.tags.map((t) => (
              <li className="tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </Reveal>
  )
}

export default function Projects() {
  const categories = useMemo(
    () => ['Semua', ...new Set(projects.map((p) => p.category))],
    [],
  )
  const [filter, setFilter] = useState('Semua')

  const shown = filter === 'Semua' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="section shell" id="work">
      <SectionHead
        eyebrow="Proyek"
        title="Yang pernah saya bangun"
        desc="Masih sedikit dan sengaja hanya yang benar-benar saya kerjakan sendiri. Akan bertambah."
      />

      <div className="projects__filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter ${filter === c ? 'is-active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="projects__grid">
        {shown.map((project, i) => (
          // key ikut filter supaya animasi muncul ulang setiap ganti kategori
          <ProjectCard key={`${filter}-${project.title}`} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
