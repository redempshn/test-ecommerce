const Skeleton = () => {
  return (
    <ul className="max-w-7xl mx-auto h-full grid grid-cols-4 gap-4 self-start mb-5">
      {Array.from({ length: 8 }).map((_, index) => {
        return (
          <li key={index} className="rounded-xl mt-4 space-y-4">
            {/* Image */}
            <div className="h-48 w-full rounded-lg bg-gray-100 animate-pulse" />

            {/* Title */}
            <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />

            {/* Description */}
            <div className="h-3 w-full rounded bg-gray-100 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-gray-100 animate-pulse" />

            {/* Price */}
            <div className="h-5 w-1/3 rounded bg-gray-100 animate-pulse" />

            {/* Button */}
            <div className="h-9 w-full rounded-lg bg-gray-100 animate-pulse" />
          </li>
        );
      })}
    </ul>
  );
};

export default Skeleton;
