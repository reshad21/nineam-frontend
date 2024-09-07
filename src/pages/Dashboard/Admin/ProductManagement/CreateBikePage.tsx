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
import { toast } from "sonner";
import BrForm from "../../../../components/Form/BrForm";
import BrInput from "../../../../components/Form/BrInput";
import BrSelect from "../../../../components/Form/BrSelect";
import BrTextArea from "../../../../components/Form/BrTextArea";
import { TBikeDataProps } from "../../../../components/Ui/BikeCard";
import { useAddProductsMutation } from "../../../../redux/features/Bike/bikeApi";
import { bikeSchema } from "../../../../schemas/bikeSchema.schema";
import { TResponse } from "../../../../types/global";

const CreateBikepage = () => {
  const [createBike] = useAddProductsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");
    try {
      // Ensure type conversions here
      data.pricePerHour = parseFloat(data.pricePerHour);
      data.cc = parseFloat(data.cc);
      data.year = parseInt(data.year as string, 10);

      const res = (await createBike(data)) as TResponse<TBikeDataProps>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Bike created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
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
