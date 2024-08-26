import { Link } from "react-router-dom";

export type TProductdata = {
  _id: string;
  title: string;
  price: number;
  imgurl: string;
  rating?: number;
  quantity: number;
  brand?: string;
  category?: string;
  description?: string;
};

const BikeCard = ({
  _id,
  title,
  price,
  imgurl,
  description,
  brand,
  category,
  quantity,
  rating,
}: TProductdata) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full max-w-sm mx-auto">
      <figure className="relative">
        <img
          src={imgurl}
          alt="Product Image"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-lg">
          <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">
            {rating ? `${rating}⭐` : "No Rating"}
          </span>
        </div>
      </figure>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-slate-400 mb-4">
          {description || "No description available."}
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Category:</span>
            <span>{category || "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Brand:</span>
            <span>{brand || "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Quantity:</span>
            <span
              className={`ml-1 ${
                quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {quantity > 0 ? quantity : "Stock Out"}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Price:</span>
            <span className="ml-1 text-gray-800">${price}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/singleProduct/${_id}`} className="w-full">
            <button className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full">
              View Details
            </button>
          </Link>
          <button className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
