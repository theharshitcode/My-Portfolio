'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingLines = [
  'Initializing portfolio...',
  'Loading projects [████████░░] 80%',
  'Compiling skills...',
  'Connecting to database...',
  'Spinning up containers...',
  'Ready! ✓',
]

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex(prev => {
        if (prev >= loadingLines.length - 1) {
          clearInterval(lineTimer)
          return prev
        }
        return prev + 1
      })
    }, 280)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return prev + 4
      })
    }, 70)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-bg-primary flex items-center justify-center"
        >
          <div className="w-full max-w-sm px-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="font-display text-3xl font-black text-accent-green tracking-wider mb-1">
                &lt;HS /&gt;
              </div>
              <div className="font-mono text-xs text-text-muted tracking-widest uppercase">
                Portfolio v2.0
              </div>
            </div>

            {/* Terminal lines */}
            <div className="font-mono text-xs space-y-1.5 mb-6 h-36 overflow-hidden">
              {loadingLines.slice(0, lineIndex + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === lineIndex ? 'text-accent-green' : 'text-text-muted'}
                >
                  <span className="text-accent-green mr-2">$</span>{line}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-bg-card rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-green rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-xs text-text-muted">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
