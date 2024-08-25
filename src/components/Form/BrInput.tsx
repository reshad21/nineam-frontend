import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const BrInput = ({ type, name, label }: TInputProps) => {
  return (
    <div className="w-full mb-2">
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} id={name} type={type} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BrInput;
