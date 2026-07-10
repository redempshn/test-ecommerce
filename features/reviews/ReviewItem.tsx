"use client";

const ReviewItem = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col border-b border-gray-200">
        <p className="text-base mb-3">
          body of review Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Expedita nulla unde aperiam quasi, fugit neque minima
          cupiditate, laudantium ipsum quas enim inventore aliquam et
          reiciendis, voluptatibus odit vero corrupti numquam sequi? Tempora ab
          laudantium, tenetur totam aspernatur, repudiandae iure vel sit
          perferendis soluta repellendus rerum dolore ducimus vitae a fuga?
        </p>

        <span className="text-base font-bold">User Name</span>
        <div className="mb-3">rating</div>

        <div className="text-sm mb-3">11.02.2026</div>
      </div>

      <div className="w-full flex flex-col border-b border-gray-200">
        <p className="text-base mb-3">body of review</p>

        <span className="text-base font-bold">User Name</span>
        <div className="mb-3">rating</div>

        <div className="text-sm mb-3">11.02.2026</div>
      </div>

      <div className="w-full flex flex-col border-b border-gray-200">
        <p className="text-base mb-3">body of review</p>

        <span className="text-base font-bold">User Name</span>
        <div className="mb-3">rating</div>

        <div className="text-sm mb-3">11.02.2026</div>
      </div>
    </div>
  );
};

export default ReviewItem;
