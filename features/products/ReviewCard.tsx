import { Review } from "@/shared/types/product";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white p-4 border border-gray-100 rounded-2xl mb-4 last:mb-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 font-semibold">
            {review.reviewerName.charAt(0)}
          </span>
        </div>

        <div>
          <p className="font-medium text-gray-900">{review.reviewerName}</p>
          <time className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
