import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateRentBikeMutation } from "../../redux/features/Rent/rentApi";
import { useAppSelector } from "../../redux/hooks";
import { TBikeBooking, TResponse } from "../../types";
import BrForm from "../Form/BrForm";
import BrInput from "../Form/BrInput";
import ReviewSection from "./ReviewSection";

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

const BikeViewCard = ({
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
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <>
      {/* bike details section */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-gray-100" : "text-gray-800"
        } overflow-hidden w-full max-w-6xl mx-auto relative flex flex-col md:flex-row justify-between items-center`}
      >
        {/* Availability Badge */}
        <div
          className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-full text-white ${
            isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isAvailable ? (
            <CheckCircleOutlined className="mr-1" />
          ) : (
            <CloseCircleOutlined className="mr-1" />
          )}
          {isAvailable ? "Available" : "Not Available"}
        </div>

        <figure className="relative">
          <img
            src={image}
            alt={`${name} Image`}
            className="w-full h-fit object-cover"
          />
        </figure>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{name}</h2>
          <p className="text-md text-gray-500 mb-4">
            {description || "No description available."}
          </p>
          <div className="mb-4 space-y-5">
            <div className="flex justify-between text-md">
              <span className="font-medium">Model:</span>
              <span>{model}</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="font-medium">Brand:</span>
              <span>{brand}</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="font-medium">CC:</span>
              <span>{cc}</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="font-medium">Launched:</span>
              <span>{year}</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="font-medium">Price Per Hour:</span>
              <span>{pricePerHour} BDT</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {!params.bikeId && (
              <Link to={`/singleBike/${_id}`} className="w-full">
                <Button
                  className={`w-full ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100 hover:bg-gray-800"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } py-2 rounded-lg`}
                >
                  View Details
                </Button>
              </Link>
            )}
            {isAvailable && (
              <BikeModal bikeId={_id} isAvailable={isAvailable} />
            )}
          </div>
        </div>
      </div>
      {/* review section */}
      <ReviewSection />
    </>
  );
};

//modal component
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
  const { user } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const showModal = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "user") {
      toast.error("Only users can book a bike.");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Booking...");
    try {
      const payload = { bikeId, startTime: data.startTime };
      const res = (await createRent(payload)) as TResponse<TBikeBooking>;
      setIsModalOpen(false);

      if (res.error) {
        toast.error(res?.error?.data?.message || "Error occurred", {
          id: toastId,
        });
      } else {
        toast.success("Bike rent successfully", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={`w-full ${
          isAvailable
            ? "bg-primary hover:bg-green-600"
            : "cursor-not-allowed bg-gray-300"
        } text-white rounded transition duration-300`}
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
          defaultValues={{ startTime: defaultValues.startTime }}
        >
          <BrInput
            name="startTime"
            type="text"
            label="Starting Time"
            readOnly
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={handleCancel}
              className={`py-2 ${
                theme === "dark"
                  ? "bg-gray-600 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="py-2">
              Confirm
            </Button>
          </div>
        </BrForm>
      </Modal>
    </>
  );
};

export default BikeViewCard;
