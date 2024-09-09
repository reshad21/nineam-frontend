import { Select, Space, Spin } from "antd";
import { useGetAllProductsQuery } from "../../../redux/features/Bike/bikeApi"; // Assuming TBikeDataProps is your bike data type
import { TBikeDataProps } from "../BikeCard";

const AntSelect = ({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) => {
  const { data: bikes, isLoading, isError } = useGetAllProductsQuery(undefined);

  if (isLoading) return <Spin />;
  if (isError) return <div>Error loading options.</div>;

  // Safely handle undefined and ensure correct typing
  const uniqueBrands = Array.from(
    new Set(
      bikes?.data
        ?.filter((bike: TBikeDataProps) => bike.brand) // Filter to avoid undefined brands
        .map((bike: TBikeDataProps) => bike.brand)
    )
  );

  return (
    <Space wrap>
      <Select
        defaultValue="Yamaha"
        style={{ width: 120 }}
        onChange={handleChange}
        options={uniqueBrands.map((brand) => ({
          value: brand,
          label: brand,
        }))}
      />
    </Space>
  );
};

export default AntSelect;
