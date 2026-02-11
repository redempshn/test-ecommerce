const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto mt-13">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />

        {/* Content */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />

          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />

          <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
