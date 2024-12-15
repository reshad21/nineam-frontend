import "swiper/css";
import "swiper/css/autoplay"; // Import additional styles
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import reviewBackground from "../../assets/reviewtow.png";
import { useAppSelector } from "../../redux/hooks";

const testimonials = [
  {
    quote:
      "This bike rental service is fantastic! The process was quick, and the bikes were in excellent condition.",
    name: "Jeny Doe",
    location: "New York, USA",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/74/57/93/1000_F_274579352_oE2C5Cm33sZZDiJboskZ7VBxAXAZvjBa.jpg",
  },
  {
    quote:
      "I had an amazing experience renting a bike here. The customer service was top-notch.",
    name: "Jane Smith",
    location: "London, UK",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sWA_inXv7XmGrPAWtuh604oFSRR-_pbghSn44TvJ2HT00Gs48__vJl96fesQgUbijr8&usqp=CAU",
  },
  {
    quote:
      "Affordable prices and great quality bikes. Highly recommend this service!",
    name: "Carlos Rivera",
    location: "Madrid, Spain",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mqu0wuJJrUubxlf2lb3RRsN0ukisfekCwA&s",
  },
  {
    quote:
      "I had an amazing experience renting a bike here. The customer service was top-notch.",
    name: "Jane Smith",
    location: "London, UK",
    image:
      "https://t3.ftcdn.net/jpg/07/34/98/02/360_F_734980224_p0E7JHAvcEu9o61zinIgxx1W99YvefpE.jpg",
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
        <div className="mb-5">
          <h2
            className={`${
              theme === "dark" ? "text-slate-300" : "text-primary"
            } text-3xl font-bold text-center`}
          >
            What Our Customers Say
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }text-md font-bold text-center`}
          >
            Customers satisfaction is our main goal
          </p>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // Enables infinite looping
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Keeps autoplay active even after interactions
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white p-6 rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${reviewBackground})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-transparent rounded-lg"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Testimonial Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-white"
                  />

                  {/* Testimonial Quote */}
                  <p className="text-lg italic mb-4 text-center">
                    "{testimonial.quote}"
                  </p>

                  {/* Testimonial Name */}
                  <h5 className="font-semibold text-lg">{testimonial.name}</h5>

                  {/* Testimonial Location */}
                  <p className="text-gray-300 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
