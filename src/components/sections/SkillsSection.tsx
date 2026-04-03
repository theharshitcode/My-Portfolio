'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { portfolioData } from '@/lib/data'

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState(0)
  const { skills } = portfolioData

  return (
    <section id="skills" ref={ref} className="py-24 sm:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="section-badge">
            <span className="text-accent-green">// 02</span> Skills & Tech
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mt-3">
            My Toolbox<span className="text-accent-green">.</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl">
            Technologies and tools I've worked with, with honest proficiency levels.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {skills.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 font-mono text-xs sm:text-sm px-4 py-2 rounded-lg border transition-all duration-300 ${
                activeTab === i
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-border-default text-text-secondary hover:border-accent-green/30 hover:text-text-primary'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.category}</span>
              <span className="sm:hidden">{cat.category.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid — all categories shown on desktop, tab-based on mobile */}
        <div className="block sm:hidden">
          {/* Mobile: show active tab only */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{skills[activeTab].icon}</span>
              <h3 className="font-display text-lg font-bold" style={{ color: skills[activeTab].color }}>
                {skills[activeTab].category}
              </h3>
            </div>
            <div className="space-y-5">
              {skills[activeTab].items.map((skill, j) => (
                <SkillBar key={skill.name} skill={skill} color={skills[activeTab].color} index={j} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop: all tabs grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display text-base font-bold" style={{ color: cat.color }}>
                  {cat.category}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.items.map((skill, j) => (
                  <SkillBar key={skill.name} skill={skill} color={cat.color} index={j} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill, color, index, inView }: {
  skill: { name: string; level: number }
  color: string
  index: number
  inView: boolean
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm text-text-secondary">{skill.name}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="progress-bar h-1.5">
        <motion.div
          className="progress-fill h-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
