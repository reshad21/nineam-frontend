const TeamSection = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "Founder & CEO",
      bio: "John is the visionary behind [Your Company], with a passion for sustainability and biking.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
    {
      name: "Jane Smith",
      position: "Chief Marketing Officer",
      bio: "Jane leads our marketing efforts with over 10 years of experience in the industry.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
    {
      name: "Mike Johnson",
      position: "Head of Operations",
      bio: "Mike ensures everything runs smoothly, from bike rentals to customer service.",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg", // Replace with actual image path
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-primary font-semibold">{member.position}</p>
              <p className="text-gray-600 mt-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
