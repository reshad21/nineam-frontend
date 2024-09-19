import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/quickRide.png";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ThemeToggleButton from "../Theme/ThemeToggleButton";
import Container from "../Ui/Container";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Container>
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {/* Toggle Button for Mobile */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-grow justify-center">
            <ul className="flex space-x-8 text-lg">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme Toggle Button & Login/Signup (Desktop) */}
          <div className="hidden md:flex space-x-4 items-center">
            <ThemeToggleButton />

            {!user && (
              <>
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
              </>
            )}

            {user && (
              <>
                <Button className="px-4 py-5 bg-slate-100 text-slate-900 rounded-md hover:bg-primary hover:text-white transition-all duration-200">
                  <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:hidden absolute w-full top-16 left-0  py-4 px-6 shadow-lg z-50 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>

              {/* Theme Toggle Button & Login/Signup (responsive) */}
              <ThemeToggleButton />
              {!user && (
                <div className="flex items-center gap-3">
                  <li>
                    <Link
                      to="/signup"
                      className="block px-6 py-2 border border-slate-900 rounded-md hover:bg-primary hover:text-white hover:border-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                </div>
              )}

              {user && (
                <>
                  <Button
                    onClick={handleLogout}
                    className="px-4 py-5 bg-slate-100 text-slate-900 rounded-md hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Logout
                  </Button>
                  <Button className="px-4 py-5 bg-slate-100 text-slate-900 rounded-md hover:bg-primary hover:text-white transition-all duration-200">
                    <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
                  </Button>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
