import { Button, Input } from "antd";
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
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left Side - Image */}
      <div className="flex-1 flex justify-center items-center">
        <img src={loginImage} alt="Bike" className="w-3/4 h-auto" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full p-10">
          <p className="text-center mb-6 text-3xl font-semibold">
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
              <label htmlFor="email" className="block text-sm font-medium">
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
              <label htmlFor="password" className="block text-sm font-medium">
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
              className="mt-6 font-bold text-white"
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm">
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
      </div>
    </div>
  );
};

export default LoginPage;
