'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import ScrollToTop from '@/components/ui/ScrollToTop'

// Dynamic imports for client-only components
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false })

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
