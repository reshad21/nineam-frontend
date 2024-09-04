import {
  Button,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/auth/authApi";
import { useAppSelector } from "../../../../redux/hooks";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

type DataType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

const AllUsers = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data: users } = useGetAllUsersQuery(undefined);

  const [deleteUser] = useDeleteUserMutation();

  const [updateRole] = useUpdateUserRoleMutation();

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
            await deleteUser(item.key).unwrap();
            console.log("User deleted successfully");
          } catch (error) {
            console.error("Failed to delete bike", error);
          }
        };

        const handleUpdate = () => {
          const payload = {
            id: item?.key,
            data: user?.role,
          };
          updateRole(payload);
        };

        return (
          <Space size="middle">
            <Button onClick={handleUpdate}>Update</Button>
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
