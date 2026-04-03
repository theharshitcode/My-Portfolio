'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ChevronDown, Terminal, Zap, Code2 } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import MatrixRain from '@/components/ui/MatrixRain'
import { portfolioData } from '@/lib/data'

const terminalLines = [
  { text: '$ whoami', delay: 0, color: '#00ff88' },
  { text: 'harshit_saxena -- backend_developer', delay: 600, color: '#e2e8f0' },
  { text: '$ cat skills.txt', delay: 1200, color: '#00ff88' },
  { text: 'Java | JavaScript | Node.js | PostgreSQL | Docker | AWS', delay: 1800, color: '#00d4ff' },
  { text: '$ git log --oneline -3', delay: 2400, color: '#00ff88' },
  { text: 'a3f9b1c feat: distributed cache with 50k rps', delay: 3000, color: '#8b5cf6' },
  { text: '7d2e8a4 feat: auth microservice with OAuth2', delay: 3200, color: '#8b5cf6' },
  { text: '1c5f7b2 fix: reduce DB query time by 85%', delay: 3400, color: '#8b5cf6' },
  { text: '$ echo "Open to opportunities!"', delay: 4000, color: '#00ff88' },
  { text: 'Open to opportunities! ✓', delay: 4600, color: '#f472b6' },
]

export default function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const { personal } = portfolioData

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background effects */}
      <MatrixRain />
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-green/3 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/3 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDelay: '1s'}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 bg-accent-green/8 border border-accent-green/20 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="font-mono text-xs text-accent-green tracking-widest uppercase">
                {personal.availability}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-2">
                <span className="text-text-primary">Hi, I'm</span>
                <br />
                <span
                  className="text-accent-green glitch"
                  data-text={personal.name.split(' ')[0]}
                  style={{ display: 'inline-block' }}
                >
                  {personal.name.split(' ')[0]}
                </span>
                <span className="text-accent-cyan"> {personal.name.split(' ')[1]}</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-lg sm:text-xl text-text-secondary mt-4 mb-6 flex items-center gap-2"
            >
              <span className="text-accent-green">&gt;</span>
              <TypeAnimation
                sequence={personal.taglines.flatMap(t => [t, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent-cyan"
              />
              <span className="w-0.5 h-5 bg-accent-green animate-blink" />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              {personal.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-accent-green text-bg-primary font-mono font-bold text-sm px-6 py-3 rounded-lg tracking-wider uppercase transition-all"
              >
                <Code2 size={16} /> View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border border-accent-green/30 hover:border-accent-green/70 text-accent-green font-mono font-bold text-sm px-6 py-3 rounded-lg tracking-wider uppercase transition-all hover:bg-accent-green/5"
              >
                <Mail size={16} /> Hire Me
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { val: `${personal.yearsOfExperience}+`, label: 'Years Coding' },
                { val: `${personal.projectsCompleted}+`, label: 'Projects' },
                { val: `${personal.githubStars}+`, label: 'GitHub Stars' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-accent-green">{s.val}</div>
                  <div className="font-mono text-xs text-text-muted tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3"
            >
              {[
                { icon: Github, href: personal.github, label: 'GitHub' },
                { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
                { icon: Twitter, href: personal.twitter, label: 'Twitter' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-secondary hover:text-accent-green transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="float-animation hidden lg:block"
          >
            <div className="terminal">
              {/* Terminal header */}
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 font-mono text-xs text-text-muted tracking-wider">
                  harshit@portfolio:~$
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Terminal size={12} className="text-accent-green" />
                  <Zap size={10} className="text-accent-green animate-pulse" />
                </div>
              </div>

              {/* Terminal body */}
              <div className="terminal-body">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                    style={{ color: line.color }}
                    className="font-mono text-sm"
                  >
                    {line.text}
                  </motion.div>
                ))}
                {visibleLines.length >= terminalLines.length && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-accent-green">$</span>
                    <span className="w-2 h-4 bg-accent-green animate-blink ml-1" />
                  </div>
                )}
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['Java' , 'C++' , 'JavaScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="skill-tag cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} className="text-accent-green" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
