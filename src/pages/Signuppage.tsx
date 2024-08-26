import { Button, Col, Row, Typography } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";
import BrTextArea from "../components/Form/BrTextArea";

const { Title } = Typography;

const SignUpPage = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log("signup data =>", data);
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
      <Col xs={24} sm={18} md={14} lg={12} xl={10}>
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
            Sign Up
          </Title>
          <BrForm onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <BrInput type="text" name="name" label="Name:" />
              </Col>
              <Col span={12}>
                <BrInput type="email" name="email" label="Email:" />
              </Col>
              <Col span={12}>
                <BrInput type="password" name="password" label="Password:" />
              </Col>
              <Col span={12}>
                <BrInput type="phone" name="phone" label="Phone:" />
              </Col>
              <Col span={24}>
                <BrTextArea name="address" label="Address:" rows={4} />
              </Col>
            </Row>
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
              Sign Up
            </Button>
          </BrForm>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPage;
