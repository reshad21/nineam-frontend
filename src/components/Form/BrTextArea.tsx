import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  label?: string;
  rows?: number; // Optional prop for the number of rows in the textarea
};

const BrTextArea = ({ name, label, rows = 4 }: TTextAreaProps) => {
  return (
    <div className="w-full mb-2">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input.TextArea {...field} id={name} rows={rows} />
            {error && <small>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BrTextArea;
