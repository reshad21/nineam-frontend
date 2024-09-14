import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
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
  const customer = useAppSelector((state) => state.auth);

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
  if (!rent.data) return <div>No Rent data available.</div>;

  const totalPrice = 2500; // Base total price
  const promoCode = watch("promoCode"); // Watch for promo code changes
  const discount = promoCode === "PROMO20" ? 0.2 * totalPrice : 0; // 20% discount if promo code is "PROMO20"
  const finalPrice = totalPrice - discount; // Final price after discount

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    console.log("Discount Applied:", discount);
    console.log("Final Price:", finalPrice);
    // Handle form submission here
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center py-10 px-4">
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

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Method
              </h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="stripe"
                    {...register("paymentMethod")}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">
                    Credit/Debit Card (Stripe)
                  </span>
                </label>
              </div>
              {errors.paymentMethod && (
                <span className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
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
                <span>BDT {discount.toFixed(2)}</span>
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
