import { motion } from "framer-motion";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";

const AboutSection = () => {
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

  return (
    <section
      id="about"
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
            About Me
          </motion.h2>
          <motion.div className="section-divider" variants={itemVariants} />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">My Background</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              I am a highly motivated Computer Science student at the Harare Institute of
              Technology (HIT), passionate about software development, artificial
              intelligence, and full-stack development.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              With a strong foundation in Python, Java, Kotlin, TensorFlow, and database
              systems, along with hands-on experience in frontend (React, Vite) and
              backend (Node.js, Flask) development, I enjoy solving complex problems
              through innovative technology solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Currently, I'm focused on expanding my knowledge in artificial intelligence
              and machine learning, with particular interest in natural language
              processing and its real-world applications.
            </p>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-primary">Education</h3>

              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">Harare Institute of Technology</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2023 - Present
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Bachelor's Degree in Computer Science
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Harare, Zimbabwe
                </p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">Mutendi Secondary School</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2021 - 2022
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-1">Advanced Level</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pure Mathematics, Geography, Computer Science
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">Mutendi Secondary School</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2017 - 2020
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-1">Ordinary Level</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  9 'O' level passes including Maths, English and Combined Science
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
