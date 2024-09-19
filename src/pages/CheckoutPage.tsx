/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../redux/features/Order/orderApi";
import {
  useGetRentReturnBikeQuery,
  usePayBillStatusMutation,
} from "../redux/features/Rent/rentApi";
import { useAppSelector } from "../redux/hooks";

type FormData = {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: string;
  promoCode?: string;
};

const CheckoutPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const rentId = query.get("rentId");
  const { data: rent, isLoading, error } = useGetRentReturnBikeQuery(rentId);
  const [updatePaybillStatus] = usePayBillStatusMutation();
  const theme = useAppSelector((state) => state.theme.mode);
  const customer = useAppSelector((state) => state.auth);
  const [createOrder] = useCreateOrderMutation();

  const { user } = customer;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      email: user?.email,
      promoCode: "",
    },
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bike data.</div>;
  if (!rent?.data) return <div>No Rent data available.</div>;

  const totalPrice = rent?.data?.totalCost || 0;
  const promoCode = watch("promoCode") ?? "";

  // Handle different promo codes
  const discountRates: { [key: string]: number } = {
    PROMO10: 0.1,
    PROMO20: 0.2,
    PROMO30: 0.3,
    PROMO40: 0.4,
  };

  const discount = discountRates[promoCode?.toUpperCase()] ?? 0;
  const finalPrice = totalPrice - totalPrice * discount; // Final price after applying discount

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing Order...");
    try {
      const { brand, name } = rent.data.bikeId;
      const payload = {
        userInfo: data,
        productInfo: { brand, name },
        finalPrice,
      };
      const res = await createOrder(payload).unwrap();
      if (res.success) {
        window.location.href = res?.data?.payment_url;
        console.log("try to see which url is going==>", window.location.href);
        updatePaybillStatus({
          id: rentId,
          data: { payBill: true },
        });
      } else {
        toast.error("Payment not done", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div
      className={`flex items-center justify-center py-10 px-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section: User Information */}
        <div className="flex-1 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                placeholder="John Doe"
                readOnly
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                placeholder="123 Street, City, Country"
                readOnly
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                placeholder="+880 1234 567890"
                readOnly
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                placeholder="email@example.com"
                readOnly
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Promo Code Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Promo Code (Optional)
              </label>
              <input
                {...register("promoCode")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter promo code"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          {/* Order Items */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between text-gray-700 mb-2">
              <p className="font-medium">Bike Name:</p>
              <p>{rent?.data?.bikeId.name}</p>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <p className="font-medium">Start Time:</p>
              <p>{new Date(rent?.data?.startTime).toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <p className="font-medium">Return Time:</p>
              <p>{new Date(rent?.data?.returnTime).toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <p className="font-medium">Total Time:</p>
              <p>
                {Math.ceil(
                  (new Date(rent?.data?.returnTime).getTime() -
                    new Date(rent?.data?.startTime).getTime()) /
                    (1000 * 60 * 60)
                )}{" "}
                hours
              </p>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold">
              <p>Total Cost:</p>
              <p>BDT {rent?.data.totalCost.toFixed(2)}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-4"></div>

          {/* Total Price */}
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
            <span>Total:</span>
            <span>BDT {totalPrice.toFixed(2)}</span>
          </div>

          {/* Discount and Final Price */}
          {discount > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Discount:</span>
                <span>BDT {(totalPrice * discount).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
            </>
          )}
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Final Price:</span>
            <span>BDT {finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
