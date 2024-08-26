import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Aboutpage from "../pages/Aboutpage";
import ContactUsPage from "../pages/Contactpage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
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
