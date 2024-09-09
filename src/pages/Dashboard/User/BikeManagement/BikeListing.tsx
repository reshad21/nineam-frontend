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
import { TQueryParam } from "../../../../types/global";

interface Bike {
  _id: string;
  brand: string;
  cc: number;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
}

interface DataType {
  key: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  pricePerHour: number;
  year: number;
}

const BikeListing = () => {
  // const [params, setParams] = useState<TQueryParam[]>([]);
  // const {
  //   data: bikes,
  //   isLoading,
  //   isFetching,
  //   error,
  // } = useGetAllProductsQuery(params);

  // console.log("different data==>", bikes);

  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(2);

  const {
    data: bikes,
    isLoading,
    isFetching,
    error,
  } = useGetAllProductsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "cc" },
    ...params,
  ]);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;
  if (!bikes.data) return <div>No bike data available.</div>;

  const metaData = bikes?.meta;
  console.log("meta data==>", metaData);
  // {page: 2, limit: 3, total: 8, totalPage: 3}

  // Transform the data for the table
  const tabelData: DataType[] =
    bikes?.data.map(
      ({ _id, brand, cc, model, name, pricePerHour, year }: Bike) => ({
        key: _id,
        brand,
        cc,
        model,
        name,
        pricePerHour,
        year,
      })
    ) || [];

  // Table columns configuration
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
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
          text: "Electric Scooter vespa",
          value: "Electric Scooter vespa",
        },
      ],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      showSorterTooltip: { target: "full-header" },
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
        </Space>
      ),
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
