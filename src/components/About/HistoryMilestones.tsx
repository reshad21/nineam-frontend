import { useAppSelector } from "../../redux/hooks";

const HistoryMilestones = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  const milestones = [
    {
      year: "2015",
      title: "Founded",
      description:
        "Our journey began with a mission to provide sustainable bike rentals.",
    },
    {
      year: "2017",
      title: "First 1,000 Rentals",
      description:
        "We celebrated our first major milestone with 1,000 successful rentals.",
    },
    {
      year: "2019",
      title: "Expansion",
      description:
        "We expanded our operations to new cities, reaching more customers.",
    },
    {
      year: "2021",
      title: "Awarded Best Bike Rental Service",
      description:
        "Our dedication to quality earned us the best bike rental service award.",
    },
    {
      year: "2023",
      title: "New Innovations",
      description:
        "Launched a new fleet of electric bikes to support eco-friendly transportation.",
    },
  ];

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6">
        <h2
          className={`text-4xl font-bold text-center mb-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Our History & Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`md:w-1/2 text-center md:text-left mb-6 md:mb-0 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-primary-dark" : "text-primary"
                  }`}
                >
                  {milestone.year}
                </h3>
                <h4
                  className={`text-2xl font-semibold mb-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {milestone.title}
                </h4>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-400" : ""
                  }`}
                >
                  {milestone.description}
                </p>
              </div>
              <div
                className={`md:w-1/2 flex justify-center ${
                  theme === "dark" ? "text-primary-dark" : "text-white"
                }`}
              >
                <div
                  className={`w-32 h-32 flex items-center justify-center rounded-full text-2xl font-bold ${
                    theme === "dark" ? "bg-primary-dark" : "bg-primary"
                  }`}
                >
                  {milestone.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryMilestones;
