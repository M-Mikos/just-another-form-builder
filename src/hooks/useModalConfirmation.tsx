// Functions & hooks
import { useState } from "react";

// TS Interfaces declaration
interface ReturnedObjectType {
  confirmationModalElement: JSX.Element;
  isConfirmationModal: boolean;
  toggleConfirmationModal: () => void;
}

// Components
import Modal from "../components/UI/Modal";

const useModalConfirmation = (
  callback: Function,
  message: string,
  details: string
): ReturnedObjectType => {
  const [isConfirmationModal, setIsConfirmationModal] =
    useState<boolean>(false);

  const toggleConfirmationModal = (): void => {
    setIsConfirmationModal((state: boolean): boolean => {
      return !state;
    });
  };

  const confirmHandler = (): void => {
    toggleConfirmationModal();
    callback();
  };

  const confirmationModalElement: JSX.Element = (
    <Modal toggleModal={toggleConfirmationModal}>
      <div className="-mt-6 flex w-80 flex-col gap-6">
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-4xl">error</span>
          <div>
            <h3 className="line text-lg leading-10">{message}</h3>
            <span className="text-sm text-stone-500">{details}</span>
            <div className="mt-3 flex gap-3">
              <button
                className="btn--strong px-4 py-2 text-sm"
                onClick={confirmHandler}
              >
                Confirm
              </button>
              <button
                className="btn--strong color-sky-500 border-2 border-sky-700 bg-white px-4 py-2 text-sm text-sky-700 hover:text-white"
                onClick={toggleConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
  return {
    confirmationModalElement,
    isConfirmationModal,
    toggleConfirmationModal,
  };
};

export default useModalConfirmation;
