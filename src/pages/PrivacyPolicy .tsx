import { useAppSelector } from "../redux/hooks";

const PrivacyPolicy = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  return (
    <div
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to our Privacy Policy page! Your privacy is critically
          important to us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          We collect various types of information in connection with the
          services we provide. This includes:
          <ul className="list-disc pl-5">
            <li>
              Personal identification information (Name, email address, phone
              number, etc.)
            </li>
            <li>Transaction data and purchase history</li>
            <li>Usage data and preferences</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect in various ways, including:
          <ul className="list-disc pl-5">
            <li>Providing, operating, and maintaining our website</li>
            <li>Improving and personalizing user experience</li>
            <li>Processing transactions and sending purchase confirmations</li>
            <li>Sending promotional communications</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Sharing Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          We do not sell or rent your personal information to third parties.
          However, we may share your information with third-party service
          providers who help us operate our website and conduct business.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Data Protection Rights
        </h2>
        <p className="text-gray-600 mb-4">
          Depending on your location, you may have rights under data protection
          laws, including the right to access, update, or delete your personal
          data.
        </p>

        <p className="text-gray-600">
          If you have any questions about our Privacy Policy, please{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
