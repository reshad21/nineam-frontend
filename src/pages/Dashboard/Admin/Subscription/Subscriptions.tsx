import {
  Alert,
  Pagination,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllSubscriberQuery } from "../../../../redux/features/Subscription/subscriptionApi";
import { TQueryParam } from "../../../../types/global";

interface subscriber {
  _id: string;
  email: string;
}

interface DataType {
  key: string;
  email: string;
}

const Subscriptions = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: subscribers,
    isLoading,
    error,
  } = useGetAllSubscriberQuery([
    { name: "limit", value: 30 },
    { name: "page", value: page },
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
  if (!subscribers.data)
    return (
      <Alert
        message="No subscriber data available"
        type="error"
        showIcon
        className="max-w-lg mx-auto mt-8"
      />
    );

  const metaData = subscribers?.meta;

  const tabelData: DataType[] =
    subscribers?.data.map(({ _id, email }: subscriber) => ({
      key: _id,
      email,
    })) || [];

  // Helper function to extract unique values for a specific field (e.g., 'name')
  const getUniqueValues = (data: subscriber[], field: keyof subscriber) => {
    return [...new Set(data.map((item) => item[field]))].map((value) => ({
      text: String(value), // Ant Design expects a 'text' and 'value' pair
      value: String(value),
    }));
  };

  // Generate dynamic filters based on 'name' and 'brand'
  const nameFilters = getUniqueValues(subscribers.data, "email");

  const columns: TableColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
      filters: nameFilters, // Dynamically generated filters
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

export default Subscriptions;
