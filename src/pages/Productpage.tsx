import BikeCard, { TBikeDataProps } from "../components/Ui/BikeCard";
import { useGetAllProductsQuery } from "../redux/features/Bike/bikeApi";

const Productpage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bikes.</div>;
  }

  // Inspect the data to confirm unique properties
  console.log(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
      {products?.data?.map((product: TBikeDataProps) => (
        <BikeCard {...product} key={product._id} />
      ))}
    </div>
  );
};

export default Productpage;
