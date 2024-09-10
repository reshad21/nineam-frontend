import { useState } from "react";
import AntSelect from "../components/Ui/antdesign/AntSelect";
import BikeCard, { TBikeDataProps } from "../components/Ui/BikeCard";
import { useGetAllProductsQuery } from "../redux/features/Bike/bikeApi";

const Productpage = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear all filters and search term
  const handleClearAll = () => {
    setFilters({});
    setSearchTerm("");
  };

  // Filter bikes based on selected filters and search term
  const filteredBikes = bikes?.data
    .filter((bike: TBikeDataProps) => {
      return Object.keys(filters).every((key) => {
        const typedKey = key as keyof TBikeDataProps; // Type assertion
        return bike[typedKey] === filters[key];
      });
    })
    .filter((bike: TBikeDataProps) =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <div className="my-5 flex flex-col md:flex-row justify-between items-center">
        {/* Add a search input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />
        {/* Pass both brand, name, and cc handlers */}
        <AntSelect handleFilterChange={handleFilterChange} />
        {/* Clear All button */}
        <button
          onClick={handleClearAll}
          className="ml-4 px-4 py-1 bg-gray-300 text-gray-800 rounded"
        >
          Clear All
        </button>
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
