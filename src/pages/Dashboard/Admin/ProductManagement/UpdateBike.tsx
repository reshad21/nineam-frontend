import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import BrForm from "../../../../components/Form/BrForm";
import BrInput from "../../../../components/Form/BrInput";
import { TBikeDataProps } from "../../../../components/Ui/BikeCard";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/Bike/bikeApi";
import { TResponse } from "../../../../types/global";

const UpdateBike = () => {
  const { bikeId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(bikeId);
  const [updateBikePrice] = useUpdateProductMutation();

  // If the data is still loading or there is an error, show a loading or error message
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;

  const defaultValues = {
    pricePerHour: data?.data?.pricePerHour || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating...");

    try {
      // Convert the pricePerHour field to a number
      const payload = {
        ...data,
        pricePerHour: Number(data.pricePerHour), // Convert to number
      };

      const res = (await updateBikePrice({
        id: bikeId,
        data: payload,
      })) as TResponse<TBikeDataProps>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Bike updated successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <BrForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BrInput name="pricePerHour" type="number" label="Price Per Hour" />
          <Button htmlType="submit">Update</Button>
        </BrForm>
      </Col>
    </Flex>
  );
};

export default UpdateBike;
