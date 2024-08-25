import { Button } from "antd";
import heroBanner from "../../assets/hero-image.png";
import SearchInput from "../Ui/SearchInput";
const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4">
      <div className="">
        <div>
          <h6 className="my-2 font-semibold text-lg">Plan your trip now</h6>
          <h1 className="text-5xl font-semibold mb-6">
            Save <span className="text-primary">big</span> with our <br /> car
            rental
          </h1>
          <p className="text-slate-400 mb-2">
            To contribute to positive change and achieve our sustainability{" "}
            <br />
            goals with many extraordinary
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button className="bg-primary text-white font-semibold py-5 px-10 text-base">
            Book Ride
          </Button>
          <SearchInput />
        </div>
      </div>
      <div className="">
        <img src={heroBanner} alt="" />
      </div>
    </div>
  );
};

export default Hero;
