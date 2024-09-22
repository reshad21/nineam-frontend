import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
const MissionStatement = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`py-16 px-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-4xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Our Mission
        </h2>
        <p
          className={`max-w-2xl mx-auto text-lg leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          At [Your Company], our mission is to promote sustainable
          transportation by making biking accessible to everyone. We provide a
          seamless and enjoyable bike rental experience, focusing on quality
          service, affordability, and environmental responsibility. Our core
          values include customer satisfaction, innovation, and a commitment to
          positively impacting both our community and the planet.
        </p>
      </div>
    </motion.div>
  );
};

export default MissionStatement;
