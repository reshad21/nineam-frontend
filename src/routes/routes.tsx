import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import { frontendPaths } from "./frontend.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: frontendPaths,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: <DashboardLayout />,
    children: routeGenerator(customerPaths),
  },
]);

export default router;
