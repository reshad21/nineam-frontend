import BikeDetails from "../pages/Dashboard/Admin/BikeDetails";
import CreateBikepage from "../pages/Dashboard/Admin/CreateBikePage";
import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";
import ViewAllBikePage from "../pages/Dashboard/Admin/ViewAllBikePage";

export const adminPaths = [
  // {
  //   name: "Dashboard",
  //   path: "dashboard",
  //   element: <AdminDashboard />,
  // },
  {
    name: "Product Management",
    children: [
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
      {
        name: "Bike Detail",
        path: "bike-details/:bikeId",
        element: <BikeDetails />,
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
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];
