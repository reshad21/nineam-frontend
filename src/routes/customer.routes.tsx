import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";

export const customerPaths = [
  //   {
  //     name: "Dashboard",
  //     path: "dashboard",
  //     element: <CustomerDashboard />,
  //   },
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
