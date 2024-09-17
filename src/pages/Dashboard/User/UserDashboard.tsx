import { Alert, Spin } from "antd";
import ProfileCard from "../../../components/Ui/ProfileCard";
import { useGetSingleUserQuery } from "../../../redux/features/User/userApi";
import { useAppSelector } from "../../../redux/hooks";

const UserDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);

  // Handle loading and error states
  if (isLoading) return <Spin tip="Loading profile data..." />;
  if (error)
    return <Alert message="Error loading profile data" type="error" showIcon />;
  if (!profile?.data)
    return (
      <Alert message="No profile data available" type="warning" showIcon />
    );

  return (
    <ProfileCard
      userData={profile.data}
      editLink={`/${profile.data.role}/update-profile`}
    />
  );
};

export default UserDashboard;
