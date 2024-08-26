import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const { Title } = Typography;
const { TextArea } = Input;

const ContactUsPage = () => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log("Contact Form Data:", data);
    // Add form submission logic here
    reset(); // Reset form after submission
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f4f4f4" }}>
      {/* Header Section */}
      <Row justify="center" style={{ marginBottom: "40px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title
            level={1}
            style={{
              textAlign: "center",
              color: "#ff4c30",
              fontWeight: "bold",
            }}
          >
            Get in Touch
          </Title>
          <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
            We’d love to hear from you! Fill out the form below or reach us
            through social media.
          </p>
        </Col>
      </Row>

      {/* Contact Form Section */}
      <Row justify="center" align="middle" gutter={40}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.15)",
              border: "1px solid #ddd",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#ff4c30",
              }}
            >
              Contact Form
            </Title>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Form.Item label="Name">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Your Name" />
                  )}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="email" placeholder="Your Email" />
                  )}
                />
              </Form.Item>
              <Form.Item label="Subject">
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Subject" />
                  )}
                />
              </Form.Item>
              <Form.Item label="Message">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextArea {...field} rows={4} placeholder="Your Message" />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "#ff4c30", borderColor: "#ff4c30" }}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Social Media and Contact Info */}
      <Row justify="center" style={{ marginTop: "40px" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Divider>Follow Us</Divider>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-600 hover:text-primary"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-600 hover:text-primary"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-600 hover:text-primary"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-600 hover:text-primary"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title level={4} style={{ color: "#ff4c30" }}>
              Contact Information
            </Title>
            <p>
              <strong>Address:</strong> 123 Street Name, City, State 12345
            </p>
            <p>
              <strong>Email:</strong> contact@yourcompany.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
