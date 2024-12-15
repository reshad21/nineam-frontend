import { Alert, Spin } from "antd";
import { motion } from "framer-motion";
import { useGetAllProductsQuery } from "../../redux/features/Bike/bikeApi";
import { useAppSelector } from "../../redux/hooks";
import { TBikeDataProps } from "../Ui/BikeCard";
import PopularBikeCard from "../Ui/PopularBikeCard";

const PopularBikes = () => {
  const theme = useAppSelector((state) => state.theme.mode); // Get current theme
  const { data: bikes, isLoading, isError } = useGetAllProductsQuery(undefined);
  console.log(bikes);

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

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } mb-8`}
    >
      <div className="mb-5">
        <h2
          className={`${
            theme === "dark" ? "text-slate-300" : "text-primary"
          } text-3xl font-bold text-center`}
        >
          Most Popular Bikes
        </h2>
        <p
          className={`${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }text-md font-bold text-center`}
        >
          Top chioces our customers
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-5"
      >
        {bikes.data.slice(0, 4).map((product: TBikeDataProps) => (
          <PopularBikeCard {...product} key={product._id} />
        ))}
      </motion.div>
    </div>
  );
};

export default PopularBikes;
