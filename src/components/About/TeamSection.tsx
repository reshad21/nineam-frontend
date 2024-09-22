import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
const TeamSection = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  const teamMembers = [
    {
      name: "John Doe",
      position: "Founder & CEO",
      bio: "John is the visionary behind [Your Company], with a passion for sustainability and biking.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
    {
      name: "Jane Smith",
      position: "Chief Marketing Officer",
      bio: "Jane leads our marketing efforts with over 10 years of experience in the industry.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
    {
      name: "Mike Johnson",
      position: "Head of Operations",
      bio: "Mike ensures everything runs smoothly, from bike rentals to customer service.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
  ];

  return (
    <section
      className={`py-16 px-6 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-4xl font-bold mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Meet Our Team
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              } p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-primary"
                }`}
              >
                {member.position}
              </p>
              <p
                className={`mt-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
