import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useGetAllProductsQuery } from "../../../redux/features/Bike/bikeApi";

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

const ViewAllBikePage = () => {
  const { data: bikes } = useGetAllProductsQuery(undefined);

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

  const handleView = (record: DataType) => {
    console.log("View", record);
    // Implement view logic
  };

  const handleUpdate = (record: DataType) => {
    console.log("Update", record);
    // Implement update logic
  };

  const handleDelete = (record: DataType) => {
    console.log("Delete", record);
    // Implement delete logic
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
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
      title: "brand",
      dataIndex: "brand",
    },
    {
      title: "pricePerHour",
      dataIndex: "pricePerHour",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              borderRadius: 4,
              padding: "4px 10px",
            }}
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              borderRadius: 4,
              padding: "4px 10px",
            }}
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            style={{
              backgroundColor: "#f5222d",
              color: "#fff",
              borderRadius: 4,
              padding: "4px 10px",
            }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={tabelData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default ViewAllBikePage;
