'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Coffee, Code, Star, Trophy, Briefcase } from 'lucide-react'
import { portfolioData } from '@/lib/data'

const codeSnippet = `// about_me.py
class BackendDeveloper:
    def __init__(self):
        self.name     = "Harshit Saxena"
        self.location = "Lucknow, India"
        self.role     = "Backend Developer"
        self.focus    = [
            "Scalable APIs",
            "Database Design", 
            "System Architecture",
        ]
        self.love     = ["Clean Code", "Coffee ☕"]

    def is_available(self) -> bool:
        return True  # Yes! Hire me.

    def current_goal(self) -> str:
        return "Build systems that scale 🚀"

me = BackendDeveloper()
print(me.is_available())  # True`

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { personal, achievements } = portfolioData

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-badge">
            <span className="text-accent-green">// 01</span> About Me
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mt-3">
            Who am I<span className="text-accent-green">?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Code window */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 font-mono text-xs text-text-muted">about_me.py</span>
              </div>
              <div className="terminal-body text-sm overflow-x-auto">
                {codeSnippet.split('\n').map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="font-mono leading-relaxed"
                  >
                    <span className="text-text-muted select-none mr-4 text-xs">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/(".*?")/g, '<span style="color:#f472b6">$1</span>')
                          .replace(/(#.*)/g, '<span style="color:#475569;font-style:italic">$1</span>')
                          .replace(/\b(class|def|self|return|True)\b/g, '<span style="color:#00d4ff">$1</span>')
                          .replace(/\b(BackendDeveloper|str|bool)\b/g, '<span style="color:#8b5cf6">$1</span>')
                          .replace(/\b(print|me)\b/g, '<span style="color:#f97316">$1</span>')
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
                {personal.bio}
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                My approach: write code that's{' '}
                <span className="text-accent-green font-medium">easy to understand</span>,{' '}
                <span className="text-accent-cyan font-medium">simple to maintain</span>, and{' '}
                <span className="text-accent-purple font-medium">built to scale</span>. I believe great backend engineering is invisible — it just works.
              </p>

              {/* Info pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 glass-card rounded-lg px-4 py-2">
                  <MapPin size={14} className="text-accent-green" />
                  <span className="font-mono text-sm text-text-secondary">{personal.location}</span>
                </div>
                <div className="flex items-center gap-2 glass-card rounded-lg px-4 py-2">
                  <Coffee size={14} className="text-accent-orange" />
                  <span className="font-mono text-sm text-text-secondary">Coffee-powered coder</span>
                </div>
                <div className="flex items-center gap-2 glass-card rounded-lg px-4 py-2">
                  <Code size={14} className="text-accent-cyan" />
                  <span className="font-mono text-sm text-text-secondary">Open Source Fan</span>
                </div>
              </div>

              {/* Achievements grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={ach.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="glass-card rounded-xl p-4"
                  >
                    <div className="text-2xl mb-2">{ach.icon}</div>
                    <div className="font-display text-sm font-bold text-text-primary mb-1">{ach.title}</div>
                    <div className="font-mono text-xs text-text-muted">{ach.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
