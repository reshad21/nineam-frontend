import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../../../components/Form/BrForm";
import BrInput from "../../../components/Form/BrInput";
import {} from "../../../redux/features/auth/authApi";
import {
  useGetSingleUserQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/features/User/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { TResponse } from "../../../types/global";
import { TUser } from "../../../types/register.type";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);
  const [updateProfile] = useUpdateUserProfileMutation();

  const navigate = useNavigate();

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile data.</div>;
  if (!profile.data) return <div>No profile data available.</div>;

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
    <Flex justify="center" align="center">
      <Col span={6}>
        <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BrInput name="name" type="text" label="Name" />
          <BrInput name="phone" type="text" label="Phone" />
          <Button htmlType="submit">Update</Button>
        </BrForm>
      </Col>
    </Flex>
  );
};

export default UpdateProfile;
