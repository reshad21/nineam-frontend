import kuakataData from "./../data/kuakata.json"; // Assuming the JSON is imported as kuakataData

const TourismPage = () => {
  const {
    destination,
    location,
    description,
    highlights,
    activities,
    bestTimeToVisit,
    howToGetThere,
    contact,
  } = kuakataData;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-primary text-center mb-6">
        {destination}
      </h1>
      <p className="text-lg text-secondary text-center mb-6">{location}</p>
      <p className="text-md text-justify mb-8 text-gray-700">{description}</p>

      <h2 className="text-3xl font-semibold text-primary mb-4">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          >
            <img
              src={highlight.image}
              alt={highlight.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-secondary">
                {highlight.name}
              </h3>
              <p className="text-sm text-gray-600">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-primary mb-4">Activities</h2>
      <ul className="list-disc pl-5 mb-8">
        {activities.map((activity, index) => (
          <li key={index} className="text-lg text-gray-700">
            {activity}
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-primary mb-4">
        Best Time to Visit
      </h2>
      <p className="text-lg text-gray-700 mb-8">{bestTimeToVisit}</p>

      <h2 className="text-3xl font-semibold text-primary mb-4">
        How to Get There
      </h2>
      <ul className="list-decimal pl-5 mb-8">
        {howToGetThere.map((method, index) => (
          <li key={index} className="text-lg text-gray-700">
            {method}
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-primary mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700">
        Email:{" "}
        <a
          href={`mailto:${contact.email}`}
          className="text-primary hover:underline"
        >
          {contact.email}
        </a>
        <br />
        Phone:{" "}
        <a
          href={`tel:${contact.phone}`}
          className="text-primary hover:underline"
        >
          {contact.phone}
        </a>
      </p>
    </div>
  );
};

export default TourismPage;
