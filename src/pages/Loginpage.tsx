import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../components/Form/BrForm";
import BrInput from "../components/Form/BrInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const theme = useAppSelector((state) => state.theme.mode); // Get the current theme

  const defaultValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        { id: toastId }
      );
    }
  };

  const navigateToRegister = () => {
    navigate("/signup"); // Redirect to the registration page
  };

  return (
    <Row justify="center" align="middle" className="min-h-screen">
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <div
          className={`p-8 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <p
            className={`text-center mb-8 text-2xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Login
          </p>
          <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <BrInput type="email" name="email" label="Email:" />
            <BrInput type="password" name="password" label="Password:" />
            <Button
              type="primary"
              htmlType="submit"
              block
              className={`${
                theme === "dark"
                  ? "bg-red-600 border-red-600"
                  : "bg-red-500 border-red-500"
              } mt-4 font-bold`}
            >
              Login
            </Button>
          </BrForm>
          <div className="text-center mt-4">
            <p
              className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              Don't have an account?{" "}
              <Button
                type="link"
                onClick={navigateToRegister}
                className="font-bold"
              >
                Register here
              </Button>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
