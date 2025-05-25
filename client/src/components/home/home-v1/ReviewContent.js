"use client";
import Pagination from "@/components/common/Pagination";
import ReviewCard from "./ReviewCard";

const ReviewContent = ({ reviews = [], meta = {}, onPageChange }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Clients Say
        </h2>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No reviews available.</p>
        )}
        {reviews?.length > 0 && (
          <Pagination meta={meta} onPageChange={onPageChange} />
        )}
      </div>
    </section>
  );
};

export default ReviewContent;
