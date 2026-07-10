"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { closeReviewModal } from "@/shared/lib/redux/ui/uiSlice";
import Modal from "@/shared/ui/Modal";
import { IoClose } from "react-icons/io5";
import ReviewModalContent from "../reviews/ReviewModalContent";

const ReviewModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isReviewModalOpen);

  const handleClose = () => {
    dispatch(closeReviewModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-xl">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        <button
          className="cursor-pointer absolute top-3 right-3 z-10"
          onClick={handleClose}
        >
          <IoClose size={22} />
        </button>

        <h3 className="text-xl p-4">Add your review</h3>

        <ReviewModalContent />
      </div>
    </Modal>
  );
};
export default ReviewModal;
