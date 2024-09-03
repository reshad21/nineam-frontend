import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import { frontendPaths } from "./frontend.routes";
import { usersPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: frontendPaths,
  },
  // {
  //   path: "/dashboard",
  //   element: <DashboardLayout />,
  // },

  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customer/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(customerPaths),
  },
  {
    path: "/user/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(usersPaths),
  },
]);

export default router;
