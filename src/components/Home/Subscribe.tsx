import subscribeBackground from "../../assets/subscribe-backgrond-bike.jpg";

const Subscribe = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[400px] flex items-center justify-center mb-8"
      style={{ backgroundImage: `url(${subscribeBackground})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg mb-6">
          Get the latest updates, offers, and news about our bikes.
        </p>

        {/* Subscription Form */}
        <form
          className="flex flex-col md:flex-row items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            // Add form submission logic here
          }}
        >
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 w-full">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="py-3 px-4 rounded-md md:rounded-e-none w-full text-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-primary w-full md:w-auto rounded-md md:rounded-s-none transition text-white font-bold py-3 px-6"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
