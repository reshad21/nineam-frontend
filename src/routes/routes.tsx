import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/Layout/DashboardLayout";
import NotFoundPage from "../components/Ui/NotFoundPage";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { frontendPaths } from "./frontend.routes";
import { usersPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: frontendPaths,
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <DashboardLayout />,
    children: routeGenerator(usersPaths),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
