import { Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
  };
  editLink: string; // URL for the edit profile page
}

const ProfileCard = ({ userData, editLink }: ProfileCardProps) => {
  return (
    <Card
      bordered={false}
      className="max-w-3xl mx-auto p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "#f0f2f5" }} // Light background for a clean look
    >
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {userData.name}!
        </h2>
        <p className="text-gray-500">Here's your profile overview.</p>
      </div>

      <Descriptions
        bordered
        column={1}
        size="middle"
        labelStyle={{ fontWeight: "bold", color: "#595959" }}
        contentStyle={{ color: "#262626" }}
      >
        <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{userData.phone}</Descriptions.Item>
        <Descriptions.Item label="Address">
          {userData.address}
        </Descriptions.Item>
        <Descriptions.Item label="Role">{userData.role}</Descriptions.Item>
      </Descriptions>

      <div className="text-right mt-4">
        <Link to={editLink}>
          <Button
            type="primary"
            size="large"
            style={{
              background: "linear-gradient(90deg, #ff4c30, #ff6a48)",
              borderColor: "#ff4c30",
              color: "#fff",
            }}
            className="hover:opacity-90 transition duration-300"
          >
            Edit Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProfileCard;
