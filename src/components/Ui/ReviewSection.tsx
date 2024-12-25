/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetProductByIdQuery } from "../../redux/features/Bike/bikeApi";
import { useAddReviewsMutation } from "../../redux/features/review/reviewApi";
import { useGetSingleUserQuery } from "../../redux/features/User/userApi";
import { useAppSelector } from "../../redux/hooks";

type reviewData = {
  name: string;
  feedback: string;
  rating: number;
};

const ReviewSection = ({ id }: { id: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: profile,
    isLoading,
    error,
  } = useGetSingleUserQuery(user?.id, { skip: !user });
  const { data: bikeInfo } = useGetProductByIdQuery(id);
  //create review hook
  const [createReview] = useAddReviewsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!user) {
      alert("Please log in to add a review.");
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<reviewData>(); // Specify the generic type here

  const onSubmit = async (data: reviewData) => {
    const toastId = toast.loading("Creating bike...");

    try {
      const result = {
        userId: user?.id,
        bikeId: id,
        name: data.name,
        feedback: data.feedback,
        rating: parseInt(data.rating.toString(), 10),
      };
      // console.log("review data==>", result);
      const res = await createReview(result);
      if (res.error) {
        console.log(res.error);
      } else {
        toast.success("Review created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }

    closeModal();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error && user) return <p>Error loading user profile.</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 my-8">
      <div className="mb-5 flex justify-between items-center">
        <button
          onClick={openModal}
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-6"
        >
          Add Review
        </button>
        <span className="text-2xl font-semibold">
          {bikeInfo?.data?.reviews.length} Reviews
        </span>
      </div>

      {/* Display Reviews */}
      <div className="space-y-4">
        {bikeInfo?.data?.reviews.length > 0 &&
          bikeInfo?.data?.reviews.map((review: any) => {
            const filledStars = "★".repeat(review.rating);
            const emptyStars = "☆".repeat(5 - review.rating);
            return (
              <div
                key={review._id}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50"
              >
                <h4 className="font-bold text-lg">{review.name}</h4>
                <p className="text-yellow-500 mb-2">
                  {filledStars}
                  <span className="text-gray-300">{emptyStars}</span>
                </p>
                <p className="text-gray-700">{review.feedback}</p>
              </div>
            );
          })}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && profile?.data && (
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
      )}
    </div>
  );
};

export default ReviewSection;
