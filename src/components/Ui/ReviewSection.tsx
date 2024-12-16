import { useState } from "react";
import { useGetSingleUserQuery } from "../../redux/features/User/userApi";
import { useAppSelector } from "../../redux/hooks";

const ReviewSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user profile.</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 my-8">
      <div className="mb-5 flex justify-between items-center">
        <button
          onClick={openModal}
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-6"
        >
          Add Review
        </button>
        <span className="text-2xl font-semibold">5 Reviews</span>
      </div>

      {/* Display Reviews */}
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-gray-50"
          >
            <h4 className="font-bold text-lg">John Doe</h4>
            <p className="text-yellow-500 mb-2">★★★★☆</p>
            <p className="text-gray-700">
              Great bike, had an amazing ride! Highly recommend.
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && profile?.data ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4">Add a Review</h4>
            <form className="">
              <label htmlFor="" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="" className="font-semibold">
                Rating:
              </label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="" className="font-semibold">
                Feedback:
              </label>
              <textarea
                placeholder="Your Review"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">
          Please log in to add a review.
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
