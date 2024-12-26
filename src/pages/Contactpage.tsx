import { Button, Col, Form, Input, Row } from "antd";
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
      className={`py-16 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header Section */}
      <Row justify="center" className="mb-12">
        <Col xs={24} sm={20} md={16} lg={12}>
          <h1
            className={`text-center ${
              theme === "dark" ? "text-gray-200" : "text-secondary"
            } font-bold text-4xl`}
          >
            Get in Touch
          </h1>
          <p
            className={`text-center ${
              theme === "dark" ? "text-gray-300" : "text-secondary"
            } text-lg`}
          >
            We’d love to hear from you! Fill out the form below or reach us
            through social media.
          </p>
        </Col>
      </Row>

      {/* Combined Contact Form and Social Media Section */}
      <Row justify="center" align="top" gutter={[40, 40]}>
        {/* Contact Form Section */}
        <Col xs={24} md={12}>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-4 rounded-lg shadow-lg border`}
          >
            <h3
              className={`text-center mb-6 ${
                theme === "dark" ? "text-slate-200" : "text-primary"
              } text-3xl font-semibold`}
            >
              Contact Form
            </h3>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Row gutter={16}>
                {/* Name Field */}
                <Col xs={24} md={12}>
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
                </Col>

                {/* Email Field */}
                <Col xs={24} md={12}>
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
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your Email"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* Subject Field */}
                <Col xs={24}>
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
                </Col>

                {/* Message Field */}
                <Col xs={24}>
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
                        <TextArea
                          {...field}
                          rows={4}
                          placeholder="Your Message"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

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

        {/* Social Media and Contact Info */}
        <Col xs={24} md={12}>
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 rounded-lg shadow-md`}
          >
            {/* Google Map */}
            <div className="mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117442.56768822758!2d90.08492378591735!3d21.82298826576851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30aacf5c4b3087bb%3A0x85135f9ff841a36e!2sKuakata%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1695755590912!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
            <h4
              className={`mb-2 ${
                theme === "dark" ? "text-slate-100" : "text-primary"
              } text-xl font-semibold`}
            >
              Contact Information
            </h4>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Address:</strong> 8200, kuakata Sea Beach, Barisal,
              Bangladesh
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Email:</strong> contact@bikerental.com
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <strong>Phone:</strong> 01787170612
            </p>
          </div>

          <h2
            className={`my-4 text-center ${
              theme === "dark" ? "text-slate-100" : "text-primary"
            } text-xl font-bold`}
          >
            Follow Us
          </h2>
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
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsPage;
