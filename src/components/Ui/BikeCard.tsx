import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateRentBikeMutation } from "../../redux/features/Rent/rentApi";
import { useAppSelector } from "../../redux/hooks"; // Adjust path as needed
import { TBikeBooking, TResponse } from "../../types";
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
  const theme = useAppSelector((state) => state.theme.mode); // Get current theme

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100 border-gray-600"
          : "bg-white text-gray-800 border-gray-200"
      } rounded-lg shadow-lg overflow-hidden border w-full max-w-sm mx-auto relative`}
    >
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
          className="w-full h-32 object-cover"
        />
        <div
          className={`absolute top-2 right-2 ${
            theme === "dark"
              ? "bg-gray-900 text-gray-100"
              : "bg-white text-gray-800"
          } px-2 py-1 rounded-full shadow-lg`}
        >
          <span className="text-xs font-semibold">{year} Model</span>
        </div>
      </figure>
      <div className="p-4">
        <h2
          className={`text-md font-semibold mb-1 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {name}
        </h2>
        <p
          className={`mb-1 ${
            theme === "dark" ? "text-gray-400" : "text-slate-500"
          }`}
        >
          {description || "No description available."}
        </p>
        <div className="flex flex-col space-y-1 mb-2">
          <div
            className={`flex justify-between ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span className="font-medium">Model:</span>
            <span>{model}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span className="font-medium">Brand:</span>
            <span>{brand}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span className="font-medium">CC:</span>
            <span>{cc}</span>
          </div>
          <div
            className={`flex justify-between ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span className="font-medium">Price Per Hour:</span>
            <span className="ml-1">{pricePerHour} BDT</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {!params.bikeId && (
            <Link to={`/singleBike/${_id}`} className="w-full">
              <Button
                className={`w-full ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-800 border-gray-600"
                    : "bg-slate-200 text-gray-800 hover:bg-slate-300 border-gray-200"
                } border rounded-lg transition duration-300`}
              >
                View Details
              </Button>
            </Link>
          )}
          {/* Conditionally render Book Now button based on availability */}
          {isAvailable && <BikeModal bikeId={_id} isAvailable={isAvailable} />}
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
  const { user } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const showModal = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else if (user.role !== "user") {
      // If user is not a regular user, prevent them from booking
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

      // Check if the response contains an error
      if (res.error) {
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
        className={`${
          isAvailable
            ? theme === "dark"
              ? "bg-gray-700 text-gray-200 hover:bg-gray-800 border-gray-600"
              : "bg-slate-700 text-gray-200 hover:bg-blue-700 border-blue-600"
            : theme === "dark"
            ? "bg-gray-500 text-gray-400 cursor-not-allowed border-gray-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
        } border rounded-lg transition duration-300`}
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
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCancel}
              className={`${
                theme === "dark"
                  ? "bg-gray-600 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              } mr-2`}
            >
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
