import { useState } from "react";
import AntSelect from "../components/Ui/antdesign/AntSelect";
import BikeCard, { TBikeDataProps } from "../components/Ui/BikeCard";
import { useGetAllProductsQuery } from "../redux/features/Bike/bikeApi";
import { TQueryParam } from "../types/global";

const Productpage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: bikes,
    isLoading,
    isError,
  } = useGetAllProductsQuery([...params]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bikes.</div>;

  const handleChange = (value: string) => {
    console.log(`Selected ${value}`);

    // Update the params state with the selected brand
    const updatedParams: TQueryParam[] = [{ name: "brand", value: value }];
    setParams(updatedParams);
  };

  return (
    <>
      <div className="my-5">
        <AntSelect handleChange={handleChange} /> {/* Pass handleChange here */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {bikes?.data.map((product: TBikeDataProps) => (
          <BikeCard {...product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Productpage;
