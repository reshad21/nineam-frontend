import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateRentBikeMutation } from "../../redux/features/Rent/rentApi";
import BrForm from "../Form/BrForm";
import BrInput from "../Form/BrInput";

// Update the type definition to match the Bike data structure
export type TBikeDataProps = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
  isAvailable: boolean;
};

const BikeCard = ({
  _id,
  name,
  description,
  pricePerHour,
  cc,
  year,
  model,
  brand,
  image,
  isAvailable,
}: TBikeDataProps) => {
  const params = useParams();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full max-w-sm mx-auto relative">
      {/* Availability Badge */}
      <div
        className={`absolute z-40 top-2 left-2 px-2 py-1 rounded-full text-white text-sm ${
          isAvailable ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <span className="flex items-center">
          {isAvailable ? (
            <>
              <CheckCircleOutlined className="mr-1" />
              Available
            </>
          ) : (
            <>
              <CloseCircleOutlined className="mr-1" />
              Not Available
            </>
          )}
        </span>
      </div>

      <figure className="relative">
        <img
          src={image}
          alt={`${name} Image`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-lg">
          <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">
            {year} Model
          </span>
        </div>
      </figure>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-slate-400 mb-4">
          {description || "No description available."}
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Model:</span>
            <span>{model}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Brand:</span>
            <span>{brand}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">CC:</span>
            <span>{cc}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Price Per Hour:</span>
            <span className="ml-1 text-gray-800">{pricePerHour} BDT</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {!params.bikeId && (
            <Link to={`/singleBike/${_id}`} className="w-full">
              <Button className="w-full bg-slate-200">View Details</Button>
            </Link>
          )}
          <BikeModal bikeId={_id} isAvailable={isAvailable} />
        </div>
      </div>
    </div>
  );
};

const defaultValues = {
  startTime: new Date().toISOString(),
};

type BikeModalProps = {
  bikeId: string;
  isAvailable: boolean;
};

const BikeModal = ({ bikeId, isAvailable }: BikeModalProps) => {
  const [createRent] = useCreateRentBikeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Booking...");
    try {
      const payload = { bikeId, startTime: data.startTime };
      const res = await createRent(payload).unwrap();
      setIsModalOpen(false);

      // Check if the response contains an error
      if ("error" in res) {
        toast.error(res?.error?.data?.message || "Error occurred", {
          id: toastId,
        });
      } else {
        toast.success("Bike rent successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-slate-600"
        disabled={!isAvailable}
      >
        Book Now
      </Button>
      <Modal
        title="Confirmation Booking Information"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <BrForm
          onSubmit={handleSubmit}
          defaultValues={{ startTime: defaultValues.startTime }} // Only include startTime in the form
        >
          <BrInput
            name="startTime"
            type="text"
            label="Starting Time"
            readOnly
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </BrForm>
      </Modal>
    </>
  );
};

export default BikeCard;
