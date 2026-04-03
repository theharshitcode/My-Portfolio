'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react'
import { portfolioData } from '@/lib/data'

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const { contact, personal } = portfolioData

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    const res = await fetch("https://formspree.io/f/xzdkjzlq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch (error) {
    console.error(error);
    setStatus("error");
  }

  // reset status after 4 sec
  setTimeout(() => setStatus("idle"), 4000);
};

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-green/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="section-badge mx-auto w-fit">
            <span className="text-accent-green">// 05</span> Contact
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mt-3">
            {contact.heading}<span className="text-accent-green">.</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">{contact.subheading}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Get in Touch
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, color: '#00ff88' },
                { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}`, color: '#00d4ff' },
                { icon: MapPin, label: 'Location', value: contact.location, href: '#', color: '#8b5cf6' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{ borderColor: `${color}30`, background: `${color}10` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted mb-0.5">{label}</div>
                    <div className="text-sm text-text-primary group-hover:text-accent-green transition-colors">{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <h4 className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Find me on</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: personal.github, label: 'GitHub', color: '#e2e8f0' },
                { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn', color: '#0ea5e9' },
                // { icon: Twitter, href: personal.twitter, label: 'Twitter', color: '#00d4ff' },
              ].map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-text-secondary transition-all"
                  style={{ '--hover-color': color } as React.CSSProperties}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-8 p-5 rounded-xl border border-accent-green/20 bg-accent-green/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono text-sm text-accent-green font-bold">Available Now</span>
              </div>
              <p className="text-text-secondary text-sm">
                Currently open to <span className="text-text-primary">full-time roles</span>,{' '}
                <span className="text-text-primary">internships</span>, and{' '}
                <span className="text-text-primary">freelance projects</span>. Response time: &lt;24h.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-text-primary mb-6">Send a Message</h3>

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <CheckCircle size={48} className="text-accent-green" />
                  <h4 className="font-display text-xl font-bold text-text-primary">Message Sent!</h4>
                  <p className="text-text-secondary">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-text-muted block mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Kumar"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-text-muted block mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-text-muted block mb-2">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="Job opportunity / Project collaboration"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-text-muted block mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Hi Arjun, I came across your portfolio and..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="form-input resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-accent-green text-bg-primary font-mono font-bold text-sm py-4 rounded-xl tracking-wider uppercase transition-all disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
