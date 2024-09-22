import { Alert, Spin } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import AntSelect from "../components/Ui/antdesign/AntSelect";
import BikeCard, { TBikeDataProps } from "../components/Ui/BikeCard";
import { useGetAllProductsQuery } from "../redux/features/Bike/bikeApi";
import { useAppSelector } from "../redux/hooks"; // Import your theme selector hook
const Productpage = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const theme = useAppSelector((state) => state.theme.mode); // Get current theme

  const {
    data: bikes,
    isLoading,
    isError,
  } = useGetAllProductsQuery(undefined, { pollingInterval: 2000 });

  if (isLoading)
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Spin />
      </div>
    );
  if (isError)
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        Error loading bikes.
      </div>
    );

  if (!bikes?.data)
    return (
      <Alert
        message="No Bike data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  const handleFilterChange = (value: string, type: "brand" | "name" | "cc") => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [type]: value };

      Object.keys(newFilters).forEach((key) => {
        if (key !== type) delete newFilters[key];
      });

      return newFilters;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearAll = () => {
    setFilters({});
    setSearchTerm("");
  };

  const filteredBikes = bikes?.data
    .filter((bike: TBikeDataProps) => {
      return Object.keys(filters).every((key) => {
        const typedKey = key as keyof TBikeDataProps;
        return bike[typedKey] === filters[key];
      });
    })
    .filter((bike: TBikeDataProps) =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      } p-5`}
    >
      <div className="my-5 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`px-4 py-1 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800 text-gray-100"
              : "border-slate-300 bg-white text-gray-900"
          }`}
        />

        <AntSelect handleFilterChange={handleFilterChange} />

        <button
          onClick={handleClearAll}
          className={`ml-4 px-4 py-1 rounded-md transition duration-300 ${
            theme === "dark"
              ? "bg-slate-600 text-slate-100 hover:bg-emerald-200"
              : "bg-emerald-100 text-slate-600 hover:bg-emerald-200"
          }`}
        >
          Clear All
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5"
      >
        {filteredBikes?.map((product: TBikeDataProps) => (
          <BikeCard {...product} key={product._id} />
        ))}
      </motion.div>
    </div>
  );
};

export default Productpage;
