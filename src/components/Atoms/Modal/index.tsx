import {
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  hasCancelAbortAlert?: boolean;
  alertMessage?: string;
  abortAlertButtonText?: string;
  continueAlertButtonText?: string;
  paddingY?: string;
};

const modalStack: { close: () => void; id: string }[] = [];

export const Modal: React.FC<ModalProps> = ({
  isOpenModal,
  setIsOpenModal,
  children,
  onOpen,
  onClose,
  hasCancelAbortAlert = false,
  alertMessage = "Are you sure you want to cancel?",
  abortAlertButtonText = "Abort",
  continueAlertButtonText = "Continue",
  paddingY,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const modalId = Math.random().toString(36).substr(2, 9); // Unique id for each modal

  useEffect(() => {
    if (isOpenModal) {
      // Push new modal with unique id into the stack
      modalStack.push({ close: () => setIsOpenModal(false), id: modalId });
      toggleOverflowHiddenClassToBody();
      onOpen?.();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showAlert) {
          setShowAlert(false);
        } else if (hasCancelAbortAlert) {
          setShowAlert(true);
        } else {
          // Only close the topmost modal from stack
          const topModal = modalStack[modalStack.length - 1];
          if (topModal && topModal.id === modalId) {
            topModal.close();
            onClose?.();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpenModal,
    setIsOpenModal,
    onOpen,
    onClose,
    showAlert,
    hasCancelAbortAlert,
    modalId,
  ]);

  const toggleOverflowHiddenClassToBody = () => {
    document.querySelector("body")?.classList.toggle("overflow-hidden");
  };

  const handleClose = () => {
    if (hasCancelAbortAlert) {
      setShowAlert(true); // Eğer hasCancelAbortAlert varsa, alert açılır
    } else {
      // Close current modal and remove it from stack
      const index = modalStack.findIndex((modal) => modal.id === modalId);
      if (index !== -1) {
        modalStack.splice(index, 1);
      }
      setIsOpenModal(false);
      onClose?.();
      toggleOverflowHiddenClassToBody();
    }
  };

  const handleAbort = () => {
    setShowAlert(false);
    setIsOpenModal(false);
    onClose?.();
    toggleOverflowHiddenClassToBody();
  };

  const handleContinue = () => {
    setShowAlert(false);
  };

  if (!isOpenModal) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[1050] overflow-hidden overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 backdrop-blur-md">
      <div
        className="relative h-full w-auto translate-x-0 translate-y-0 transform pt-28 transition-all duration-300 ease-out"
        style={{ paddingTop: paddingY ? paddingY.toString() : "" }}
      >
        <div className="pointer-events-auto relative flex h-full w-full flex-col bg-clip-padding">
          <div className="relative m-auto">
            <div>
              <button
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-70 text-gray-800 backdrop-blur-sm hover:bg-opacity-90"
                onClick={handleClose}
              >
                <div className="w-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 -960 960 960"
                    width="100%"
                    className="fill-gray-400"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
              </button>
              {showAlert && (
                <div className="absolute right-5 top-3 mt-2 w-[70%] max-w-[300px] rounded-md bg-black bg-opacity-80 p-5 pt-8 text-sm text-gray-200 backdrop-blur-sm">
                  <button
                    className="bg-bl absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-30 backdrop-blur-md hover:bg-opacity-60"
                    onClick={() => setShowAlert(false)}
                  >
                    <div className="w-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100%"
                        viewBox="0 -960 960 960"
                        width="100%"
                        className="fill-gray-400"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </div>
                  </button>
                  <p>{alertMessage}</p>
                  <div className="mt-2 flex gap-4">
                    <button
                      className="underline underline-offset-2"
                      onClick={handleContinue}
                    >
                      {continueAlertButtonText}
                    </button>
                    <button
                      className="text-red-500 opacity-70"
                      onClick={handleAbort}
                    >
                      {abortAlertButtonText}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div
              className="mb-28"
              style={{ marginBottom: paddingY ? paddingY.toString() : "" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
