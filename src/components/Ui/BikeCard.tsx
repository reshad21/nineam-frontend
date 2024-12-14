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
  pricePerHour,
  cc,
  year,
  image,
  isAvailable,
}: TBikeDataProps) => {
  const params = useParams();
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100 border-gray-600"
          : "bg-white text-gray-800 border-gray-200"
      } rounded-lg shadow-lg overflow-hidden border w-full max-w-sm mx-auto relative`}
      style={{ height: "auto", maxHeight: "450px" }}
    >
      <div
        className={`absolute z-40 top-2 left-2 p-1 rounded-full text-accent text-[13px] ${
          isAvailable ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span className="flex items-center">
          {isAvailable ? (
            <CheckCircleOutlined />
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
          className="w-full h-44 object-cover"
        />
        <div
          className={`absolute top-0 right-2 ${
            theme === "dark" ? "text-gray-800" : "text-gray-500"
          }`}
        >
          <span className="text-xs font-semibold">{year}</span>
        </div>
      </figure>

      <div className="p-3">
        <h2
          className={`text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-400"
          }`}
        >
          {name} (<span>{cc}cc</span>)
        </h2>
        <div
          className={`flex justify-between my-4 text-[15px] ${
            theme === "dark" ? "text-slate-50" : "text-gray-700"
          }`}
        >
          <span className="text-sm font-semibold">Price Per Hour</span>
          <span className="ml-1 font-semibold">{pricePerHour} BDT</span>
        </div>
        <div className="flex justify-between gap-3">
          {!params.bikeId && (
            <Link to={`/singleBike/${_id}`} className="">
              <Button
                className={`${
                  theme === "dark"
                    ? "bg-secondary text-accent hover:bg-gray-800"
                    : "bg-secondary text-accent hover:bg-slate-300"
                } border-secondary rounded-lg transition duration-300`}
              >
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
        className={`${
          isAvailable
            ? theme === "dark"
              ? "text-accent bg-primary hover:bg-secondary"
              : "text-accent bg-primary hover:bg-secondary"
            : "cursor-not-allowed bg-gray-300"
        } border rounded-lg transition duration-300 inline-block`}
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

export default BikeCard;
