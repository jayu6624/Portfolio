"use client"

import dynamic from "next/dynamic"
import AnimatedNavbar from "@/components/animated-navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Education from "@/components/sections/education"
const ThemeProvider = dynamic(() => import("@/components/theme-provider").then(mod => mod.ThemeProvider), { ssr: false })

export default function Portfolio() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background text-foreground">
        <AnimatedNavbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  )
}
