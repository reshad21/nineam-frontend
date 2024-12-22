import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetSingleUserQuery } from "../../redux/features/User/userApi";
import { useAppSelector } from "../../redux/hooks";

type reviewData = {
  name: string;
  feedback: string;
  rating: number;
};

const ReviewSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading, error } = useGetSingleUserQuery(user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: reviewData) => {
    console.log("Form Data:", data);
    closeModal();
  };

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
            <h4 className="text-xl font-semibold mb-4 text-center text-slate-800">
              Add Your Feedback
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="font-semibold text-slate-700">
                  Name:
                </label>
                <input
                  type="text"
                  defaultValue={profile?.data.name}
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="font-semibold text-slate-700"
                >
                  Rating:
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("rating", { required: "Rating is required" })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.rating && (
                  <p className="text-red-500">{errors.rating.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="font-semibold text-slate-700"
                >
                  Feedback:
                </label>
                <textarea
                  {...register("feedback", {
                    required: "Feedback is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.feedback && (
                  <p className="text-red-500">{errors.feedback.message}</p>
                )}
              </div>
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
