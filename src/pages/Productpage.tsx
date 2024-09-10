import { useState } from "react";
import AntSelect from "../components/Ui/antdesign/AntSelect";
import BikeCard, { TBikeDataProps } from "../components/Ui/BikeCard";
import { useGetAllProductsQuery } from "../redux/features/Bike/bikeApi";

const Productpage = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const { data: bikes, isLoading, isError } = useGetAllProductsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bikes.</div>;

  // Handle filter change
  const handleFilterChange = (value: string, type: "brand" | "name" | "cc") => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [type]: value };

      // Clear other filters when a new filter is applied
      Object.keys(newFilters).forEach((key) => {
        if (key !== type) delete newFilters[key];
      });

      return newFilters;
    });
  };

  // Filter bikes based on selected filters
  const filteredBikes = bikes?.data.filter((bike: TBikeDataProps) => {
    return Object.keys(filters).every((key) => bike[key] === filters[key]);
  });

  return (
    <>
      <div className="my-5">
        <AntSelect handleFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {filteredBikes?.map((product: TBikeDataProps) => (
          <BikeCard {...product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Productpage;
