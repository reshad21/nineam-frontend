import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import BrForm from "../../../components/Form/BrForm";
import BrInput from "../../../components/Form/BrInput";
import {} from "../../../redux/features/auth/authApi";
import { useUpdateUserProfileMutation } from "../../../redux/features/User/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { TResponse } from "../../../types/global";
import { TUser } from "../../../types/register.type";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  const [updateProfile] = useUpdateUserProfileMutation();

  if (!user) return <div>Loading...</div>;

  const defaultValues = {
    name: user?.name,
    address: user?.address,
    email: user?.email,
    phone: user?.phone,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = (await updateProfile({
        id: user.id,
        data,
      })) as TResponse<TUser>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        // console.log("dispatch data ==>", res);
        // const { data: usdata } = res;
        // console.log("dispatch data ==>", usdata?.data);
        // dispatch(setUser({ user: res.data, token }));
        toast.success("User updated successfully", { id: toastId });
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
          <BrInput name="email" type="text" label="Email" />
          <BrInput name="phone" type="text" label="Phone" />
          <BrInput name="address" type="text" label="Address" />
          <Button htmlType="submit">Update</Button>
        </BrForm>
      </Col>
    </Flex>
  );
};

export default UpdateProfile;
