import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";
import BrTextArea from "../components/Form/BrTextArea";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { registrationSchema } from "../schemas/registrationSchema";
import { TResponse } from "../types/global";
import { TUser } from "../types/register.type";

const { Title } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const theme = useAppSelector((state) => state.theme.mode);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("User is creating...");
    try {
      const role = "user";
      const registerData = { ...data, role };
      const res = (await registration(registerData)) as TResponse<TUser>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("User created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} sm={18} md={14} lg={12} xl={10}>
        <div
          className={`p-8 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Sign Up
          </Title>
          <BrForm
            onSubmit={onSubmit}
            resolver={zodResolver(registrationSchema)}
          >
            {" "}
            {/* Zod resolver used here */}
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
