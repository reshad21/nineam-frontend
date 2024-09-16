import { Collapse, CollapseProps } from "antd";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Wide Selection of Bikes
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        We offer a wide range of bikes suitable for different needs and
        preferences. Whether you're looking for a high-performance sports bike
        or a comfortable city cruiser, we have options for every type of rider.
        All our bikes are well-maintained and regularly serviced to ensure a
        smooth and safe ride.
      </p>
    ),
  },
  {
    key: "2",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Affordable Rates
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        Our rental prices are highly competitive, offering affordable hourly and
        daily rates. We believe that everyone should have the opportunity to
        enjoy riding a bike without breaking the bank. With flexible rental
        packages, you can choose the one that best fits your schedule and
        budget.
      </p>
    ),
  },
  {
    key: "3",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Convenient Booking Process
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        Booking a bike with us is simple and hassle-free. You can easily reserve
        a bike online through our user-friendly platform. Select the bike,
        choose the rental period, and confirm your booking in just a few clicks.
        We also offer instant confirmations, so you know your bike is ready when
        you are.
      </p>
    ),
  },
  {
    key: "4",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Excellent Customer Service
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        Our dedicated support team is here to assist you every step of the way.
        From helping you choose the right bike to providing roadside assistance,
        we prioritize your satisfaction. We’re always available to answer any
        questions or concerns, ensuring a pleasant and enjoyable rental
        experience.
      </p>
    ),
  },
  {
    key: "5",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Flexible Return Policy
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        We understand that plans can change, which is why we offer a flexible
        return policy. Whether you need to extend your rental period or return
        the bike earlier than planned, we provide convenient options to adjust
        your booking without hassle. Your convenience is our priority.
      </p>
    ),
  },
  {
    key: "6",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Safety and Maintenance
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        We take safety seriously. Each of our bikes undergoes thorough
        maintenance checks before being rented out. Our fleet is regularly
        inspected and serviced to meet safety standards, ensuring a reliable and
        secure ride for our customers. Your safety is our top concern.
      </p>
    ),
  },
  {
    key: "7",
    label: (
      <span className="text-gray-800 font-semibold text-[16px]">
        Eco-Friendly Transportation
      </span>
    ),
    children: (
      <p className="text-gray-600 text-[16px]">
        Renting a bike is not only convenient but also environmentally friendly.
        By choosing to rent from us, you're helping reduce your carbon
        footprint. Biking is a sustainable mode of transport that promotes clean
        air and a healthier environment, and we're proud to support green
        initiatives.
      </p>
    ),
  },
];

const Accordion = () => {
  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
      <div className="max-w-6xl mx-auto px-4">
        <Collapse accordion items={items} />
      </div>
    </div>
  );
};

export default Accordion;
