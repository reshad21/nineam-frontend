import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Container from "./Container";
const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-900 p-8 mt-10">
      <Container>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Company</h2>
            <p>123 Street Name, City, State 12345</p>
            <p>Email: contact@yourcompany.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-primary">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-primary">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-primary">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-primary">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-primary">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} bikebd. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
