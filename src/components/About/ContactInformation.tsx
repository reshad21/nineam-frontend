import { useAppSelector } from "../../redux/hooks";

const ContactInformation = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2
          className={`text-4xl font-bold mb-8 ${
            theme === "dark" ? "text-primary-light" : "text-primary"
          }`}
        >
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office Address */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Office Address</h3>
            <p>123 Street Name</p>
            <p>City, State 12345</p>
          </div>

          {/* Phone Number */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Phone Number</h3>
            <p>+1 (123) 456-7890</p>
          </div>

          {/* Email Address */}
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Email</h3>
            <p>contact@yourcompany.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
