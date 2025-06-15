"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award, Code, Users } from "lucide-react"

const stats = [
  { number: 300, label: "LeetCode Problems Solved", icon: Code },
  { number: 1500, label: "CodeChef Rating", icon: Trophy },
  { number: 8, label: "NPTEL Certifications", icon: Award },
  { number: 4, label: "Major Projects", icon: Users },
]

const achievements = [
  {
    title: "Dosehack'24 Hackathon",
    description: "Gained hands-on experience in AI/ML challenges at a 24-hour hackathon organized by Meditab",
    date: "2024",
    type: "Hackathon",
  },
  {
    title: "OdooxMSU Hackathon - Top 50",
    description:
      "Selected in the top 50 teams out of 650+ participants, showcasing problem-solving and teamwork skills",
    date: "2024",
    type: "Hackathon",
  },
  {
    title: "NPTEL Computer Networks - Top 5%",
    description:
      "Secured top 5% ranking in Computer Networks certification, demonstrating proficiency in networking concepts",
    date: "2024",
    type: "Certification",
  },
  {
    title: "LeetCode Problem Solver",
    description: "Solved 300+ coding problems on LeetCode, showcasing strong problem-solving and algorithmic skills",
    date: "2023-2024",
    type: "Achievement",
  },
  {
    title: "CodeChef Competitive Programming",
    description:
      "Achieved a competitive rating of 1500+ on CodeChef, reflecting strong coding and problem-solving abilities",
    date: "2023-2024",
    type: "Achievement",
  },
  {
    title: "Google Cloud Career Readiness",
    description: "Completed Google Cloud Career Readiness Certification, gaining expertise in cloud technologies",
    date: "2023",
    type: "Certification",
  },
]

export default function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Milestones and accomplishments that reflect my dedication to continuous learning and excellence in
            technology.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold mb-2">{inView && <CountUp end={stat.number} duration={2} />}+</div>
                  <p className="text-sm text-foreground/70">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievements List */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {achievement.type}
                    </span>
                    <span className="text-sm text-foreground/60">{achievement.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                  <p className="text-foreground/70">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
