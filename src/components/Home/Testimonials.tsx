import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";

const testimonials = [
  {
    quote:
      "This bike rental service is fantastic! The process was quick, and the bikes were in excellent condition.",
    name: "Jeny Doe",
    location: "New York, USA",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/74/57/93/1000_F_274579352_oE2C5Cm33sZZDiJboskZ7VBxAXAZvjBa.jpg", // Replace with actual image URLs
  },
  {
    quote:
      "I had an amazing experience renting a bike here. The customer service was top-notch.",
    name: "Jane Smith",
    location: "London, UK",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sWA_inXv7XmGrPAWtuh604oFSRR-_pbghSn44TvJ2HT00Gs48__vJl96fesQgUbijr8&usqp=CAU", // Replace with actual image URLs
  },
  {
    quote:
      "Affordable prices and great quality bikes. Highly recommend this service!",
    name: "Carlos Rivera",
    location: "Madrid, Spain",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mqu0wuJJrUubxlf2lb3RRsN0ukisfekCwA&s", // Replace with actual image URLs
  },
];

const Testimonials = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <section
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "text-gray-900"
      } mb-8`}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Testimonial Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />

              {/* Testimonial Quote */}
              <p className="text-lg italic mb-4 text-center">
                "{testimonial.quote}"
              </p>

              {/* Testimonial Name */}
              <h5
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {testimonial.name}
              </h5>

              {/* Testimonial Location */}
              <p className="text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
