Project Overview
Create a visually stunning, responsive portfolio website using the MERN stack with advanced animations to showcase Jaydeep Rathod's technical skills, projects, and achievements. The implementation will be divided into backend (Express.js/MongoDB) and frontend (React/Vite) components.

Backend Implementation (Express.js + MongoDB)
1. API Endpoints:

javascript
// Contact Form Submission
POST /api/contact → Saves message to DB + sends email via Nodemailer

// Data Retrieval Endpoints
GET /api/skills → Returns technical/non-technical skills
GET /api/projects → Returns project details with tech stacks
GET /api/experience → Returns internship experience
GET /api/achievements → Returns certifications/hackathons
2. Mongoose Models:

javascript
// Project Model
const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  previewVideo: String // For project animations
});

// Skill Model
const skillSchema = new Schema({
  name: String,
  category: String, // programming/framework/tool
  proficiency: Number // 0-100%
});

// Contact Model
const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
3. Nodemailer Configuration:

javascript
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
});
4. Security Features:

Rate limiting with express-rate-limit

CORS configuration

Input validation with Joi

Environment variables for credentials

Frontend Implementation (React + Vite)
1. Core Components:

bash
src/
├── components/
│   ├── AnimatedNavbar.jsx
│   ├── TypewriterHero.jsx
│   ├── RadialSkillBar.jsx
│   ├── ProjectCard3D.jsx
│   ├── AchievementCounter.jsx
│   └── LiquidContactForm.jsx
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Achievements.jsx
│   └── Contact.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   └── useTypewriter.js
2. Animation Implementation:

Hero Section:

jsx
// Typewriter effect with animated cursor
const Hero = () => {
  const text = useTypewriter([
    "Full-Stack Developer", 
    "AI Enthusiast", 
    "Problem Solver"
  ], 100, 1500);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Jaydeep Rathod</h1>
      <h2>{text}<span className="blinking-cursor">|</span></h2>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Download Resume
      </motion.button>
    </motion.div>
  );
}
3D Project Cards:

jsx
const ProjectCard3D = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front: Video preview */}
        <div onClick={() => setIsFlipped(true)}>
          <video autoPlay loop muted src={project.previewVideo} />
        </div>
        
        {/* Back: Project details */}
        <div onClick={() => setIsFlipped(false)}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div>
            {project.technologies.map(tech => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
Radial Skill Bars:

jsx
const RadialSkillBar = ({ name, percentage, icon }) => (
  <motion.div whileHover={{ scale: 1.1 }}>
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        pathColor: `rgba(59, 130, 246, ${percentage / 100})`,
        textColor: 'currentColor'
      })}
    />
    <div>{icon}</div>
    <p>{name}</p>
  </motion.div>
);
3. Theme Context for Dark/Light Mode:

jsx
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggle: () => setDarkMode(!darkMode) }}>
      {children}
    </ThemeContext.Provider>
  );
};
4. Animation Technologies:

Framer Motion: Primary animations (entry/exit, hover states)

React-Intersection-Observer: Scroll-triggered animations

Three.js: 3D floating elements in hero section

Particle.js: Achievement section effects

react-countup: Animated counters for stats

Data Structure (Jaydeep-Specific)
Projects Data:

javascript
const projects = [
  {
    title: "Swasthiy",
    description: "Health platform with Gemini AI integration",
    technologies: ["React", "Node", "MongoDB", "Gemini AI", "Flutter"],
    githubUrl: "https://github.com/jayu6624/Swasthiy",
    liveUrl: "#",
    previewVideo: "/videos/swasthiy-preview.mp4"
  },
  {
    title: "Our_Sathi",
    description: "Transportation platform with OpenService API",
    technologies: ["MERN Stack", "OpenService API"],
    githubUrl: "https://github.com/jayu6624/Our_Sathi",
    liveUrl: "#",
    previewVideo: "/videos/sathi-preview.mp4"
  }
];
Skills Data:

javascript
const skills = [
  { name: "JavaScript", category: "programming", proficiency: 90 },
  { name: "React", category: "framework", proficiency: 85 },
  { name: "Node.js", category: "framework", proficiency: 80 },
  { name: "MongoDB", category: "tool", proficiency: 75 },
  { name: "Problem Solving", category: "non-technical", proficiency: 95 }
];
Deployment Configuration
1. Environment Setup:

bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
2. Production Build:

json
{
  "scripts": {
    "build:client": "cd client && npm run build",
    "start:server": "cd server && npm start",
    "deploy": "npm run build:client && npm run start:server"
  }
}
3. Deployment Platforms:

Frontend: Vercel

Backend: Heroku

Database: MongoDB Atlas

Documentation Requirements
README.md Includes:

Project setup instructions

Environment variables configuration:

env
MONGO_URI=your_mongodb_uri
EMAIL=your_email@gmail.com
CLIENT_ID=your_oauth_client_id
Animation customization guide

Deployment steps for Vercel/Heroku

Data seeding instructions

Animation Performance Optimization
Techniques:

Lazy loading for heavy animations

Reduced motion preferences

css
@media (prefers-reduced-motion) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
3D Optimization:

javascript
import dynamic from 'next/dynamic';
const ThreeScene = dynamic(() => import('./ThreeScene'), { 
  ssr: false,
  loading: () => <Placeholder />
});
Complete Implementation Plan
Phase 1: Backend Setup (1 day)

Create Express API endpoints

Configure MongoDB models

Implement Nodemailer with OAuth2

Set up rate limiting/validation

Phase 2: Frontend Core (2 days)

Create Vite project with theme context

Implement all section components

Set up React Router navigation

Create reusable animated components

Phase 3: Advanced Animations (2 days)

Implement 3D project cards

Create radial skill bars

Add achievement counters

Build contact form liquid animation

Phase 4: Optimization/Deployment (1 day)

Performance testing

Responsive design tweaks

SEO optimization

Deployment to Vercel/Heroku