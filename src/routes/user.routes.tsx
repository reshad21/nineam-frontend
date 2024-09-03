import UserDashboard from "../pages/Dashboard/User/UserDashboard";

export const usersPaths = [
  {
    name: "Profile Management",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Bike",
    children: [
      {
        name: "Rent Bike",
        path: "rent-bike",
        element: "Rent Bike",
      },
    ],
  },
];
