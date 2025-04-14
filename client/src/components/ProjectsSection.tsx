import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  featured?: boolean;
  delay: number;
  inView: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  github,
  featured,
  delay,
  inView,
}: ProjectCardProps) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl ${
        featured ? 'shadow-xl border-2 border-primary/40' : 'shadow-lg border border-gray-200 dark:border-gray-700'
      } overflow-hidden project-card transition-all duration-300 hover:shadow-xl`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="h-56 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {featured && (
          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg font-semibold text-sm shadow-md">
            ★ Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => {
            // Different colors for different tags
            const colors = [
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
              "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
              "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
              "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
            ];

            return (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  colors[index % colors.length]
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <a
            href="#"
            className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-medium"
          >
            View Details
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useAnimateOnScroll();
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Fetch projects from the API
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    refetchOnWindowFocus: false,
  });

  // Log for debugging
  console.log("Projects data:", projects);

  // Fallback data in case we don't have any projects in the database yet
  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: "NLP-Powered Resume Ranking System",
      description:
        "Developed a resume ranking system using NLP techniques to match resumes with job descriptions.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Python", "Flask", "NLP", "React"],
      github: "https://github.com",
      featured: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Mobile Shopping App",
      description:
        "E-commerce mobile application built with Kotlin featuring product search, cart management, and payment integration.",
      image:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Kotlin", "Android", "Firebase", "REST API"],
      github: "https://github.com",
      featured: false,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Smart Home Dashboard",
      description:
        "Web application for monitoring and controlling smart home devices with real-time data visualization.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "Node.js", "MongoDB", "WebSockets"],
      github: "https://github.com",
      featured: false,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "AI Chatbot Assistant",
      description:
        "Intelligent chatbot built using TensorFlow and NLP to provide automated customer support.",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Python", "TensorFlow", "Flask", "HTML/CSS/JS"],
      github: "https://github.com",
      featured: false,
      displayOrder: 4,
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={itemVariants}>
            My Projects
          </motion.h2>
          <motion.div className="section-divider" variants={itemVariants} />
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                github={project.github}
                featured={project.featured}
                delay={0.2 * index}
                inView={inView}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fallbackProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                github={project.github}
                featured={project.featured}
                delay={0.2 * index}
                inView={inView}
              />
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaGithub className="mr-2" /> View More Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
