import { useParams } from "react-router-dom";
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

  // Destructure the bike data
  const { image, name, year, description, model, cc, brand, pricePerHour } =
    bike.data;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full max-w-sm mx-auto">
      <figure className="relative">
        <img
          src={image}
          alt={`${name} Image`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-lg">
          <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">
            {year} Model
          </span>
        </div>
      </figure>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-slate-400 mb-4">
          {description || "No description available."}
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Model:</span>
            <span>{model}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Brand:</span>
            <span>{brand}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">CC:</span>
            <span>{cc}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Price Per Hour:</span>
            <span className="ml-1 text-gray-800">${pricePerHour}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBike;
