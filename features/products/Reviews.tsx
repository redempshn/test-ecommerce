import { Product } from "@/shared/types/product";
import ReviewCard from "./ReviewCard";

interface ReviewsProps {
  product: Product;
}

const Reviews = ({ product }: ReviewsProps) => {
  const { reviews } = product;

  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-lg text-center mb-4">Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
