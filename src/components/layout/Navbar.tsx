'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Download } from 'lucide-react'
import { portfolioData } from '@/lib/data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-default shadow-[0_0_30px_rgba(0,255,136,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center group-hover:bg-accent-green/20 transition-all">
                <Terminal size={14} className="text-accent-green" />
              </div>
              <span className="font-display text-sm font-bold text-accent-green tracking-wider">
                {portfolioData.personal.name.split(' ')[0].toLowerCase()}.dev
              </span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:text-accent-green relative group ${
                    active === link.href ? 'text-accent-green' : 'text-text-secondary'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-green group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <motion.a
                href={portfolioData.personal.resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase bg-accent-green/10 hover:bg-accent-green/20 border border-accent-green/30 hover:border-accent-green/60 text-accent-green px-4 py-2 rounded-lg transition-all duration-300"
              >
                <Download size={12} />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green/30 transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-border-default md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-mono text-sm tracking-widest uppercase text-text-secondary hover:text-accent-green transition-all py-2 border-b border-border-default"
                >
                  <span className="text-accent-green mr-2">&gt;</span> {link.label}
                </motion.a>
              ))}
              <a
                href={portfolioData.personal.resume}
                download
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 font-mono text-sm tracking-widest uppercase bg-accent-green/10 border border-accent-green/30 text-accent-green px-4 py-3 rounded-lg text-center justify-center mt-2"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
