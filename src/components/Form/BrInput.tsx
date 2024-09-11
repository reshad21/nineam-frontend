import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

const BrInput = ({ type, name, label, disabled, readOnly }: TInputProps) => {
  return (
    <div className="w-full mb-2">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              id={name}
              type={type}
              disabled={disabled}
              readOnly={readOnly}
            />
            {error && <small>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BrInput;
