import CouponsDiscounts from "../components/Home/CouponsDiscounts";
import Hero from "../components/Home/Hero";
import PopularBikes from "../components/Home/PopularBikes";
import Subscribe from "../components/Home/Subscribe";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Accordion from "../components/Ui/Accordion";

const Homepage = () => {
  return (
    <>
      <Hero />
      <PopularBikes />
      <Subscribe />
      <Testimonials />
      <WhyChooseUs />
      <Accordion />
      <CouponsDiscounts />
    </>
  );
};

export default Homepage;
