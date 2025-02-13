import { Dispatch, SetStateAction, ReactNode } from "react";

type ModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpenModal,
  setIsOpenModal,
  children,
}) => {
  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-fade-in relative flex h-full w-full transform items-center justify-center rounded-lg transition-transform">
        <button
          className="absolute right-5 top-5 text-gray-200"
          onClick={() => setIsOpenModal(false)}
        >
          Close Modal
        </button>
        {children}
      </div>
    </div>
  );
};
