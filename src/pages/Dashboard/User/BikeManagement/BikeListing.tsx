import {
  Alert,
  Button,
  Pagination,
  Space,
  Spin,
  Table,
  TableProps,
  type TableColumnsType,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../../redux/features/Bike/bikeApi";
import { TQueryParam } from "../../../../types/global";

interface Bike {
  _id: string;
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
  isAvailable: boolean;
}

interface DataType {
  key: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  pricePerHour: number;
  year: number;
  isAvailable: boolean;
}

const BikeListing = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: bikes,
    isLoading,
    isFetching,
    error,
  } = useGetAllProductsQuery([
    { name: "limit", value: 7 },
    { name: "page", value: page },
    { name: "sort", value: "cc" },
    ...params,
  ]);

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
  if (!bikes.data)
    return (
      <Alert
        message="No Bike data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  const metaData = bikes?.meta;

  // Transform the data for the table
  const tabelData: DataType[] =
    bikes?.data.map(
      ({
        _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
        isAvailable,
      }: Bike) => ({
        key: _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
        isAvailable,
      })
    ) || [];

  // Helper function to extract unique values for dynamic filters
  const getUniqueValues = (data: Bike[], field: keyof Bike) => {
    return [...new Set(data.map((item) => item[field]))].map((value) => ({
      text: String(value),
      value: String(value),
    }));
  };

  // Generate dynamic filters based on 'name' and 'brand'
  const nameFilters = getUniqueValues(bikes.data, "name");
  const brandFilters = getUniqueValues(bikes.data, "brand");

  // Table columns configuration
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: nameFilters, // Dynamically generated filters
    },
    {
      title: "Brand",
      dataIndex: "brand",
      showSorterTooltip: { target: "full-header" },
      filters: brandFilters, // Dynamically generated filters
    },
    {
      title: "cc",
      dataIndex: "cc",
    },
    {
      title: "model",
      dataIndex: "model",
    },
    {
      title: "pricePerHour",
      dataIndex: "pricePerHour",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => (
        <Space size="middle">
          <Link to={`/user/view-bike/${item.key}`}>
            <Button>View</Button>
          </Link>
          {item.isAvailable ? (
            <Button>Available</Button>
          ) : (
            <Button className="bg-red-400">Not Available</Button>
          )}
        </Space>
      ),
      width: "1%",
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

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.brand?.forEach((item) =>
        queryParams.push({ name: "brand", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tabelData}
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

export default BikeListing;
