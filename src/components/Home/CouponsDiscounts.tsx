const promotions = [
  {
    code: "SAVE10",
    description: "Get 10% off on your first bike rental. Use code at checkout.",
    expiration: "Expires on 31st August 2024",
    backgroundColor: "bg-yellow-200",
    textColor: "text-yellow-900",
  },
  {
    code: "SUMMER20",
    description: "Enjoy a 20% discount on all rentals this summer.",
    expiration: "Expires on 15th September 2024",
    backgroundColor: "bg-green-200",
    textColor: "text-green-900",
  },
  {
    code: "WEEKENDRIDE",
    description: "Weekend special! Save 15% on rentals from Friday to Sunday.",
    expiration: "Expires on 30th September 2024",
    backgroundColor: "bg-blue-200",
    textColor: "text-blue-900",
  },
];

const CouponsDiscounts = () => {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Exclusive Coupons & Discounts
        </h2>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promotions Column */}
          <div className="space-y-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${promo.backgroundColor} ${promo.textColor}`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">
                    {promo.textColor === "text-yellow-900"
                      ? "💛"
                      : promo.textColor === "text-green-900"
                      ? "🌿"
                      : "🌊"}
                  </span>
                  <h3 className="text-2xl font-semibold">{promo.code}</h3>
                </div>
                <p className="mb-4">{promo.description}</p>
                <p className="text-sm">{promo.expiration}</p>
              </div>
            ))}
          </div>

          {/* Instructions Column */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold mb-4 text-blue-600">
              How to Apply a Coupon
            </h4>
            <p className="text-gray-700">
              To use a coupon, simply enter the code during checkout in the
              "Coupon Code" field, then click "Apply". Your discount will be
              automatically applied to your total.
            </p>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponsDiscounts;
