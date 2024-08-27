import { Button, Col, Row, Typography } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [login, { isError }] = useLoginMutation();

  console.log("error=>", isError);

  const defaultValues = {
    email: "john@example.com",
    password: "password123",
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
