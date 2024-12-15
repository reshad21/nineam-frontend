import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/hooks";
const Accordion = () => {
  const theme = useAppSelector((state) => state.theme.mode); // Assuming you're using redux to manage the theme

  // Dynamically set the daisyUI theme class based on the selected theme
  const themeClass = theme === "dark" ? "dark" : "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div data-theme={themeClass} className="mb-8">
        <div className="mb-5">
          <h2
            className={`${
              theme === "dark" ? "text-slate-300" : "text-primary"
            } text-3xl font-bold text-center`}
          >
            Why Choose Us
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }text-md font-bold text-center`}
          >
            We try to give our best
          </p>
        </div>
        <div className="">
          <div
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Wide Selection of Bikes
            </div>
            <div className="collapse-content">
              <p>
                We offer a wide range of bikes suitable for different needs and
                preferences. Whether you're looking for a high-performance
                sports bike or a comfortable city cruiser, we have options for
                every type of rider. All our bikes are well-maintained and
                regularly serviced to ensure a smooth and safe ride.
              </p>
            </div>
          </div>

          <div
            tabIndex={1}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Affordable Rates
            </div>
            <div className="collapse-content">
              <p>
                Our rental prices are highly competitive, offering affordable
                hourly and daily rates. We believe that everyone should have the
                opportunity to enjoy riding a bike without breaking the bank.
                With flexible rental packages, you can choose the one that best
                fits your schedule and budget.
              </p>
            </div>
          </div>

          <div
            tabIndex={2}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Convenient Booking Process
            </div>
            <div className="collapse-content">
              <p>
                Booking a bike with us is simple and hassle-free. You can easily
                reserve a bike online through our user-friendly platform. Select
                the bike, choose the rental period, and confirm your booking in
                just a few clicks. We also offer instant confirmations, so you
                know your bike is ready when you are.
              </p>
            </div>
          </div>

          <div
            tabIndex={3}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Excellent Customer Service
            </div>
            <div className="collapse-content">
              <p>
                Our dedicated support team is here to assist you every step of
                the way. From helping you choose the right bike to providing
                roadside assistance, we prioritize your satisfaction. We’re
                always available to answer any questions or concerns, ensuring a
                pleasant and enjoyable rental experience.
              </p>
            </div>
          </div>

          <div
            tabIndex={4}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Flexible Return Policy
            </div>
            <div className="collapse-content">
              <p>
                We understand that plans can change, which is why we offer a
                flexible return policy. Whether you need to extend your rental
                period or return the bike earlier than planned, we provide
                convenient options to adjust your booking without hassle. Your
                convenience is our priority.
              </p>
            </div>
          </div>

          <div
            tabIndex={5}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Safety and Maintenance
            </div>
            <div className="collapse-content">
              <p>
                We take safety seriously. Each of our bikes undergoes thorough
                maintenance checks before being rented out. Our fleet is
                regularly inspected and serviced to meet safety standards,
                ensuring a reliable and secure ride for our customers. Your
                safety is our top concern.
              </p>
            </div>
          </div>

          <div
            tabIndex={6}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Eco-Friendly Transportation
            </div>
            <div className="collapse-content">
              <p>
                Renting a bike is not only convenient but also environmentally
                friendly. By choosing to rent from us, you're helping reduce
                your carbon footprint. Biking is a sustainable mode of transport
                that promotes clean air and a healthier environment, and we're
                proud to support green initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Accordion;
