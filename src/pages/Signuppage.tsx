import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";
import BrTextArea from "../components/Form/BrTextArea";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { registrationSchema } from "../schemas/registrationSchema";
import registerImage from "./../assets/logo.png";

const { Title } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const theme = useAppSelector((state) => state.theme.mode);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating account...");
    try {
      const role = "user";
      const registerData = { ...data, role };
      const res = await registration(registerData);
      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Account created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left Side - Image */}
      <div className="flex-1 flex justify-center items-center">
        <img src={registerImage} alt="Bike" className="w-3/4 h-auto" />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full p-10">
          <Title
            level={2}
            className="text-center mb-6"
            style={{
              color: theme === "dark" ? "white" : "black",
            }}
          >
            Create Your Account
          </Title>

          <BrForm
            onSubmit={onSubmit}
            resolver={zodResolver(registrationSchema)}
          >
            <div className="mb-1">
              <BrInput type="text" name="name" label="Full Name:" />
            </div>
            <div className="mb-1">
              <BrInput type="email" name="email" label="Email Address:" />
            </div>
            <div className="mb-1">
              <BrInput type="password" name="password" label="Password:" />
            </div>
            <div className="mb-1">
              <BrInput type="phone" name="phone" label="Phone Number:" />
            </div>
            <div className="mb-1">
              <BrTextArea name="address" label="Address:" rows={4} />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2 font-bold bg-secondary text-white"
            >
              Sign Up
            </Button>
          </BrForm>

          <div className="text-center mt-2">
            <p className="text-sm">
              Already have an account?{" "}
              <Button
                type="link"
                onClick={() => navigate("/login")}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Log in here
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
