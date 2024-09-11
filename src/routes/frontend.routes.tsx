import Aboutpage from "../pages/Aboutpage";
import ContactUsPage from "../pages/Contactpage";
import ViewBike from "../pages/Dashboard/Admin/ProductManagement/ViewBike";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/Loginpage";
import Productpage from "../pages/Productpage";
import SignUpPage from "../pages/Signuppage";

export const frontendPaths = [
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
    element: <Productpage />,
  },
  // {
  //   path: "/products",
  //   element: (
  //     <ProtectedRoute>
  //       <Productpage />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/singleBike/:bikeId",
    element: <ViewBike />,
  },
  {
    path: "/contact",
    element: <ContactUsPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
