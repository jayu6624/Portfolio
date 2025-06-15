import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skills = [
	// Programming Languages
	{ name: "C++", percentage: 85, category: "Programming" },
	{ name: "Java", percentage: 80, category: "Programming" },
	{ name: "Python", percentage: 75, category: "Programming" },
	{ name: "JavaScript", percentage: 90, category: "Programming" },

	// Frontend
	{ name: "React.js", percentage: 85, category: "Frontend" },
	{ name: "Redux", percentage: 75, category: "Frontend" },
	{ name: "Tailwind CSS", percentage: 90, category: "Frontend" },
	{ name: "HTML/CSS", percentage: 95, category: "Frontend" },

	// Backend
	{ name: "Node.js", percentage: 80, category: "Backend" },
	{ name: "Express.js", percentage: 80, category: "Backend" },

	// Database
	{ name: "MongoDB", percentage: 85, category: "Database" },
	{ name: "SQL", percentage: 75, category: "Database" },

	// Tools & Platforms
	{ name: "Git", percentage: 85, category: "Tools" },
	{ name: "GitHub", percentage: 90, category: "Tools" },
	{ name: "Linux", percentage: 70, category: "Tools" },
	{ name: "Kali Linux", percentage: 65, category: "Tools" },

	// Technical Concepts
	{ name: "DSA", percentage: 85, category: "Concepts" },
	{ name: "Networking", percentage: 80, category: "Concepts" },
	{ name: "OS", percentage: 75, category: "Concepts" },
	{ name: "Problem Solving", percentage: 90, category: "Concepts" },

	// Soft Skills
	{ name: "Communication", percentage: 85, category: "Soft Skills" },
	{ name: "Teamwork", percentage: 90, category: "Soft Skills" },
	{ name: "Leadership", percentage: 80, category: "Soft Skills" },
	{ name: "Time Management", percentage: 85, category: "Soft Skills" },
]

const categories = [
	"Programming",
	"Frontend",
	"Backend",
	"Database",
	"Tools",
	"Concepts",
	"Soft Skills",
]

export default function Skills() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	return (
		<section id="skills" className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Skills & Expertise
					</h2>
					<p className="text-lg text-foreground/70 max-w-3xl mx-auto">
						A comprehensive overview of my technical and soft skills developed
						through hands-on projects and continuous learning.
					</p>
				</motion.div>

				{/* Grid layout for categories */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{categories.map((category, categoryIndex) => (
						<motion.div
							key={category}
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
							className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 sm:p-6 shadow-sm"
						>
							<h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center border-b pb-2 border-border/50">
								{category}
							</h3>
							<div className="space-y-4">
								{skills
									.filter((skill) => skill.category === category)
									.map((skill, index) => (
										<motion.div
											key={skill.name}
											initial={{ opacity: 0, width: 0 }}
											animate={inView ? { opacity: 1, width: "100%" } : {}}
											transition={{ duration: 0.8, delay: 0.1 * index }}
											className="w-full"
										>
											<div className="flex justify-between items-center mb-1">
												<span className="text-sm font-medium">{skill.name}</span>
												<span className="text-xs font-semibold">
													{skill.percentage}%
												</span>
											</div>
											<div className="w-full bg-muted dark:bg-gray-700 rounded-full h-2">
												<motion.div
													initial={{ width: "0%" }}
													animate={inView ? { width: `${skill.percentage}%` } : {}}
													transition={{ duration: 1, delay: 0.2 * index }}
													className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
													style={{ width: `${skill.percentage}%` }}
												/>
											</div>
										</motion.div>
									))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
