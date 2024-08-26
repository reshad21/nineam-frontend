import { Button, Col, Row, Typography } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";

const { Title } = Typography;

const LoginPage = () => {
  const defaultValues = {
    email: "A-0001@gmail.com",
    password: "admin123",
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log("logindata =>", data);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #ff4c30 0%, #ff9472 100%)",
        padding: "20px",
      }}
    >
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Login
          </Title>
          <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <BrInput type="email" name="email" label="Email:" />
            <BrInput type="password" name="password" label="Password:" />
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#ff4c30",
                borderColor: "#ff4c30",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </BrForm>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
