import { Button } from "antd";
import { Link } from "react-router-dom";
import heroBanner from "../../assets/hero-image.png";

const Hero = () => {
  return (
    <div className="relative h-[500px] md:h-[500px] flex items-center rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-primary/90 to-primary/60">
      {/* Background Image */}
      <div
        className="absolute top-0 right-10 w-2/5 h-full bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${heroBanner})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full md:w-3/5 text-left px-6 md:px-12">
        <h6 className="my-2 font-semibold text-lg text-gray-200">
          Plan your trip now
        </h6>
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-slate-300">
          Save <span className="text-accent">big</span> with our <br /> bike
          rental
        </h1>
        <p className="text-slate-300 mb-6">
          To contribute to positive change and achieve our sustainability <br />
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
    </div>
  );
};

export default Hero;
