import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
const benefits = [
  {
    title: "Best Prices",
    description:
      "We offer the most competitive prices in the market, ensuring you get the best value for your money.",
    icon: "💸", // You can use an emoji or an icon from a library like FontAwesome.
  },
  {
    title: "Wide Selection",
    description:
      "Choose from a wide range of bikes to suit your needs, from city bikes to mountain bikes.",
    icon: "🚴‍♂️",
  },
  {
    title: "Excellent Customer Service",
    description:
      "Our friendly and professional staff are here to assist you with all your rental needs.",
    icon: "👍",
  },
];

const WhyChooseUs = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Why Rent With Us
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
