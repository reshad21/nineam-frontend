import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";

type TLoginuser = {
  email: string;
  password: string;
};

const Loginpage = () => {
  // Pass TLoginuser as the generic type parameter to useForm
  const { register, handleSubmit } = useForm<TLoginuser>();

  // Type the submit handler with SubmitHandler<TLoginuser>
  const submit: SubmitHandler<TLoginuser> = (data) => {
    console.log("logindata =>", data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-full mb-2">
        <label htmlFor="email">Email:</label>
        <input type="text" {...register("email")} />
      </div>
      <div className="w-full mb-2">
        <label htmlFor="password">Password:</label>
        <input type="text" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Loginpage;
