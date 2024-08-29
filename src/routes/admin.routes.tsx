import CreateAdmin from "../pages/Dashboard/Admin/CreateAdmin";
import CreateBikepage from "../pages/Dashboard/Admin/CreateBikePage";
import ViewAllBikePage from "../pages/Dashboard/Admin/ViewAllBikePage";

export const adminPaths = [
  // {
  //   name: "Dashboard",
  //   path: "dashboard",
  //   element: <AdminDashboard />,
  // },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Bikes",
        path: "create-bikes",
        element: <CreateBikepage />,
      },
      {
        name: "View Bikes",
        path: "view-bikes",
        element: <ViewAllBikePage />,
      },
    ],
  },
  {
    name: "Bike Rent",
    children: [
      {
        name: "Returned",
        path: "returned-bike",
        element: "returned",
      },
    ],
  },
];
