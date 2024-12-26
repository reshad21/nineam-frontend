const BikeCardSkeleton = () => {
  return (
    <div className="skeleton-card w-full max-w-sm mx-auto relative rounded-lg shadow-xl overflow-hidden border bg-gray-200">
      {/* Skeleton for the availability badge */}
      <div className="absolute z-40 top-2 left-2 p-1 rounded-full bg-gray-300 w-24 h-6"></div>

      {/* Skeleton for the image */}
      <div className="skeleton-image w-full h-44 bg-gray-300"></div>

      {/* Skeleton for the year */}
      <div className="absolute top-0 right-2 p-2 w-16 h-6 bg-gray-300 rounded-sm"></div>

      <div className="p-3">
        {/* Skeleton for bike name and cc */}
        <div className="skeleton-text w-3/4 h-6 bg-gray-300 mb-2"></div>
        <div className="skeleton-text w-1/2 h-5 bg-gray-300 mb-4"></div>

        {/* Skeleton for price per hour */}
        <div className="flex justify-between my-4">
          <div className="skeleton-text w-2/4 h-5 bg-gray-300"></div>
          <div className="skeleton-text w-1/4 h-5 bg-gray-300"></div>
        </div>

        {/* Skeleton for the buttons */}
        <div className="flex justify-between gap-3">
          <div className="skeleton-button w-32 h-10 bg-gray-300 rounded-lg"></div>
          <div className="skeleton-button w-32 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BikeCardSkeleton;
