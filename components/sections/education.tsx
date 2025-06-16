"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from "lucide-react"

const education = [
	{
		institution: "Charotar University of Science and Technology (CHARUSAT)",
		degree: "Bachelor of Technology (B.Tech) - Information Technology",
		duration: "August 2022 - Present",
		grade: "Current CGPA: 8.82/10",
		location: "Gujarat, India",
		type: "University",
	},
	{
		institution: "Saraswati School",
		degree: "Class XII",
		duration: "2021 - 2022",
		grade: "PR: 88.66%",
		location: "Gujarat, India",
		type: "Higher Secondary",
	},
	{
		institution: "Dholakiya School",
		degree: "Class X",
		duration: "2020",
		grade: "PR: 98.20%",
		location: "Gujarat, India",
		type: "Secondary",
	},
]

// Updated certifications with actual links
const certifications = [
	
	{
		name: "Google Cloud Career Readiness Certification",
		link: "https://drive.google.com/file/d/1_E2w8nErUCBeCJXK5IYzujzHwNSbJrAD/view?usp=sharing",
	},
	{
		name: "Docker Foundations Certificate",
		link: "https://drive.google.com/file/d/1WtKoiu7aZo30JOvsOdOR_3kCItnhSGiK/view?usp=sharing",
	},
  {
		name: "MongoDB Certification",
		link: "https://drive.google.com/file/d/1sRa6pW4z21bZDa0K52ZmM1Q8dg1TX0rF/view?usp=sharing",
	},
  {
		name: "NPTEL: Computer Networks (Top 5%)",
		link: "https://drive.google.com/file/d/1P7h3QwqIFbTijIRLxs7BKNyXV_wLCCH7/view?usp=sharing",
	},
	{
		name: "NPTEL: Operating Systems",
		link: "https://drive.google.com/file/d/1jEc8lFYbp4Mf2UQ8WIpMbPCtEP2X9yjA/view?usp=sharing",
	},
	{
		name: "NPTEL: Database Management System",
		link: "https://drive.google.com/file/d/1h7vwC16pdAJ2hcS3B33XYLjzVHmPUCMy/view?usp=sharing",
	},
	{
		name: "NPTEL: Data Structures and Algorithms",
		link: "https://drive.google.com/file/d/1gdGOIArtX6q5BHUMo59Cn8147d8WuR_m/view?usp=sharing",
	},
	
]

export default function Education() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})

	return (
		<section id="education" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Education & Certifications
					</h2>
					<p className="text-lg text-foreground/70 max-w-3xl mx-auto">
						My academic journey and professional certifications that have shaped my
						technical expertise and knowledge foundation.
					</p>
				</motion.div>

				{/* Education Timeline */}
				<div className="mb-16">
					<h3 className="text-2xl font-semibold mb-8 text-center">
						Academic Background
					</h3>
					<div className="space-y-6">
						{education.map((edu, index) => (
							<motion.div
								key={edu.institution}
								initial={{
									opacity: 0,
									x: index % 2 === 0 ? -50 : 50,
								}}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.6, delay: index * 0.2 }}
							>
								<Card className="overflow-hidden">
									<CardContent className="p-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
											<div className="mb-4 md:mb-0">
												<div className="flex items-center gap-2 mb-2">
													<GraduationCap className="h-5 w-5 text-blue-600" />
													<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
														{edu.type}
													</span>
												</div>
												<h3 className="text-xl font-bold mb-1">
													{edu.institution}
												</h3>
												<p className="text-foreground/80 font-medium">
													{edu.degree}
												</p>
											</div>
											<div className="text-right">
												<div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
													<Calendar className="h-4 w-4" />
													<span className="font-medium">{edu.duration}</span>
												</div>
												<div className="flex items-center gap-1 text-foreground/60 mb-2">
													<MapPin className="h-4 w-4" />
													<span>{edu.location}</span>
												</div>
												<div className="flex items-center gap-1 text-green-600 dark:text-green-400">
													<Award className="h-4 w-4" />
													<span className="font-semibold">{edu.grade}</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>

				{/* Certifications */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<h3 className="text-2xl font-semibold mb-8 text-center">
						Professional Certifications
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{certifications.map((cert, index) => (
							<motion.div
								key={cert.name}
								whileHover={{ scale: 1.02 }}
								className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
							>
								<a
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 group"
								>
									<Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
									<span className="font-medium text-sm group-hover:text-blue-600 transition-colors">
										{cert.name}
									</span>
									<ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 ml-auto transition-colors" />
								</a>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
