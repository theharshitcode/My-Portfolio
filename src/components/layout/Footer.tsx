'use client'
import { motion } from 'framer-motion'
import { Terminal, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { portfolioData } from '@/lib/data'

export default function Footer() {
  const { personal } = portfolioData
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border-default bg-bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
              <Terminal size={14} className="text-accent-green" />
            </div>
            <span className="font-display text-sm font-bold text-accent-green tracking-wider">
              {personal.name.split(' ')[0].toLowerCase()}.dev
            </span>
          </motion.div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs text-text-muted hover:text-accent-green transition-colors tracking-widest uppercase"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { icon: Github, href: personal.github },
              { icon: Linkedin, href: personal.linkedin },
              // { icon: Twitter, href: personal.twitter },
              { icon: Mail, href: `mailto:${personal.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-8 h-8 glass-card rounded-lg flex items-center justify-center text-text-muted hover:text-accent-green transition-colors"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-default text-center">
          <p className="font-mono text-xs text-text-muted flex items-center justify-center gap-1.5 flex-wrap">
            <span>© {year} {personal.name}.</span>
            <span>Built with</span>
            <Heart size={10} className="text-red-500 inline" />
            <span>using Next.js, TypeScript & Framer Motion.</span>
          </p>
          <p className="font-mono text-xs text-text-muted/50 mt-1">
            Designed & developed from scratch — no templates.
          </p>
        </div>
      </div>
    </footer>
  )
}
