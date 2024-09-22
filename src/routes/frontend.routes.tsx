import Aboutpage from "../pages/Aboutpage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactUsPage from "../pages/Contactpage";
import ViewBike from "../pages/Dashboard/Admin/ProductManagement/ViewBike";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/Loginpage";
import PrivacyPolicy from "../pages/PrivacyPolicy ";
import Productpage from "../pages/Productpage";
import SignUpPage from "../pages/Signuppage";
import TermsOfService from "../pages/TermsOfService";

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
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/termsof-service",
    element: <TermsOfService />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  // {
  //   path: "/products",
  //   element: (
  //     <ProtectedRoute>
  //       <Productpage />
  //     </ProtectedRoute>
  //   ),
  // },
];
