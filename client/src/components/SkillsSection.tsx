import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaJava,
  FaDatabase,
  FaCodeBranch,
} from "react-icons/fa";
import { SiTensorflow, SiFlask, SiKotlin, SiFirebase } from "react-icons/si";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  delay: number;
  inView: boolean;
}

const SkillBar = ({ name, percentage, color, delay, inView }: SkillBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [inView, percentage, delay]);

  return (
    <div className="mb-6 overflow-hidden">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

interface TechCardProps {
  icon: JSX.Element;
  name: string;
  description: string;
  delay: number;
  inView: boolean;
}

const TechCard = ({ icon, name, description, delay, inView }: TechCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-300 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-14 h-14 mb-3 flex items-center justify-center text-3xl text-primary">
        {icon}
      </div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { ref, inView } = useAnimateOnScroll();

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

  const skills = [
    { name: "Python", percentage: 90, color: "bg-primary" },
    { name: "Java/Kotlin", percentage: 85, color: "bg-accent1" },
    { name: "React/Web Development", percentage: 80, color: "bg-secondary" },
    { name: "TensorFlow/Machine Learning", percentage: 75, color: "bg-accent2" },
    { name: "Database Management", percentage: 85, color: "bg-blue-500" },
  ];

  const techSkills = [
    {
      icon: <FaPython />,
      name: "Python",
      description: "Flask, TensorFlow, NLP",
    },
    {
      icon: <FaReact />,
      name: "React",
      description: "Frontend Development",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
      description: "Backend Development",
    },
    {
      icon: <SiKotlin />,
      name: "Java/Kotlin",
      description: "Mobile Development",
    },
    {
      icon: <FaDatabase />,
      name: "SQL/NoSQL",
      description: "Database Management",
    },
    {
      icon: <FaCodeBranch />,
      name: "Git",
      description: "Version Control",
    },
  ];

  const additionalSkills = [
    "Algorithms & Data Structures",
    "Mobile App Development",
    "Data Communication & Networking",
    "Software Engineering",
    "Project Management",
    "REST API Design",
  ];

  return (
    <section id="skills" className="py-20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={itemVariants}>
            My Skills
          </motion.h2>
          <motion.div className="section-divider" variants={itemVariants} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Technical Skills</h3>

            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
                delay={300 + index * 100}
                inView={inView}
              />
            ))}
          </motion.div>

          <div>
            <motion.h3
              className="text-2xl font-bold mb-6 text-primary"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Technologies
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techSkills.map((tech, index) => (
                <TechCard
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  description={tech.description}
                  delay={0.2 + index * 0.1}
                  inView={inView}
                />
              ))}
            </div>

            <motion.h3
              className="text-2xl font-bold mt-10 mb-6 text-primary"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Additional Skills
            </motion.h3>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {additionalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-secondary mr-2">✓</span> {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
