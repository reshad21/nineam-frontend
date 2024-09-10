import { Link } from "react-router-dom";

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

const BikeCard = ({
  _id,
  name,
  description,
  pricePerHour,
  cc,
  year,
  model,
  brand,
  image,
}: TBikeDataProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full max-w-sm mx-auto">
      <figure className="relative">
        <img
          src={image} // You might want to update this with a dynamic image URL
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
            <span className="ml-1 text-gray-800">{pricePerHour} BDT</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/singleBike/${_id}`} className="w-full">
            <button className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full">
              View Details
            </button>
          </Link>
          <button className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
