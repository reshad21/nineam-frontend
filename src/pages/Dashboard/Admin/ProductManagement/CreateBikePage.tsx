// {
//   "name": "Touring Bike",
//   "description": "A bike built for long-distance travel with comfort.",
//   "pricePerHour": 4,
//   "cc": 1200,
//   "year": 2019,
//   "model": "Tour Master",
//   "brand": "BMW",
//   "image": "https://www.godigit.com/content/dam/godigit/directportal/en/triumph-tiger-900.jpg"
// }

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BrForm from "../../../../components/Form/BrForm";
import BrInput from "../../../../components/Form/BrInput";
import BrSelect from "../../../../components/Form/BrSelect";
import BrTextArea from "../../../../components/Form/BrTextArea";
import { bikeSchema } from "../../../../schemas/bikeSchema.schema";

const CreateBikepage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Convert pricePerHour and cc to numbers
    data.pricePerHour = parseFloat(data.pricePerHour);
    data.cc = parseFloat(data.cc);

    console.log("create bike data==>", data);
  };

  // Convert year options to an array of objects with value and label properties
  const yearOptions = Array.from({ length: 25 }, (_, index) => {
    const year = 2000 + index;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={12}>
        <BrForm onSubmit={onSubmit} resolver={zodResolver(bikeSchema)}>
          <Row gutter={16}>
            <Col span={12}>
              <BrInput name="name" type="text" label="Name" />
            </Col>
            <Col span={12}>
              <BrInput
                name="pricePerHour"
                type="number"
                label="Price Per Hour"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <BrInput name="cc" type="number" label="CC" />
            </Col>
            <Col span={12}>
              <BrSelect name="year" label="Year" options={yearOptions} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <BrInput name="model" type="text" label="Model" />
            </Col>
            <Col span={12}>
              <BrInput name="brand" type="text" label="Brand" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <BrInput name="image" type="text" label="Image-URL" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <BrTextArea name="description" label="Description" />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block>
            Create Bike
          </Button>
        </BrForm>
      </Col>
    </Row>
  );
};

export default CreateBikepage;
