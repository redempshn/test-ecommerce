"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import ReviewItem from "./ReviewItem";
import { openReviewModal } from "@/shared/lib/redux/ui/uiSlice";

const Reviews = () => {
  const dispatch = useAppDispatch();

  //   const reviews = [];

  //   const updateParams = (key: string, value: string) => {
  //     const params = new URLSearchParams(searchParams);

  //     if (value) {
  //       params.set(key, value);
  //     } else {
  //       params.delete(key);
  //     }

  //     if (key !== "page") {
  //       params.set("page", "1");
  //     }

  //     router.push(`/admin/products?${params.toString()}`);
  //   };

  return (
    <div className="w-full rounded-2xl bg-white mt-5 p-3">
      <h3 className="text-xl text-black mb-5">Reviews</h3>

      <div className="w-full flex gap-5">
        <div className="w-1/5">
          <button
            onClick={() => dispatch(openReviewModal())}
            className="w-full cursor-pointer border border-blue-500 py-2 px-4 rounded text-base text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white transition"
          >
            Add review
          </button>
        </div>
        <div className="w-4/5">
          {/* {reviews.map(review) => {(
            <ReviewItem 
        )}} */}
          <ReviewItem />

          {/* Пагинация */}
          {/* {pagination && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-700">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateParams("page", (page - 1).toString())}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => updateParams("page", pageNum.toString())}
                      className={`cursor-pointer px-4 py-2 border rounded-lg ${
                        pageNum === page
                          ? "bg-blue-500 text-white"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => updateParams("page", (page + 1).toString())}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
