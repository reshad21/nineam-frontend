import ViewBike from "../pages/Dashboard/Admin/ProductManagement/ViewBike";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import BikeListing from "../pages/Dashboard/User/BikeManagement/BikeListing";
import BookingPage from "../pages/Dashboard/User/RentalManagement/BookingPage";
import MyRentList from "../pages/Dashboard/User/RentalManagement/MyRentList";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";

export const usersPaths = [
  {
    name: "Profile Management",
    path: "dashboard",
    element: <UserDashboard />,
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
        name: "Bike Listing",
        path: "bike-listing",
        element: <BikeListing />,
      },
      // {
      //   name: "Bike Detail",
      //   path: "bike-detail",
      //   element: "Bike Detail",
      // },
      {
        // name: "Update Bike", //need to update this
        path: "view-bike/:bikeId",
        element: <ViewBike />,
      },
    ],
  },
  {
    name: "Rental Management",
    children: [
      {
        name: "Booking",
        path: "bike-booking",
        element: <BookingPage />,
      },
      {
        name: "My Rentals",
        path: "my-rentals",
        element: <MyRentList />,
      },
    ],
  },
];
