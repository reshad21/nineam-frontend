import { useAppSelector } from "../../redux/hooks";
import SpinWheel from "../Ui/SpinWheel/SpinWheel";

const promotions = [
  {
    code: "SAVE10",
    description: "Get 10% off on your first bike rental. Use code at checkout.",
    expiration: "Expires on 31st August 2024",
  },
  {
    code: "SUMMER20",
    description: "Enjoy a 20% discount on all rentals this summer.",
    expiration: "Expires on 15th September 2024",
  },
  {
    code: "WEEKENDRIDE",
    description: "Weekend special! Save 15% on rentals from Friday to Sunday.",
    expiration: "Expires on 30th September 2024",
  },
  {
    code: "FALLSALE25",
    description:
      "Celebrate the fall season with a 25% discount on all rentals.",
    expiration: "Expires on 31st October 2024",
  },
];

const CouponsDiscounts = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <section
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "text-gray-900"
      }`}
    >
      <div className="">
        <div className="mb-5">
          <h2
            className={`${
              theme === "dark" ? "text-slate-300" : "text-primary"
            } text-3xl font-bold text-center`}
          >
            Exclusive Coupons & Discounts
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }text-md font-bold text-center`}
          >
            Make this journey enjoyable
          </p>
        </div>
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promotions Column */}
          <div className="space-y-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">
                    {index === 0
                      ? "💛"
                      : index === 1
                      ? "🌿"
                      : index === 2
                      ? "🌊"
                      : "🍂"}
                  </span>
                  <h3 className="text-2xl font-semibold">{promo.code}</h3>
                </div>
                <p className="mb-4">{promo.description}</p>
                <p className="text-sm">{promo.expiration}</p>
              </div>
            ))}
          </div>

          {/* Instructions Column */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h4 className="text-2xl font-semibold mb-4 text-primary">
              How to Apply a Coupon
            </h4>
            <p
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              To use a coupon, simply enter the code during checkout in the
              "Coupon Code" field, then click "Apply". Your discount will be
              automatically applied to your total.
            </p>
            <div className="mt-6 text-center">
              <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary transition duration-300">
                Get Started
              </button>
            </div>
            <div className="my-4">
              <SpinWheel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponsDiscounts;
