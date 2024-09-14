import { Button } from "antd";
import { useGetCustomerBookingQuery } from "../../../../redux/features/Rent/rentApi";

const MyRentList = () => {
  const { data: bikes } = useGetCustomerBookingQuery(undefined, {
    pollingInterval: 2000,
  });
  console.log("user rent bike ==>", bikes?.data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {bikes?.data?.map((bike) => (
        <div
          key={bike.bikeId._id}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={bike.bikeId.image}
            alt={bike.bikeId.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">
              {bike.bikeId.name}
            </div>
            <p className="text-gray-700 text-base mb-4">
              {bike.bikeId.description}
            </p>
            <ul className="text-sm text-gray-600 mb-4">
              <li>
                <strong>Brand:</strong> {bike.bikeId.brand}
              </li>
              <li>
                <strong>Model:</strong> {bike.bikeId.model}
              </li>
              <li>
                <strong>Year:</strong> {bike.bikeId.year}
              </li>
              <li>
                <strong>CC:</strong> {bike.bikeId.cc}
              </li>
              <li>
                <strong>Price per Hour:</strong> ${bike.bikeId.pricePerHour}
              </li>
              <li>
                <strong>Total Cost:</strong> ${bike.totalCost}
              </li>
            </ul>
            <div className="flex justify-between items-center">
              {bike.isReturned ? (
                <Button type="primary" className="w-full">
                  Payment Now
                </Button>
              ) : (
                <span className="text-green-500 font-semibold">
                  BIKE IS RUNNING
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRentList;
