import { Alert, Button, Spin } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../../components/Form/BrForm";
import BrInput from "../../components/Form/BrInput";
import {
  useGetSingleUserQuery,
  useUpdateUserProfileMutation,
} from "../../redux/features/User/userApi";
import { useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types/global";
import { TUser } from "../../types/register.type";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);
  const [updateProfile] = useUpdateUserProfileMutation();
  const navigate = useNavigate();

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
        message="No profile data available"
        type="warning"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  const defaultValues = {
    name: profile.data.name,
    phone: profile.data.phone,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = (await updateProfile({
        id: user?.id,
        data,
      })) as TResponse<TUser>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("User updated successfully", { id: toastId });
        navigate(`/${profile.data?.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Update Profile
        </h2>

        <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BrInput name="name" type="text" label="Name" />
          <BrInput name="phone" type="text" label="Phone" />

          <div className="text-center mt-6">
            <Button
              htmlType="submit"
              type="primary"
              className="w-full"
              style={{
                background: "linear-gradient(90deg, #ff4c30, #ff6a48)",
                borderColor: "#ff4c30",
                color: "#fff",
              }}
            >
              Update Profile
            </Button>
          </div>
        </BrForm>
      </div>
    </div>
  );
};

export default UpdateProfile;
