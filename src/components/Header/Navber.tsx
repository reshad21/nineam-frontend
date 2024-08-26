import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  // State to manage the mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b-2 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo on the left */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link to="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-700 hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-500 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Login/Registration */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 border border-slate-900 rounded-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden absolute w-full top-16 left-0 bg-gray-200 py-4 px-6 shadow-lg z-50`}
        >
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block px-4 py-2 border border-slate-900 rounded-md hover:bg-primary hover:text-white hover:border-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
