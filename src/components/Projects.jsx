import { useMemo, useState } from 'react'
import { projects } from '../data/content'
import { useTilt } from '../hooks/useAnimations'
import { ArrowUpRight } from './Icons'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

function ProjectCard({ project, index }) {
  const ref = useTilt({ max: 5 })
  const primary = project.links[0]

  const thumb = project.image ? (
    <img src={project.image} alt={`Tangkapan layar ${project.title}`} loading="lazy" />
  ) : (
    <span className="card__ph">{project.title.slice(0, 2).toUpperCase()}</span>
  )

  return (
    <Reveal className={project.featured ? 'card--featured' : ''} delay={(index % 3) * 0.09} y={44}>
      {/* Kartunya sengaja <article>, bukan <a>. Satu proyek bisa punya
          beberapa tautan (frontend & backend terpisah), dan tautan di dalam
          tautan bukan HTML yang sah. */}
      <article ref={ref} className={`card ${project.featured ? 'card--featured' : ''}`}>
        <span className="card__spot" />
        <span className="card__year mono">{project.year}</span>

        {/* Gambarnya jadi tautan ke repo utama kalau ada — di situlah kursor
            "LIHAT" muncul. Kalau proyeknya tanpa tautan, cukup <div> biasa. */}
        {primary ? (
          <a
            className="card__thumb"
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="view"
            aria-label={`Buka ${project.title} di GitHub`}
          >
            {thumb}
          </a>
        ) : (
          <div className="card__thumb">{thumb}</div>
        )}

        <div className="card__body">
          <h3 className="card__title">{project.title}</h3>
          <p className="card__desc">{project.desc}</p>

          <ul className="card__tags">
            {project.tags.map((t) => (
              <li className="tag" key={t}>
                {t}
              </li>
            ))}
          </ul>

          {project.links.length > 0 && (
            <div className="card__links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  className="card__link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <ArrowUpRight width={15} height={15} />
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  const categories = useMemo(() => ['Semua', ...new Set(projects.map((p) => p.category))], [])
  const [filter, setFilter] = useState('Semua')

  const shown = filter === 'Semua' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="section shell" id="work">
      <SectionHead
        eyebrow="Proyek"
        title="Yang pernah saya bangun"
        desc="Sebagian kodenya bisa dibuka langsung di GitHub lewat tautan pada tiap kartu."
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
