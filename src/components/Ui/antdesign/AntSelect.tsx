import { Select, Space } from "antd";

const AntSelect = ({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) => {
  return (
    <Space wrap>
      <Select
        defaultValue="Yamaha" // Updated default value to match the options
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "Yamaha", label: "Yamaha" },
          { value: "Harley-Davidson", label: "Harley-Davidson" },
          { value: "Kawasaki", label: "Kawasaki" },
          { value: "BMW", label: "BMW" },
        ]}
      />
    </Space>
  );
};

export default AntSelect;
