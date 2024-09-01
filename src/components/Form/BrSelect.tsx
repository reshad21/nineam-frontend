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
      render={({ field }) => (
        <Form.Item label={label}>
          <Select {...field} style={{ width: "100%" }} options={options} />
        </Form.Item>
      )}
    />
  );
};

export default BrSelect;
