import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Aboutpage from "../pages/Aboutpage";
import Homepage from "../pages/Homepage";

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
        path: "/aboutus",
        element: <Aboutpage />,
      },
    ],
  },
]);

export default router;
