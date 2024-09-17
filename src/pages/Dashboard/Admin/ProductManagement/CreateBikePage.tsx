import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Typography } from "antd";
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

const { Title } = Typography;

const CreateBikepage = () => {
  const [createBike] = useAddProductsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating bike...");
    try {
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

  const yearOptions = Array.from({ length: 25 }, (_, index) => {
    const year = 2000 + index;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <Title level={2} className="text-center mb-6 text-gray-800">
          Create a New Bike
        </Title>

        <BrForm onSubmit={onSubmit} resolver={zodResolver(bikeSchema)}>
          <Row gutter={16}>
            <Col span={12}>
              <BrInput name="name" type="text" label="Bike Name" />
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
              <BrInput name="image" type="text" label="Image URL" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <BrTextArea name="description" label="Description" />
            </Col>
          </Row>

          <div className="text-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "linear-gradient(90deg, #ff4c30, #ff6a48)",
                borderColor: "#ff4c30",
                color: "#fff",
              }}
            >
              Create Bike
            </Button>
          </div>
        </BrForm>
      </div>
    </div>
  );
};

export default CreateBikepage;
