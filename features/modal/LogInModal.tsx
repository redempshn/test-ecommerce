"use client";

import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { closeLoginModal } from "@/shared/lib/redux/ui/uiSlice";
import Modal from "@/shared/ui/Modal";
import SignInForm from "@/shared/ui/SignInForm";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isLoginModalOpen);

  const handleClose = () => {
    dispatch(closeLoginModal());
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

        <SignInForm />
      </div>
    </Modal>
  );
};
export default LoginModal;
