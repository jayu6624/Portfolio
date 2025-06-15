"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Play } from "lucide-react"
// Import project images - fix the capitalization to match the actual file
import swasthifyImage from "../images/Swastify.png"
import Oursathi from '../images/Our_sathi.png'
import Dharohar from '../images/Dharohar.png'
import BlogMart from '../images/BlogMart.png' // Assuming you have a placeholder image for BlogMart

const projects = [
	{
		title: "Swasthify",
		description:
			"A comprehensive health-tracking platform using MERN stack, integrating Gemini AI for meal recognition, calorie and protein analysis, and personalized health recommendations.",
		technologies: [
			"React.js",
			"Node.js",
			"MongoDB",
			"Gemini AI",
			"Flutter",
			"Tailwind CSS",
		],
		githubUrl: "https://github.com/jayu6624/Swasthify",
		liveUrl: "#",
		image: swasthifyImage.src, // Use imported image
		category: "Ongoing",
		status: "In Development",
	},
	{
		title: "Our Sathi",
		description:
			"A transportation platform built using MERN stack, integrating OpenService API for real-time location tracking and ride booking functionality.",
		technologies: ["MERN Stack", "OpenService API", "Real-time Location", "MongoDB"],
		githubUrl: "https://github.com/jayu6624/Our_Sathi",
		liveUrl: "#",
		image: Oursathi.src, // Use imported image
		category: "Completed",
		status: "Completed",
	},
	{
		title: "Bharat Dharohar",
		description:
			"A heritage exploration platform using MERN stack with features like event creation, blog posting, and interactive map integration for cultural heritage sites.",
		technologies: ["MERN Stack", "Map Integration", "Event Management", "Blog System"],
		githubUrl: "https://github.com/jayu6624/Bharat-Dharohar",
		liveUrl: "#",
		image: Dharohar.src, // Use imported image
		category: "Ongoing",
		status: "In Development",
	},
	{
		title: "BlogMart",
		description:
			"A full-stack web application developed during internship at Elite InfoTech, featuring responsive design and smooth user interactions through RESTful APIs.",
		technologies: ["MERN Stack", "Tailwind CSS", "RESTful APIs", "Responsive Design"],
		githubUrl: "#",
		liveUrl: "#",
		image: BlogMart.src, // Use imported image
		category: "Internship",
		status: "Completed",
	},
]

export default function Projects() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	})
	const [flippedCard, setFlippedCard] = useState<number | null>(null)

	return (
		<section id="projects" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Featured Projects
					</h2>
					<p className="text-lg text-foreground/70 max-w-3xl mx-auto">
						A showcase of my recent work, demonstrating expertise in full-stack
						development, AI integration, and modern web technologies.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 50 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="perspective-1000"
						>
							<motion.div
								animate={{ rotateY: flippedCard === index ? 180 : 0 }}
								transition={{ duration: 0.6 }}
								className="relative preserve-3d h-[420px] sm:h-96"
							>
								{/* Front of card */}
								<Card className="absolute inset-0 backface-hidden cursor-pointer shadow-md">
									<CardContent className="p-0 h-full">
										<div className="relative h-full">
											<img
												src={project.image || "/placeholder.svg"}
												alt={project.title}
												className="w-full h-48 object-cover rounded-t-lg"
											/>
											{/* Improved gradient overlay for better text visibility */}
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-lg" />
											<Button
												variant="secondary"
												size="icon"
												className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white z-10"
												onClick={() => setFlippedCard(index)}
											>
												<Play className="h-4 w-4" />
											</Button>
											<div className="p-6">
												<span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium mb-3">
													{project.category} • {project.status}
												</span>
												<h3 className="text-xl font-bold mb-2 text-foreground dark:text-white">
													{project.title}
												</h3>
												<p className="text-foreground/90 dark:text-white text-sm leading-relaxed">
													{project.description}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Back of card */}
								<Card className="absolute inset-0 backface-hidden rotate-y-180 cursor-pointer shadow-md">
									<CardContent className="p-6 h-full flex flex-col justify-between overflow-y-auto">
										<div>
											<h3 className="text-xl font-bold mb-4 text-foreground dark:text-white">
												{project.title}
											</h3>
											<p className="text-foreground/90 dark:text-white/90 mb-6">
												{project.description}
											</p>
											<div className="space-y-4">
												<div>
													<h4 className="font-semibold mb-2">
														Technologies Used:
													</h4>
													<div className="flex flex-wrap gap-2">
														{project.technologies.map((tech) => (
															<span
																key={tech}
																className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
															>
																{tech}
															</span>
														))}
													</div>
												</div>
											</div>
										</div>
										<div className="flex gap-3 mt-6">
											<Button variant="outline" size="sm" asChild>
												<a
													href={project.githubUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Github className="h-4 w-4 mr-2" />
													Code
												</a>
											</Button>
											<Button size="sm" asChild>
												<a
													href={project.liveUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink className="h-4 w-4 mr-2" />
													Live Demo
												</a>
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setFlippedCard(null)}
											>
												Back
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
