import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";

const Loginpage = () => {
  const defaultValues = {
    email: "A-0001@gmail.com",
    password: "admin123",
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log("logindata =>", data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BrInput type="email" name="email" label="Email:" />
          <BrInput type="password" name="password" label="Password:" />
          <Button htmlType="submit">Login</Button>
        </BrForm>
      </Col>
    </Flex>
  );
};

export default Loginpage;
