import {
  Button,
  Modal, // Import Modal
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/User/userApi";
import { useAppSelector } from "../../../../redux/hooks";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

const AllUsers = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: users } = useGetAllUsersQuery(undefined); // users is now typed properly

  const [deleteUser] = useDeleteUserMutation();
  const [updateRole] = useUpdateUserRoleMutation();

  // Ensure tabelData is typed properly as DataType[]
  const tabelData: User[] =
    users?.data.map(({ _id, name, email, phone, role }: User) => ({
      _id,
      name,
      email,
      phone,
      role,
    })) || [];

  const columns: TableColumnsType<User> = [
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
            await deleteUser(item._id).unwrap();
            console.log("User deleted successfully");
          } catch (error) {
            console.error("Failed to delete user", error);
          }
        };

        const handleUpdate = () => {
          const payload = {
            id: item._id,
            data: user?.role,
          };
          updateRole(payload);
        };

        const showDeleteConfirm = () => {
          Modal.confirm({
            title: "Are you sure you want to delete this user?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: handleDelete,
          });
        };

        return (
          <Space size="middle">
            <Button onClick={handleUpdate}>ROLE CHANGE</Button>
            <Button onClick={showDeleteConfirm} danger>
              Delete
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<User>["onChange"] = (
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
      pagination={false}
    />
  );
};

export default AllUsers;
