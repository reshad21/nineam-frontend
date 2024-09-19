import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  message,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../../redux/features/Bike/bikeApi";
import { useCreateBookingMutation } from "../../../../redux/features/Rent/rentApi";

const { Option } = Select;
const { Title } = Typography;

const BookingPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedBike, setSelectedBike] = useState<any>(null); // State for the selected bike

  // Fetch bikes from the API
  const { data: bikes, isLoading, error } = useGetAllProductsQuery([]);

  // Mutation for creating a booking
  const [createBooking] = useCreateBookingMutation();

  // Handle form submission
  const onFinish = async (values: any) => {
    const startTime = moment(values.startTime).toISOString();

    // Send booking data to the backend
    setLoading(true);
    try {
      await createBooking({
        bikeId: values.bikeId,
        startTime,
      }).unwrap();
      message.success("Booking created successfully!");
      navigate("/user/my-rentals"); // Redirect to My Rentals page
    } catch (error) {
      message.error("Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  // Handle bike selection change
  const handleBikeChange = (bikeId: string) => {
    const bike = bikes?.data.find((bike: any) => bike._id === bikeId);
    setSelectedBike(bike);
  };

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

  // Filter bikes that are available
  const availableBikes =
    bikes?.data?.filter((bike: any) => bike.isAvailable) || [];

  return (
    <div
      className="booking-page"
      style={{ padding: "40px", backgroundColor: "#f5f5f5" }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Book Your Bike
      </Title>
      <Row gutter={24}>
        <Col xs={24} sm={16} md={16} lg={16}>
          <Card
            bordered={false}
            style={{ padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="booking-form"
            >
              {/* Bike Selection */}
              <Form.Item
                name="bikeId"
                label="Select Bike"
                rules={[{ required: true, message: "Please select a bike!" }]}
              >
                <Select
                  placeholder="Choose a bike"
                  onChange={handleBikeChange} // Update selected bike when selection changes
                >
                  {availableBikes.map((bike: any) => (
                    <Option key={bike._id} value={bike._id}>
                      {bike.name} - {bike.brand} ({bike.cc}cc)
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Start Time */}
              <Form.Item
                name="startTime"
                label="Start Time"
                rules={[
                  { required: true, message: "Please select the start time!" },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  placeholder="Select start time"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Return Time */}
              {/* <Form.Item
                name="returnTime"
                label="Return Time"
                rules={[
                  { required: true, message: "Please select the return time!" },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  placeholder="Select return time"
                  style={{ width: "100%" }}
                />
              </Form.Item> */}

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full"
                >
                  Book Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8}>
          {selectedBike && (
            <Card
              bordered={false}
              style={{
                padding: "24px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <Title level={4}>{selectedBike.name}</Title>
              <Image
                width={200}
                src={selectedBike.image} // Assuming the image URL is stored in the `image` field
                alt={selectedBike.name}
                preview={false}
                style={{ marginBottom: "16px" }}
              />
              <p>
                <strong>Brand:</strong> {selectedBike.brand}
              </p>
              <p>
                <strong>CC:</strong> {selectedBike.cc}
              </p>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookingPage;
