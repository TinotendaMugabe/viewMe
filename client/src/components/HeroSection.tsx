import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";

const roles = [
  "Software Developer | AI Enthusiast",
  "Full-Stack Developer | Student",
  "Mobile App Developer | Learner",
];

const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [key, setKey] = useState(0); // For re-triggering animation
  const { ref, inView } = useAnimateOnScroll();

  useEffect(() => {
    // Rotate through roles
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      setKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm Tinotenda Mugabe
          </h1>
          <div className="typing-container">
            <div key={key} className="typing-text text-xl md:text-2xl" style={{ width: `${roles[currentRoleIndex].length}ch` }}>
              {roles[currentRoleIndex]}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 mb-8 max-w-lg mx-auto md:mx-0">
            Computer Science student at Harare Institute of Technology, passionate about
            software development, AI, and creating intuitive solutions to complex problems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-3 border-2 border-primary text-primary dark:text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
          <div className="flex items-center justify-center md:justify-start mt-8 space-x-6">
            <motion.a
              href="https://linkedin.com/in/tinotenda-mugabe-8b5bb6292"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-2xl transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-2xl transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="mailto:mcdonalmugs@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-2xl transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mb-8 md:mb-0 flex justify-center items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src="/images/profile.jpg"
              alt="Tinotenda Mugabe"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent2/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
