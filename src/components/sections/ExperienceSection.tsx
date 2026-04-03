'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Laptop, CheckCircle2, Calendar, MapPin } from 'lucide-react'
import { portfolioData } from '@/lib/data'

const typeIcons: Record<string, React.ElementType> = {
  Internship: Briefcase,
  Freelance: Laptop,
  Education: GraduationCap,
}

const typeColors: Record<string, string> = {
  Internship: '#00ff88',
  Freelance: '#00d4ff',
  Education: '#8b5cf6',
}

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const { experience } = portfolioData

  return (
    <section id="experience" ref={ref} className="py-24 sm:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="section-badge">
            <span className="text-accent-green">// 04</span> Experience
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mt-3">
            My Journey<span className="text-accent-green">.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-green via-accent-purple to-transparent" />

          <div className="space-y-10">
            {experience.map((exp, i) => {
              const Icon = typeIcons[exp.type] || Briefcase
              const color = typeColors[exp.type] || '#00ff88'

              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative sm:pl-24"
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden sm:flex absolute left-4 top-6 w-8 h-8 rounded-full items-center justify-center border-2 z-10"
                    style={{
                      borderColor: color,
                      background: '#030712',
                      boxShadow: `0 0 16px ${color}40`,
                    }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="glass-card rounded-2xl p-6 sm:p-8"
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-mono text-xs px-2.5 py-0.5 rounded-full border"
                            style={{ color, borderColor: `${color}40`, background: `${color}12` }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-text-primary">{exp.title}</h3>
                        <p className="font-mono text-sm mt-1" style={{ color }}>{exp.company}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-text-muted shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-5">
                      {exp.description.map((point, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.2 + i * 0.15 + j * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color }} />
                          <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border-default">
                      {exp.tech.map(t => (
                        <span key={t} className="skill-tag">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
