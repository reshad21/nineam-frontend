import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/Layout/DashboardLayout";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import Aboutpage from "../pages/Aboutpage";
import ContactUsPage from "../pages/Contactpage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Productpage from "../pages/Productpage";
import Signuppage from "../pages/Signuppage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <Aboutpage />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Productpage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/signup",
        element: <Signuppage />,
      },
      {
        path: "/login",
        element: <Loginpage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home", // Change to 'home' under '/dashboard'
        element: <Homepage />,
      },
      {
        path: "about", // Change to 'about' under '/dashboard'
        element: <Aboutpage />,
      },
      {
        path: "products", // Change to 'products' under '/dashboard'
        element: (
          <ProtectedRoute>
            <Productpage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact", // Change to 'contact' under '/dashboard'
        element: <ContactUsPage />,
      },
      {
        path: "signup", // Change to 'signup' under '/dashboard'
        element: <Signuppage />,
      },
      {
        path: "login", // Change to 'login' under '/dashboard'
        element: <Loginpage />,
      },
    ],
  },
]);

export default router;
