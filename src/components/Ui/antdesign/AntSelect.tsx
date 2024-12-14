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

  if (isLoading) return <div>Loading...</div>;
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

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedBrand(value);
    handleFilterChange(value, "brand");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedName(value);
    handleFilterChange(value, "name");
  };

  const handleCCChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCC(value);
    handleFilterChange(value, "cc");
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          className={`${theme === "dark" ? "text-accent" : "text-primary"}`}
        >
          Bike Brand
        </label>
        <select
          value={selectedBrand || ""}
          onChange={handleBrandChange}
          className="block w-full border border-primary rounded-md p-2 mt-1 text-secondary"
        >
          <option value="" disabled>
            Select Brand
          </option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className={`${theme === "dark" ? "text-accent" : "text-primary"}`}
        >
          Bike Model
        </label>
        <select
          value={selectedName || ""}
          onChange={handleNameChange}
          className="block w-full border border-primary rounded-md p-2 mt-1 text-secondary"
        >
          <option value="" disabled>
            Select Model
          </option>
          {uniqueNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className={`${theme === "dark" ? "text-accent" : "text-primary"}`}
        >
          CC
        </label>
        <select
          value={selectedCC || ""}
          onChange={handleCCChange}
          className="block w-full border border-primary rounded-md p-2 mt-1 text-secondary"
        >
          <option value="" disabled>
            Select CC
          </option>
          {uniqueCCs.map((cc) => (
            <option key={cc} value={cc}>
              {cc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AntSelect;
