import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const BrInput = ({ type, name }: TInputProps) => {
  return (
    <div className="w-full mb-2">
      <Controller
        name={name}
        render={({ field }) => <Input {...field} id={name} type={type} />}
      />
    </div>
  );
};

export default BrInput;
