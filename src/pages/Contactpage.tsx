import { Button, Col, Divider, Form, Input, Row } from "antd";
import {
  Controller,
  FieldValues,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";

const { TextArea } = Input;

const ContactUsPage = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const { handleSubmit, control, reset } = useForm();

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log("Contact Form Data:", data);
    // Add form submission logic here
    reset(); // Reset form after submission
  };

  return (
    <div
      className={`py-16 px-4 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <Row justify="center" className="mb-12">
        <Col xs={24} sm={20} md={16} lg={12}>
          <h1
            className={`text-center ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            } font-bold text-4xl`}
          >
            Get in Touch
          </h1>
          <p
            className={`text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } text-lg`}
          >
            We’d love to hear from you! Fill out the form below or reach us
            through social media.
          </p>
        </Col>
      </Row>

      {/* Contact Form Section */}
      <Row justify="center" align="middle" gutter={40}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-8 rounded-lg shadow-lg border transition-transform transform hover:scale-105`}
          >
            <h3
              className={`text-center mb-6 ${
                theme === "dark" ? "text-slate-200" : "text-primary"
              } text-2xl font-semibold`}
            >
              Contact Form
            </h3>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Form.Item
                label={
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </span>
                }
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Your Name" />
                  )}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </span>
                }
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="email" placeholder="Your Email" />
                  )}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Subject
                  </span>
                }
              >
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Subject" />
                  )}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </span>
                }
              >
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
                  className={`${
                    theme === "dark"
                      ? "bg-primary border-primary"
                      : "bg-primary border-primary"
                  }`}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Social Media and Contact Info */}
      <Row justify="center" className="mt-12">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Divider
            className={`${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            Follow Us
          </Divider>
          <div className="text-center mb-8 flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-primary-light"
                  : "text-gray-600 hover:text-primary-dark"
              }`}
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-primary-light"
                  : "text-gray-600 hover:text-primary-dark"
              }`}
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-primary-light"
                  : "text-gray-600 hover:text-primary-dark"
              }`}
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://linkedin.com"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-primary-light"
                  : "text-gray-600 hover:text-primary-dark"
              }`}
            >
              <FaLinkedin size={30} />
            </a>
          </div>

          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 rounded-lg shadow-md`}
          >
            <h4
              className={`${
                theme === "dark" ? "text-primary" : "text-primary"
              } text-xl font-semibold`}
            >
              Contact Information
            </h4>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Address:</strong> 123 Street Name, City, State 12345
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Email:</strong> contact@yourcompany.com
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
