import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TBRSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const BrSelect = ({ label, name, options }: TBRSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select {...field} style={{ width: "100%" }} options={options} />
          {error && <small>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default BrSelect;
