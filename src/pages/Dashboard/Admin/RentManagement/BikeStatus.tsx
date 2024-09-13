import { Button, Space, Table, type TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../../../../redux/features/Bike/bikeApi";
import {
  useGetAllBookingQuery,
  useReturnBikeMutation,
} from "../../../../redux/features/Rent/rentApi";

type TBikeId = {
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
};

type Bike = {
  _id: string;
  bikeId: TBikeId;
  isReturned: boolean; // Changed from isAvailable to isReturned
};

type DataType = {
  key: string;
  bikeId: TBikeId;
  isReturned: boolean; // Changed from isAvailable to isReturned
};

const BikeStatus = () => {
  const [takeReturnBike] = useReturnBikeMutation();

  const {
    data: bookings,
    isLoading,
    isFetching,
  } = useGetAllBookingQuery(undefined);

  const { data: bikes } = useGetAllProductsQuery(undefined);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (!bookings?.data) return <div>No Booking data available.</div>;

  console.log("booking bike information==>", bookings?.data[0].userId);
  console.log("booking page bike information==>", bikes?.data[0]);

  // Transform the data for the table
  const tableData: DataType[] =
    bookings?.data.map(
      ({
        _id,
        bikeId,
        isReturned, // Use isReturned instead of isAvailable
      }: Bike) => ({
        key: _id,
        name: bikeId.name,
        brand: bikeId.brand,
        pricePerHour: bikeId.pricePerHour,
        isReturned,
      })
    ) || [];

  // Table columns configuration
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Actions",
      key: "actions",
      render: (item: DataType) => {
        console.log("object==>", item);
        // Move the function inside the render method
        const handleUpdateReturnStatus = async (
          bookingId: string,
          isReturned: boolean
        ) => {
          try {
            console.log("bike status onsubmit==>", bookingId, isReturned);
            const payload = { isReturned: !isReturned }; // Toggle the return status
            await takeReturnBike({ bookingId, payload }).unwrap();
            console.log("Bike return status updated successfully");
          } catch (error) {
            console.error("Failed to update bike return status", error);
          }
        };

        return (
          <Space size="middle">
            <Button
              onClick={() =>
                handleUpdateReturnStatus(item.key, item.isReturned)
              }
              className={item.isReturned ? "bg-green-400" : "bg-red-400"}
            >
              {item.isReturned ? "Returned" : "Not Returned"}
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        pagination={false}
      />
    </>
  );
};

export default BikeStatus;
