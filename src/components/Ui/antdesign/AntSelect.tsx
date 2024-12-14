import { Select, Space, Spin } from "antd";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../../redux/features/Bike/bikeApi";
import { useAppSelector } from "../../../redux/hooks";
import { TBikeDataProps } from "../BikeCard";

const AntSelect = ({
  handleFilterChange,
}: {
  handleFilterChange: (value: string, type: "brand" | "name" | "cc") => void;
}) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const { data: bikes, isLoading, isError } = useGetAllProductsQuery(undefined);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );
  const [selectedName, setSelectedName] = useState<string | undefined>(
    undefined
  );
  const [selectedCC, setSelectedCC] = useState<string | undefined>(undefined);

  if (isLoading) return <Spin />;
  if (isError) return <div>Error loading options.</div>;

  const getUniqueOptions = (key: keyof TBikeDataProps) => {
    return Array.from(
      new Set(
        bikes?.data
          ?.filter((bike: TBikeDataProps) => bike[key])
          .map((bike: TBikeDataProps) => bike[key])
      )
    ) as string[];
  };

  const uniqueBrands = getUniqueOptions("brand");
  const uniqueNames = getUniqueOptions("name");
  const uniqueCCs = getUniqueOptions("cc");

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    handleFilterChange(value, "brand");
  };

  const handleNameChange = (value: string) => {
    setSelectedName(value);
    handleFilterChange(value, "name");
  };

  const handleCCChange = (value: string) => {
    setSelectedCC(value);
    handleFilterChange(value, "cc");
  };

  return (
    <Space wrap>
      <span
        className={`${
          theme === "dark" ? "text-accent text-lg" : "text-primary text-lg"
        }`}
      >
        Bike Brand:
      </span>
      <Select
        value={selectedBrand}
        style={{ width: 150 }}
        onChange={handleBrandChange}
        options={uniqueBrands.map((brand) => ({
          value: brand,
          label: brand,
        }))}
        placeholder="Select Brand"
      />
      <span
        className={`${
          theme === "dark" ? "text-accent text-lg" : "text-primary text-lg"
        }`}
      >
        Bike Model:
      </span>
      <Select
        value={selectedName}
        style={{ width: 150 }}
        onChange={handleNameChange}
        options={uniqueNames.map((name) => ({
          value: name,
          label: name,
        }))}
        placeholder="Select Name"
      />
      <span
        className={`${
          theme === "dark" ? "text-accent text-lg" : "text-primary text-lg"
        }`}
      >
        CC:
      </span>
      <Select
        value={selectedCC}
        style={{ width: 150 }}
        onChange={handleCCChange}
        options={uniqueCCs.map((cc) => ({
          value: cc,
          label: cc,
        }))}
        placeholder="Select CC"
      />
    </Space>
  );
};

export default AntSelect;
