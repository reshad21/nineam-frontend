import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";

const Loginpage = () => {
  const defaultValues = {
    email: "A-0001@gmail.com",
    password: "admin123",
  };
  const onSubmit = (data: FieldValues) => {
    console.log("logindata =>", data);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <label htmlFor="email">Email:</label>
        <BrInput type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <BrInput type="password" name="password" />
        <Button htmlType="submit">Login</Button>
      </BrForm>
    </Row>
  );
};

export default Loginpage;
