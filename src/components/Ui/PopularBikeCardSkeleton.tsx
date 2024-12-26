const PopularBikeCardSkeleton = () => {
  return (
    <div className="relative h-64 bg-cover bg-center rounded-lg shadow-xl overflow-hidden w-full mx-auto">
      {/* Skeleton for the image */}
      <div className="skeleton-image absolute inset-0 bg-gray-300"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-55 flex flex-col justify-between p-4 text-white">
        {/* Top Section: Skeleton for availability */}
        <div className="flex justify-between items-start">
          <div className="skeleton-button w-24 h-6 bg-gray-400 rounded-full"></div>
        </div>

        {/* Middle Section: Skeleton for the name, year, and price */}
        <div className="pt-9">
          <div className="skeleton-text w-3/4 h-6 bg-gray-400 rounded mb-2"></div>
          <div className="skeleton-text w-1/2 h-5 bg-gray-400 rounded mb-2"></div>
          <div className="skeleton-text w-1/2 h-5 bg-gray-400 rounded"></div>
        </div>

        {/* Bottom Section: Skeleton for buttons */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="skeleton-button w-full h-10 bg-gray-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default PopularBikeCardSkeleton;
