// Project data
export const projects = [
  {
    id: 1,
    title: "NLP-Powered Resume Ranking System",
    description: "Developed a resume ranking system using NLP techniques to match resumes with job descriptions.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Python", "Flask", "NLP", "React"],
    github: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "Mobile Shopping App",
    description: "E-commerce mobile application built with Kotlin featuring product search, cart management, and payment integration.",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Kotlin", "Android", "Firebase", "REST API"],
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Smart Home Dashboard",
    description: "Web application for monitoring and controlling smart home devices with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    github: "https://github.com",
  },
  {
    id: 4,
    title: "AI Chatbot Assistant",
    description: "Intelligent chatbot built using TensorFlow and NLP to provide automated customer support.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    tags: ["Python", "TensorFlow", "Flask", "HTML/CSS/JS"],
    github: "https://github.com",
  },
];

// Skills data
export const skills = [
  { name: "Python", percentage: 90, color: "bg-primary" },
  { name: "Java/Kotlin", percentage: 85, color: "bg-accent1" },
  { name: "React/Web Development", percentage: 80, color: "bg-secondary" },
  { name: "TensorFlow/Machine Learning", percentage: 75, color: "bg-accent2" },
  { name: "Database Management", percentage: 85, color: "bg-blue-500" },
];

// Experiences data
export const experiences = [
  {
    title: "Year 2 Group Project",
    organization: "Harare Institute of Technology",
    period: "August 2024 - Present",
    bullets: [
      "Developed a NLP-powered resume ranking system using Named Entity Recognition (NER) and tokenization.",
      "Built the backend with Python (Flask) and integrated NLP models for text processing.",
      "Collaborated in a team of 5, ensuring seamless API communication between frontend (React/Vite) and backend.",
      "Implemented database solutions for storing and retrieving resume/job data efficiently.",
    ],
    active: true,
  },
];

// Education data
export const education = [
  {
    institution: "Harare Institute of Technology",
    degree: "Bachelor's Degree in Computer Science",
    period: "2023 - Present",
    location: "Harare, Zimbabwe",
  },
  {
    institution: "Mutendi Secondary School",
    degree: "Advanced Level",
    period: "2021 - 2022",
    location: "Pure Mathematics, Geography, Computer Science",
  },
  {
    institution: "Mutendi Secondary School",
    degree: "Ordinary Level",
    period: "2017 - 2020",
    location: "9 'O' level passes including Maths, English and Combined Science",
  },
];

// Resume highlights
export const resumeHighlights = [
  "Computer Science student at Harare Institute of Technology",
  "Proficient in Python, Java, Kotlin, and web technologies",
  "Experience with AI/ML frameworks and natural language processing",
  "Knowledge of SQL and NoSQL databases",
  "Mobile development experience with Android Studio",
];

// Contact information
export const contactInfo = {
  email: "mcdonalmugs@gmail.com",
  phone: "+263 771 456 378",
  location: "Harare, Zimbabwe",
  linkedin: "linkedin.com/in/tinotenda-mugabe-8b5bb6292",
};
