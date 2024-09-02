import CreateBikepage from "../pages/Dashboard/Admin/ProductManagement/CreateBikePage";
import UpdateBike from "../pages/Dashboard/Admin/ProductManagement/UpdateBike";
import ViewAllBikePage from "../pages/Dashboard/Admin/ProductManagement/ViewAllBikePage";
import AllUsers from "../pages/Dashboard/Admin/UserManagement/AllUsers";
import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";

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
        // name: "Bike Detail",
        path: "update-bike/:bikeId",
        element: <UpdateBike />,
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
      {
        name: "All Users",
        path: "all-users",
        element: <AllUsers />,
      },
    ],
  },
];
