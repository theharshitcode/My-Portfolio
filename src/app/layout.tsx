import type { Metadata } from 'next'
import '@/styles/globals.css'
import { portfolioData } from '@/lib/data'

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} | Backend Developer`,
  description: `Portfolio of ${portfolioData.personal.name} — Backend Developer specializing in scalable APIs, microservices, and cloud infrastructure.`,
  keywords: ['backend developer', 'software engineer', 'API', 'Node.js', 'Python', 'PostgreSQL', 'portfolio'],
  authors: [{ name: portfolioData.personal.name }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
