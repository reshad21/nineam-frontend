import { Alert, Spin } from "antd";
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
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading profile data..." />
      </div>
    );
  if (error)
    return (
      <Alert
        message="Error loading profile data"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );
  if (!bike.data)
    return (
      <Alert
        message="No Bike data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  return <BikeCard {...bike.data} key={bike.data.id} />;
};

export default ViewBike;
