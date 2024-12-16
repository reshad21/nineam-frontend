import { CloseCircleOutlined } from "@ant-design/icons";
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

const PopularBikeCard = ({
  _id,
  name,
  pricePerHour,
  cc,
  year,
  image,
  isAvailable,
}: TBikeDataProps) => {
  const params = useParams();

  return (
    <div
      className="relative h-64 bg-cover bg-center rounded-lg shadow-xl overflow-hidden w-full mx-auto"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-55 flex flex-col justify-between p-4 text-white">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          {/* Availability Badge */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              isAvailable ? "" : "bg-red-500"
            }`}
          >
            {isAvailable ? (
              <></>
            ) : (
              <span className="flex items-center gap-1">
                <CloseCircleOutlined /> Not Available
              </span>
            )}
          </div>
        </div>

        {/* Middle Section */}
        <div className="pt-9">
          <h3 className="text-lg font-semibold">
            {name} <span className="text-sm text-accent">({cc}cc)</span>
          </h3>
          <p className="mt-1 text-sm">Launched: {year}</p>
          <p className="mt-1 text-sm ">
            Price Per Hour:{" "}
            <span className="text-accent">{pricePerHour} BDT</span>
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-2">
          {!params.bikeId && (
            <Link to={`/singleBike/${_id}`}>
              <Button className="w-full bg-secondary hover:bg-blue-600 text-white rounded-md border-secondary shadow transition duration-300">
                View Details
              </Button>
            </Link>
          )}
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
    } catch (error) {
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
            <Button
              type="primary"
              className={`${
                theme === "dark" ? "bg-primary text-accent" : "bg-secondary"
              }`}
              htmlType="submit"
            >
              Confirm
            </Button>
          </div>
        </BrForm>
      </Modal>
    </>
  );
};

export default PopularBikeCard;
