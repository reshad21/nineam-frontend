import {
  Button,
  Pagination,
  Space,
  Table,
  TableProps,
  type TableColumnsType,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../../redux/features/Bike/bikeApi";
import {
  useGetAllBookingQuery,
  useReturnBikeMutation,
} from "../../../../redux/features/Rent/rentApi";
import { TQueryParam } from "../../../../types/global";

interface Bike {
  _id: string;
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
  isReturned: boolean; // Changed from isAvailable to isReturned
}

interface DataType {
  key: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  pricePerHour: number;
  year: number;
  isReturned: boolean; // Changed from isAvailable to isReturned
}

const BikeStatus = () => {
  const [takeReturnBike] = useReturnBikeMutation();
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1); // Initial page set to 1

  const {
    data: bookings,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAllBookingQuery([
    { name: "limit", value: 6 },
    { name: "page", value: page },
    { name: "sort", value: "cc" },
    ...params,
  ]);

  const { data: bikes } = useGetAllProductsQuery(undefined);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;
  if (!bookings?.data) return <div>No Booking data available.</div>;

  console.log("booking bike information==>", bookings?.data);
  console.log("booking page bike information==>", bikes?.data);

  const metaData = bookings?.meta;

  // Transform the data for the table
  const tableData: DataType[] =
    bookings?.data.map(
      ({
        _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
        isReturned, // Use isReturned instead of isAvailable
      }: Bike) => ({
        key: _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
        isReturned,
      })
    ) || [];

  // Table columns configuration
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Sport Bike",
          value: "Sport Bike",
        },
        {
          text: "Dirt Bike",
          value: "Dirt Bike",
        },
        {
          text: "Electric Scooter Vespa",
          value: "Electric Scooter Vespa",
        },
      ],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: [
        {
          text: "Yamaha",
          value: "Yamaha",
        },
        {
          text: "Honda",
          value: "Honda",
        },
        {
          text: "BMW",
          value: "BMW",
        },
      ],
    },
    {
      title: "CC",
      dataIndex: "cc",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
    {
      title: "Actions",
      key: "actions",
      render: (item: DataType) => {
        // Move the function inside the render method
        const handleUpdateReturnStatus = async (
          bikeId: string,
          isReturned: boolean
        ) => {
          try {
            console.log("bike status onsubmit==>", bikeId, isReturned);
            const payload = { isReturned: !isReturned }; // Toggle the return status
            await takeReturnBike({ bikeId, ...payload }).unwrap();
            console.log("Bike return status updated successfully");
            refetch(); // Refetch the data to reflect the change
          } catch (error) {
            console.error("Failed to update bike return status", error);
          }
        };

        return (
          <Space size="middle">
            <Link to={`/user/view-bike/${item.key}`}>
              <Button>View</Button>
            </Link>
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

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      if (filters.name) {
        filters.name.forEach((item) =>
          queryParams.push({ name: "name", value: item as string })
        );
      }

      if (filters.brand) {
        filters.brand.forEach((item) =>
          queryParams.push({ name: "brand", value: item as string })
        );
      }

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
        current={page}
      />
    </>
  );
};

export default BikeStatus;
