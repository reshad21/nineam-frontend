import { Button, Col, Flex } from "antd";
import BrForm from "../../../components/Form/BrForm";
import BrInput from "../../../components/Form/BrInput";
import { useAppSelector } from "../../../redux/hooks";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  if (!user) return <div>Loading...</div>;

  const defaultValues = {
    name: user?.name,
    address: user?.address,
    email: user?.email,
    phone: user?.phone,
  };

  const onSubmit = () => {
    console.log("updating user information");
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
