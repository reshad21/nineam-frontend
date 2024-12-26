import { useAppSelector } from "../redux/hooks";

const TermsOfService = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  return (
    <div
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to our Terms of Service. Please read these terms carefully
          before using our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By accessing or using our website, you agree to comply with and be
          bound by these Terms of Service. If you do not agree, you should not
          use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          User Responsibilities
        </h2>
        <p className="text-gray-600 mb-4">
          As a user of our site, you agree to:
          <ul className="list-disc pl-5">
            <li>Provide accurate and current information</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Refrain from unauthorized use of our services</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Account Registration
        </h2>
        <p className="text-gray-600 mb-4">
          In order to use certain features of our site, you may be required to
          register an account. You are responsible for maintaining the
          confidentiality of your account information and for all activities
          that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Termination
        </h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to terminate your access to our site at any time,
          without notice, for conduct that we believe violates these Terms of
          Service or is harmful to other users of the site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Changes to Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We may update these Terms of Service from time to time. If we make
          significant changes, we will notify you via email or by posting a
          notice on our website.
        </p>

        <p className="text-gray-600">
          If you have any questions about these terms, please{" "}
          <a href="/contact" className="text-blue-500 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
