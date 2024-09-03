import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";

export const usersPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Bike",
    children: [
      {
        name: "Rent Bike",
        path: "rent-bike",
        element: <CreateAdmin />,
      },
    ],
  },
];
