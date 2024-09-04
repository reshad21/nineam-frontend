import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log("existing user information =>", user);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome, {user?.name}!
      </h2>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Name:</label>
            <p className="text-gray-800">{user?.name}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Email:</label>
            <p className="text-gray-800">{user?.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Phone:</label>
            <p className="text-gray-800">{user?.phone}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Address:</label>
            <p className="text-gray-800">{user?.address}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Role:</label>
            <p className="text-gray-800 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Link to={`/${user?.role}/update-profile`}>
            <Button className="">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
