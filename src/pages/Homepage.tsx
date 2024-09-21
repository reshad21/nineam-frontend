import CouponsDiscounts from "../components/Home/CouponsDiscounts";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials ";
import WhyChooseUs from "../components/Home/WhyChooseUs ";
import Accordion from "../components/Ui/Accordion";
import ContactUsPage from "./Contactpage";
import Productpage from "./Productpage";

const Homepage = () => {
  return (
    <>
      <Hero />
      <Productpage />
      <Testimonials />
      <WhyChooseUs />
      <Accordion />
      <CouponsDiscounts />
      <ContactUsPage />
    </>
  );
};

export default Homepage;
