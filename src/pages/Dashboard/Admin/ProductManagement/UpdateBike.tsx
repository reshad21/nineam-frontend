import { Button, Card, Col, Row, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../../../../components/Form/BrForm";
import BrInput from "../../../../components/Form/BrInput";
import BrSelect from "../../../../components/Form/BrSelect";
import BrTextArea from "../../../../components/Form/BrTextArea";
import { TBikeDataProps } from "../../../../components/Ui/BikeCard";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/Bike/bikeApi";
import { TResponse } from "../../../../types/global";

const { Title } = Typography;

const UpdateBike = () => {
  const navigate = useNavigate();
  const { bikeId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(bikeId);
  const [updateBikePrice] = useUpdateProductMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;

  const defaultValues = {
    pricePerHour: data?.data?.pricePerHour || "",
    name: data?.data?.name || "",
    cc: data?.data?.cc || "",
    year: data?.data?.year || "",
    brand: data?.data?.brand || "",
    model: data?.data?.model || "",
    image: data?.data?.image || "",
    description: data?.data?.description || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Updating...");

    try {
      const payload = {
        ...formData,
        pricePerHour: Number(formData.pricePerHour),
        cc: Number(formData.cc),
        year: Number(formData.year),
      };

      const res = (await updateBikePrice({
        id: bikeId,
        data: payload,
      })) as TResponse<TBikeDataProps>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Bike updated successfully", { id: toastId });
        navigate("/admin/view-bikes");
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
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={14} lg={10}>
        <Card
          bordered={false}
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Update Bike Information
          </Title>
          <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
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

            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: "20px" }}
            >
              Update Bike
            </Button>
          </BrForm>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateBike;
