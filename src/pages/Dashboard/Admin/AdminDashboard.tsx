import { Button } from "antd";
import { Link } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../redux/features/User/userApi";
import { useAppSelector } from "../../../redux/hooks";

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile data.</div>;
  if (!profile.data) return <div>No profile data available.</div>;
  console.log("user all info from db==>", profile.data);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome, {profile.data?.name}!
      </h2>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Name:</label>
            <p className="text-gray-800">{profile.data?.name}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Email:</label>
            <p className="text-gray-800">{profile.data?.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Phone:</label>
            <p className="text-gray-800">{profile.data?.phone}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Address:</label>
            <p className="text-gray-800">{profile.data?.address}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Role:</label>
            <p className="text-gray-800 capitalize">{profile.data?.role}</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Link to={`/${profile.data?.role}/update-profile`}>
            <Button className="">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
