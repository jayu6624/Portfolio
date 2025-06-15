"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Brain, Rocket, Users } from "lucide-react"

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Expertise in MERN stack with modern frameworks and tools",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Experience with Gemini AI and machine learning technologies",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Building cutting-edge solutions for real-world problems",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Strong team player with excellent communication skills",
  },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with a strong foundation in modern web technologies and a keen
            interest in artificial intelligence. I love creating innovative solutions that make a real impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <img
                src="/images/jaydeep-profile.jpg"
                alt="Jaydeep Rathod"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              <p className="text-foreground/80 leading-relaxed">
                I'm currently pursuing B.Tech in Information Technology at Charotar University of Science and Technology
                (CHARUSAT) with a CGPA of 8.82/10. I have hands-on experience with the MERN stack, AI integration, and
                modern development practices.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                My journey in technology is driven by curiosity and the desire to solve complex problems. I've completed
                internships, participated in hackathons, and built several full-stack applications that showcase my
                technical skills and problem-solving abilities.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Education</h4>
                  <p>B.Tech IT - CHARUSAT</p>
                  <p className="text-foreground/70">CGPA: 8.82/10</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Location</h4>
                  <p>Rajkot, Gujarat</p>
                  <p className="text-foreground/70">India</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {["C++", "Java", "Python", "JavaScript", "React", "Node.js", "MongoDB"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
