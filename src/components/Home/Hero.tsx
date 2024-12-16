import { Button } from "antd";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay"; // Import additional styles
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import sliderOne from "../../assets/hero-image.png";
import sliderThree from "../../assets/kawasaki_ninja.png";
import sliderTwo from "../../assets/motorcycle-6700442_1280-removebg-preview.png";
import sliderFour from "../../assets/sliderThree-removebg-preview.png";

const Hero = () => {
  return (
    <>
      <div className="relative h-[500px] md:h-[500px] flex items-center rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-gray-900/90 to-gray-900/60">
        {/* Overlay Content */}
        <div className="absolute z-20 w-full md:w-3/5 text-left px-6 md:px-12 top-0 left-0 h-full flex flex-col justify-center">
          <h6 className="my-2 font-semibold text-lg text-gray-200">
            Plan your trip now
          </h6>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-slate-50">
            Save <span className="text-accent">big</span> with our <br /> bike
            rental
          </h1>
          <p className="text-slate-300 mb-6">
            To contribute to positive change and achieve our sustainability{" "}
            <br />
            goals with many extraordinary
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Link to="/products">
              <Button className="bg-primary border-primary text-accent font-semibold py-3 px-6 text-base">
                Book Ride
              </Button>
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full h-full flex justify-end items-center px-5">
          <Swiper
            slidesPerView={1}
            loop={true} // Enables infinite looping
            autoplay={{
              delay: 3000, // 3 seconds delay
              disableOnInteraction: false, // Keeps autoplay active even after interactions
            }}
            modules={[Autoplay]}
            className="absolute top-0 left-0 w-full h-full z-10"
          >
            <SwiperSlide>
              <img
                src={sliderOne}
                alt="Hero Banner"
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderTwo}
                alt="Hero Banner"
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderThree}
                alt="Hero Banner"
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderFour}
                alt="Hero Banner"
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Hero;
