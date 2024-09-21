/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../redux/features/Order/orderApi";
import { useGetRentReturnBikeQuery } from "../redux/features/Rent/rentApi";
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
  // const [updatePaybillStatus] = usePayBillStatusMutation();
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
        bookingID: rentId,
      };
      const res = await createOrder(payload).unwrap();
      if (res.success) {
        window.location.href = res?.data?.payment_url;
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
      <div
        className={`w-full max-w-7xl ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row`}
      >
        {/* Left Section: User Information */}
        <div
          className={`flex-1 p-6 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label
                className={`block font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                className={`w-full border rounded-lg px-4 py-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-50"
                }`}
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
              <label
                className={`block font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                className={`w-full border rounded-lg px-4 py-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-50"
                }`}
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
              <label
                className={`block font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full border rounded-lg px-4 py-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-50"
                }`}
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
              <label
                className={`block font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className={`w-full border rounded-lg px-4 py-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-50"
                }`}
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
              <label
                className={`block font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Promo Code (Optional)
              </label>
              <input
                {...register("promoCode")}
                className={`w-full border rounded-lg px-4 py-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300"
                }`}
                placeholder="Enter promo code"
              />
              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full mt-4 ${
                  theme === "dark"
                    ? "bg-green-700 py-1 text-gray-200 hover:bg-gray-800 border-gray-600"
                    : "bg-primary py-1 text-slate-100 hover:bg-slate-300 border-gray-200"
                } border rounded-lg transition duration-300`}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Order Summary */}
        <div
          className={`w-full md:w-1/3 p-6 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {/* Order Items */}
          <div
            className={`p-4 rounded-lg shadow-sm ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between mb-2">
              <img
                src={rent?.data?.bikeId?.image}
                className="rounded-md w-full"
                alt="bike image"
              />
            </div>
            <div className="flex justify-between mb-2">
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Bike Name:
              </p>
              <p>{rent?.data?.bikeId.name}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Start Time:
              </p>
              <p>{new Date(rent?.data?.startTime).toLocaleString()}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Return Time:
              </p>
              <p>{new Date(rent?.data?.returnTime).toLocaleString()}</p>
            </div>

            {/* Price Calculation */}
            <div className="flex justify-between font-medium text-lg">
              <p>Total Price:</p>
              <p>{totalPrice} BDT</p>
            </div>
            {discount > 0 && (
              <>
                <div className="flex justify-between font-medium text-lg">
                  <p>Discount:</p>
                  <p>{(discount * 100).toFixed(0)}%</p>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <p>Final Price:</p>
                  <p>{finalPrice} BDT</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
