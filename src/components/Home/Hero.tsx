import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBanner from "../../assets/hero-image.png";
const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4"
    >
      <div className="">
        <div>
          <h6 className="my-2 font-semibold text-lg">Plan your trip now</h6>
          <h1 className="text-5xl font-semibold mb-6">
            Save <span className="text-primary">big</span> with our <br /> bike
            rental
          </h1>
          <p className="text-slate-400 mb-2">
            To contribute to positive change and achieve our sustainability{" "}
            <br />
            goals with many extraordinary
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/products">
            <Button className="bg-primary border-primary text-accent font-semibold py-5 px-10 text-base">
              Book Ride
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <img src={heroBanner} alt="" />
      </div>
    </motion.div>
  );
};

export default Hero;
