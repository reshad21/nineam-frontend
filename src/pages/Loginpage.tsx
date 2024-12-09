import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

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
        {
          id: toastId,
        }
      );
    }
  };

  const navigateToRegister = () => {
    navigate("/signup"); // Redirect to the registration page
  };

  const handlePresetLogin = (role: "admin" | "user") => {
    const adminCredentials = {
      email: "admin123@gmail.com",
      password: "123456",
    };
    const userCredentials = {
      email: "reshad@gmail.com",
      password: "123456",
    };

    const credentials = role === "admin" ? adminCredentials : userCredentials;
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
    >
      <Col xs={24} sm={20} md={16} lg={14} xl={10}>
        <div
          className={`p-10 rounded-2xl shadow-2xl ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <p
            className={`text-center mb-6 text-3xl font-semibold tracking-wide ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Welcome Back
          </p>

          <div className="flex justify-center mb-4">
            <Button
              onClick={() => handlePresetLogin("admin")}
              className="mr-4 bg-purple-900 text-white"
              type="default"
              size="large"
            >
              Admin Login
            </Button>
            <Button
              onClick={() => handlePresetLogin("user")}
              type="default"
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
                  : "bg-red-500 border-red-500"
              } mt-6 font-bold text-white hover:bg-red-600 transition-all duration-300`}
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <p
              className={`${
                theme === "dark" ? "text-white" : "text-gray-800"
              } text-sm`}
            >
              Don't have an account?{" "}
              <Button
                type="link"
                onClick={navigateToRegister}
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
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
