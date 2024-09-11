import { useParams } from "react-router-dom";
import BikeCard from "../../../../components/Ui/BikeCard";
import { useGetProductByIdQuery } from "../../../../redux/features/Bike/bikeApi";

// Update the type definition to match the Bike data structure
export type TBikeDataProps = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
};

const ViewBike = () => {
  const { bikeId } = useParams();
  const { data: bike, isLoading, error } = useGetProductByIdQuery(bikeId);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;
  if (!bike.data) return <div>No bike data available.</div>;

  return <BikeCard {...bike.data} key={bike.data.id} />;
};

export default ViewBike;
