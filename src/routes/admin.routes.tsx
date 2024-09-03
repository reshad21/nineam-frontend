import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import CreateBikepage from "../pages/Dashboard/Admin/ProductManagement/CreateBikePage";
import UpdateBike from "../pages/Dashboard/Admin/ProductManagement/UpdateBike";
import ViewAllBikePage from "../pages/Dashboard/Admin/ProductManagement/ViewAllBikePage";
import UpdateProfile from "../pages/Dashboard/Admin/UpdateProfile";
import AllUsers from "../pages/Dashboard/Admin/UserManagement/AllUsers";
import CreateAdmin from "../pages/Dashboard/Admin/UserManagement/CreateAdmin";

export const adminPaths = [
  {
    name: "Profile Management",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Update Profile",
    path: "update-profile",
    element: <UpdateProfile />,
  },
  {
    name: "Bike Management",
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
        // name: "Update Bike", //need to update this
        path: "update-bike/:bikeId",
        element: <UpdateBike />,
      },
    ],
  },

  {
    name: "Users Management",
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
