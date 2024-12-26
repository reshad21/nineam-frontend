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
import registerImage from "./../assets/logo.png";

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
    <Row className="min-h-screen items-center">
      {/* Left Side - Image */}
      <Col xs={0} md={12} className="hidden md:block">
        <div className="bg-gradient-to-r from-green-400 to-blue-500">
          <img
            src={registerImage}
            alt="Bike"
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>
      </Col>

      {/* Right Side - Signup Form */}
      <Col xs={24} md={12} className="flex justify-center items-center">
        <div
          className={`w-full max-w-lg p-4 rounded-2xl shadow-2xl ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: theme === "dark" ? "white" : "secondary",
            }}
          >
            Create Your Account
          </Title>
          <BrForm
            onSubmit={onSubmit}
            resolver={zodResolver(registrationSchema)}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <BrInput type="text" name="name" label="Full Name:" />
              </Col>
              <Col xs={24} md={12}>
                <BrInput type="email" name="email" label="Email Address:" />
              </Col>
              <Col xs={24} md={12}>
                <BrInput type="password" name="password" label="Password:" />
              </Col>
              <Col xs={24} md={12}>
                <BrInput type="phone" name="phone" label="Phone Number:" />
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
                transition: "all 0.3s ease-in-out",
              }}
              className="hover:bg-red-600"
            >
              Sign Up
            </Button>
          </BrForm>
          <div className="text-center mt-4">
            <p
              className={`${
                theme === "dark" ? "text-white" : "text-gray-800"
              } text-sm`}
            >
              Already have an account?{" "}
              <Button
                type="link"
                onClick={() => navigate("/login")}
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Log in here
              </Button>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPage;
