import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import amerpay from "../../assets/amerpay.png";
import mastercard from "../../assets/mastercard.png";
import paypalImage from "../../assets/paypal.png";
import visaImage from "../../assets/visa.png";
import { useAppSelector } from "../../redux/hooks"; // Import useAppSelector to get the theme
import Container from "./Container";

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.mode); // Get the theme from Redux

  return (
    <footer
      className={`p-8 mt-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold mb-2">Our Company</h2>
            <p className="leading-relaxed">8200 Kuakata, Barisal, Bangladesh</p>
            <p>
              Email:{" "}
              <a
                href="mailto:contact@yourcompany.com"
                className="hover:underline"
              >
                contact@bikerental.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:01787170612" className="hover:underline">
                (+880)1787170612
              </a>
            </p>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-bold">Payment Methods</h2>
            <div className="flex space-x-2 items-center">
              <img
                src={amerpay}
                alt="Amerpay"
                className="w-10 h-auto object-contain"
              />
              <img
                src={visaImage}
                alt="Visa"
                className="w-16 h-auto object-contain"
              />
              <img
                src={mastercard}
                alt="MasterCard"
                className="w-16 h-auto object-contain"
              />
              <img
                src={paypalImage}
                alt="PayPal"
                className="w-16 h-auto object-contain"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-slate-900"
            }`}
          >
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/privacy-policy"
                  className="transition duration-200 font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/tourist-places"
                  className="transition duration-200 font-semibold"
                >
                  Tourism places
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition duration-200 font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-6 text-center border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">
              &copy; {new Date().getFullYear()} All rights reserved.{" "}
              <Link to="/" className="text-secondary hover:underline">
                www.quickride.com
              </Link>
            </p>
            <div>
              <Link
                to="/termsof-service"
                className={`transition duration-200 font-semibold ${
                  theme === "dark" ? "text-white" : "text-secondary"
                }`}
              >
                Terms And Conditions
              </Link>
            </div>
            <div>
              <div className="flex space-x-2">
                <Link
                  to="https://www.facebook.com/reshad.rashed.7"
                  className="text-secondary transition duration-200"
                >
                  <FaFacebook size={20} />
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-blue-600 transition duration-200"
                >
                  <FaTwitter size={20} />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-orange-500 transition duration-200"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/web-developer-rashed-uzzaman-reshad/"
                  className="text-primary transition duration-200"
                >
                  <FaLinkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
