'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Star, GitFork, Tag } from 'lucide-react'
import { portfolioData } from '@/lib/data'

const categories = ['All', 'Systems', 'Security', 'E-commerce', 'Data Engineering', 'Utility', 'Developer Tools']

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const { projects } = portfolioData

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  const displayed = showAll ? filtered : filtered.slice(0, 3)

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="section-badge">
            <span className="text-accent-green">// 03</span> Projects
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mt-3">
            Things I've Built<span className="text-accent-green">.</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl">
            Real projects with real impact — from distributed systems to developer tools.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowAll(false) }}
              className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-300 ${
                filter === cat
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-border-default text-text-muted hover:border-accent-green/30 hover:text-text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden group relative flex flex-col"
              >
                {/* Top accent bar */}
                <div
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg, #00ff88, #00d4ff, #8b5cf6)' }}
                />

                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-xs bg-accent-green/15 border border-accent-green/30 text-accent-green px-2.5 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Category */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Tag size={10} className="text-accent-cyan" />
                    <span className="font-mono text-xs text-accent-cyan">{project.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3 group-hover:text-accent-green transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map(t => (
                      <span key={t} className="skill-tag">{t}</span>
                    ))}
                  </div>

                  {/* Stats + links */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-default">
                    <div className="flex items-center gap-4 text-text-muted">
                      <span className="flex items-center gap-1 font-mono text-xs hover:text-accent-green transition-colors">
                        <Star size={12} /> {project.stats.stars}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs hover:text-accent-cyan transition-colors">
                        <GitFork size={12} /> {project.stats.forks}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        className="w-8 h-8 rounded-lg border border-border-default hover:border-accent-green/50 flex items-center justify-center text-text-muted hover:text-accent-green transition-all"
                      >
                        <Github size={15} />
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          className="w-8 h-8 rounded-lg border border-border-default hover:border-accent-cyan/50 flex items-center justify-center text-text-muted hover:text-accent-cyan transition-all"
                        >
                          <ExternalLink size={15} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {filtered.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-mono text-sm border border-accent-green/30 hover:border-accent-green text-accent-green px-8 py-3 rounded-xl hover:bg-accent-green/5 transition-all tracking-wider"
            >
              {showAll ? '↑ Show Less' : `↓ Show All ${filtered.length} Projects`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
