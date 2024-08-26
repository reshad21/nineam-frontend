const ContactInformation = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Office Address</h3>
            <p className="text-gray-700">123 Street Name</p>
            <p className="text-gray-700">City, State 12345</p>
          </div>

          {/* Phone Number */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Phone Number</h3>
            <p className="text-gray-700">+1 (123) 456-7890</p>
          </div>

          {/* Email Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Email</h3>
            <p className="text-gray-700">contact@yourcompany.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
