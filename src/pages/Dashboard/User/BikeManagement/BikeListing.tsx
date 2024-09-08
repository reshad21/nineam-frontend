import { Button, Space, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../../../../components/Ui/SearchBox";
import { useGetAllProductsQuery } from "../../../../redux/features/Bike/bikeApi";

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
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pass the searchTerm to the query
  const { data: bikes, isLoading, error } = useGetAllProductsQuery(searchTerm);

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
      sorter: (a, b) => a.name.localeCompare(b.name),
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

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="search-box my-5">
        {/* Pass both onSearch and onChange to SearchBox */}
        <SearchBox
          onSearch={(value) => setSearchTerm(value)}
          onChange={handleInputChange}
        />
      </div>

      {/* Handle loading and error states */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}

      <Table
        columns={columns}
        dataSource={tabelData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default BikeListing;
