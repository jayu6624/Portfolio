"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const navItems = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Achievements", href: "#achievements" },
	{ name: "Contact", href: "#contact" },
]

export default function AnimatedNavbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Handle click outside to close menu
	useEffect(() => {
		if (isMobileMenuOpen) {
			const handleClickOutside = (e: MouseEvent) => {
				const target = e.target as HTMLElement
				if (
					target.id !== "mobile-menu" && 
					!target.closest("#mobile-menu") && 
					!target.closest("#mobile-menu-button")
				) {
					setIsMobileMenuOpen(false)
				}
			}

			document.addEventListener("click", handleClickOutside)
			return () => document.removeEventListener("click", handleClickOutside)
		}
	}, [isMobileMenuOpen])

	// Improved navigation click handler with better scrolling
	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault()
		
		// Close the mobile menu
		setIsMobileMenuOpen(false)
		
		// Small delay to ensure menu closing animation completes
		setTimeout(() => {
			const targetId = href.replace('#', '');
			const targetElement = document.getElementById(targetId);
			
			if (targetElement) {
				// Get the element's position
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.scrollY - 80; // Adjust offset as needed
				
				// Scroll to the target
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
				
				// Update URL hash without scrolling (optional)
				history.pushState(null, '', href);
			} else {
				console.error(`Element with ID "${targetId}" not found`);
			}
		}, 100);
	}

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<motion.a
						href="#home"
						onClick={(e) => handleNavClick(e, "#home")}
						whileHover={{ scale: 1.05 }}
						className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
					>
						Jaydeep Rathod
					</motion.a>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-8">
						{navItems.map((item, index) => (
							<motion.a
								key={item.name}
								href={item.href}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ scale: 1.1 }}
								className="text-foreground/80 hover:text-foreground transition-colors"
								onClick={(e) => handleNavClick(e, item.href)}
							>
								{item.name}
							</motion.a>
						))}
					</div>

					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						</Button>

						{/* Mobile Menu Button */}
						<Button
							id="mobile-menu-button"
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={(e) => {
								e.stopPropagation()
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}}
						>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation - Improved */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							id="mobile-menu"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="md:hidden overflow-hidden bg-background/95 dark:bg-background/95 backdrop-blur-md absolute right-0 top-16 w-full max-w-[250px] rounded-bl-lg shadow-lg border border-border/30 z-50"
						>
							<div className="p-4 flex flex-col space-y-3">
								{navItems.map((item) => (
									<motion.a
										key={item.name}
										href={item.href}
										whileHover={{ x: 5 }}
										className="block py-2 px-4 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
										onClick={(e) => handleNavClick(e, item.href)}
									>
										{item.name}
									</motion.a>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	)
}
