import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaProjectDiagram, FaDatabase, FaMobileAlt, FaFileDownload } from "react-icons/fa";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";
import { apiRequest } from "@/lib/queryClient";

const ResumeSection = () => {
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

  const handleDownloadResume = async () => {
    try {
      const response = await apiRequest("GET", "/api/download-resume", undefined);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TinotendaMugabe_Resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const experiences = [
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

  const resumeHighlights = [
    {
      icon: <FaGraduationCap className="mt-1 mr-3 text-primary" />,
      text: "Computer Science student at Harare Institute of Technology",
    },
    {
      icon: <FaCode className="mt-1 mr-3 text-primary" />,
      text: "Proficient in Python, Java, Kotlin, and web technologies",
    },
    {
      icon: <FaProjectDiagram className="mt-1 mr-3 text-primary" />,
      text: "Experience with AI/ML frameworks and natural language processing",
    },
    {
      icon: <FaDatabase className="mt-1 mr-3 text-primary" />,
      text: "Knowledge of SQL and NoSQL databases",
    },
    {
      icon: <FaMobileAlt className="mt-1 mr-3 text-primary" />,
      text: "Mobile development experience with Android Studio",
    },
  ];

  return (
    <section id="resume" className="py-20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={itemVariants}>
            My Resume
          </motion.h2>
          <motion.div className="section-divider" variants={itemVariants} />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.div
            className="md:w-1/2 lg:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-primary">Experience</h3>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`mb-8 relative pl-6 border-l-2 ${
                    exp.active ? "border-primary" : "border-gray-300 dark:border-gray-600"
                  } ${index === experiences.length - 1 ? "mb-0" : ""}`}
                >
                  <div
                    className={`absolute -left-1.5 top-0 w-4 h-4 rounded-full ${
                      exp.active
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.organization} | {exp.period}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 lg:w-2/5 mt-10 md:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient p-1 rounded-xl shadow-lg">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-center mb-6">
                  <svg
                    className="w-12 h-12 mx-auto text-primary mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Download My Resume
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Get a complete copy of my resume in PDF format
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <motion.button
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadResume}
                  >
                    <FaFileDownload className="mr-2" /> Download Resume
                  </motion.button>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Resume Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {resumeHighlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        {highlight.icon}
                        <span>{highlight.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
