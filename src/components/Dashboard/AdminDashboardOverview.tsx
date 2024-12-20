/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Spin } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/Bike/bikeApi";
import { useGetAllBookingQuery } from "../../redux/features/Rent/rentApi";
import {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} from "../../redux/features/User/userApi";
import { useAppSelector } from "../../redux/hooks";
import RevenueTrends from "./RevenueTrends";

const AdminDashboardOverview = () => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: profile,
    error,
    isLoading: singleuserLoading,
  } = useGetSingleUserQuery(user?.id);
  const { data: users, isLoading: userLoading } =
    useGetAllUsersQuery(undefined);
  const { data: bikes, isLoading: bikesLoading } =
    useGetAllProductsQuery(undefined);
  const { data: bookings, isLoading: bookingsLoading } =
    useGetAllBookingQuery(undefined);

  //   const { data: bookings } = useGetAllBookingQuery(undefined, {
  //     pollingInterval: 2000,
  //   });

  const totalRevenue = bookings?.data.reduce(
    (sum: number, item: any) => sum + item.totalCost,
    0
  );

  // Combine loading states
  const isLoading =
    bikesLoading || bookingsLoading || userLoading || singleuserLoading;

  // Generate activities
  const activities = [
    ...(bookings?.data || []).map((booking: any) => ({
      message: `User ${booking?.userId?.name} booked a bike (ID: ${booking?.bikeId?._id})`,
      date: new Date(booking.createdAt),
    })),
    ...(bikes?.data || []).map((bike: any) => ({
      message: `Bike ${bike.brand} ${bike.model} added to inventory`,
      date: new Date(bike.createdAt),
    })),
  ]
    .sort((a, b) => b.date - a.date) // Sort by date, newest first
    .slice(0, 10); // Limit to 10 activities

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading Admin Overview..." />
      </div>
    );
  if (error)
    return (
      <Alert
        message="Error loading profile data"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );
  if (!profile?.data)
    return (
      <Alert
        message="No Bike data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  console.log(`Total Cost: ${totalRevenue}`);
  console.log("Booking info==>", bookings?.data);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Admin! Here’s an overview of the latest activity.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Users",
            value: users?.data?.length || 0,
            color: "bg-blue-500",
          },
          {
            title: "Total Bikes",
            value: bikes?.data?.length || 0,
            color: "bg-green-500",
          },
          {
            title: "Total Bookings",
            value: bookings?.data.length || 0,
            color: "bg-yellow-500",
          },
          { title: "Revenue", value: `$${totalRevenue}`, color: "bg-red-500" },
        ].map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md text-white ${card.color}`}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Revenue Trends</h3>
          <div className="h-fit bg-gray-100">
            <RevenueTrends bookings={bookings} />
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Booking Statistics</h3>
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">[Insert Chart Here]</p>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <div className="bg-white rounded-lg shadow-md p-4 divide-y divide-gray-200">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 hover:bg-gray-100 transition duration-200"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                    {activity.message.includes("booked") ? (
                      <i className="fas fa-bicycle"></i> // Bike Icon
                    ) : (
                      <i className="fas fa-plus"></i> // Add Icon
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <p className="text-gray-700">{activity.message}</p>
                  <p className="text-sm text-gray-500">
                    {activity.date.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No recent activities found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Manage Quick Links */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Manage Users",
              link: "/admin/all-users",
              color: "bg-blue-500",
            },
            {
              label: "Manage Bikes",
              link: "/admin/view-bikes",
              color: "bg-green-500",
            },
            {
              label: "Manage Bookings",
              link: "/admin/returned-bike",
              color: "bg-yellow-500",
            },
          ].map((quickLink, index) => (
            <a
              key={index}
              href={quickLink.link}
              className={`p-4 text-center text-white rounded-lg shadow-md ${quickLink.color}`}
            >
              {quickLink.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardOverview;
