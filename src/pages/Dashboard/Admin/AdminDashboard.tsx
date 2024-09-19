import { Alert, Spin } from "antd";
import ProfileCard from "../../../components/Ui/ProfileCard";
import { useGetSingleUserQuery } from "../../../redux/features/User/userApi";
import { useAppSelector } from "../../../redux/hooks";

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading profile data..." />
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

  return (
    <ProfileCard
      userData={profile.data}
      editLink={`/${profile.data.role}/update-profile`}
    />
  );
};

export default AdminDashboard;
