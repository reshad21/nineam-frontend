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
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
