import { useParams } from "react-router-dom";

const BikeDetails = () => {
  const { bikeId } = useParams();
  console.log(bikeId);
  return (
    <div>
      <h1>A single bike details information page:{bikeId}</h1>
    </div>
  );
};

export default BikeDetails;
