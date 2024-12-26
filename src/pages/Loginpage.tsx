import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import loginImage from "./../assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const theme = useAppSelector((state) => state.theme.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ email, password }).unwrap();
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
    navigate("/signup");
  };

  const handlePresetLogin = (role: "admin" | "user") => {
    const credentials = {
      admin: { email: "admin123@gmail.com", password: "123456" },
      user: { email: "reshad@gmail.com", password: "123456" },
    }[role];

    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <Row className="min-h-screen">
      {/* Left Side - Image */}
      <Col xs={0} md={12} className="hidden md:block">
        <div className="h-full flex justify-center items-center ">
          <img src={loginImage} alt="Bike" className="w-3/4 h-auto" />
        </div>
      </Col>

      {/* Right Side - Login Form */}
      <Col xs={24} md={12} className="flex justify-center items-center">
        <div
          className={`w-full max-w-md p-10 rounded-2xl shadow-2xl ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <p
            className={`text-center mb-6 text-3xl font-semibold ${
              theme === "dark" ? "text-white" : "text-primary"
            }`}
          >
            Welcome Back
          </p>

          <div className="flex justify-center mb-4">
            <Button
              onClick={() => handlePresetLogin("admin")}
              className="mr-4 bg-purple-900 text-white"
              size="large"
            >
              Admin Login
            </Button>
            <Button
              onClick={() => handlePresetLogin("user")}
              className="bg-purple-900 text-white"
              size="large"
            >
              User Login
            </Button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              className={`${
                theme === "dark"
                  ? "bg-indigo-600 border-indigo-600"
                  : "bg-secondary border-secondary"
              } mt-6 font-bold text-white hover:bg-red-600`}
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Don't have an account?{" "}
              <Button
                type="link"
                onClick={navigateToRegister}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
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
