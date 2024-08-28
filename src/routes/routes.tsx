import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
]);

export default router;
