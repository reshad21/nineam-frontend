import {
  Button,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../../../redux/features/Bike/bikeApi";
import { useGetAllUsersQuery } from "../../../../redux/features/auth/authApi";

// interface Bike {
//   _id: string;
//   brand: string;
//   cc: number;
//   model: string;
//   name: string;
//   pricePerHour: number;
//   year: number;
// }

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

// interface DataType {
//   key: string;
//   name: string;
//   cc: number;
//   model: string;
//   brand: string;
//   pricePerHour: number;
//   year: number;
// }

type DataType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

const AllUsers = () => {
  const { data: users } = useGetAllUsersQuery(undefined);

  const [deleteBike] = useDeleteProductMutation();

  const tabelData: DataType[] =
    users?.data.map(({ _id, name, email, phone, role }: User) => ({
      key: _id,
      name,
      email,
      phone,
      role,
    })) || [];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => {
        const handleDelete = async () => {
          try {
            await deleteBike(item.key).unwrap();
            console.log("Bike deleted successfully");
          } catch (error) {
            console.error("Failed to delete bike", error);
          }
        };
        return (
          <Space size="middle">
            <Link to={`/admin/update-bike/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button>view</Button>
            <Button onClick={handleDelete} danger>
              Delete
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

export default AllUsers;
