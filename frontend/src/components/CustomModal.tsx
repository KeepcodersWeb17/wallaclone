import { useRef } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

interface Props extends React.ComponentProps<"dialog"> {
  onConfirm: () => void;
  buttonText: string;
  modalText1: string;
  modalText2: string;
  error?: string | null;
  isLoading: boolean | null;
  clearError: () => void;
}

export const CustomModal = ({
  onConfirm,
  buttonText,
  modalText1,
  modalText2,
  error,
  isLoading,
  clearError
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };
  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm();
    // handleCloseModal()
  };

  const handleCancel = () => {
    clearError();
    handleCloseModal();
  };
  return (
    <>
      <button
        className="block w-fit cursor-pointer rounded-2xl border-2 bg-zinc-800 px-3 py-1 font-bold text-zinc-200 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-200 hover:text-zinc-800"
        onClick={handleOpenModal}
      >
        {buttonText}
      </button>
      <dialog
        ref={dialogRef}
        className="mx-auto mt-85 rounded-xl bg-zinc-700 px-10 py-6 text-zinc-200 sm:min-w-sm"
      >
        <form method="dialog">
          {error && (
            <span className="mb-3 block font-semibold text-red-500">
              {error}
            </span>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-900">
              <LoadingSpinner />
            </div>
          )}
          <p className="text-center">
            {modalText1}{" "}
            <span className="font-semibold text-red-500">{modalText2}</span>.
          </p>
          <p className="mb-12 text-center">ARE YOU SURE?</p>
          <div className="flex items-center justify-between">
            <button
              disabled={!!error}
              type="button"
              onClick={handleConfirm}
              className="block w-fit cursor-pointer rounded-2xl border-2 bg-zinc-800 px-3 py-1 font-bold text-zinc-200 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-200 hover:text-zinc-800 disabled:pointer-events-none disabled:bg-red-400"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="block w-fit cursor-pointer rounded-2xl border-2 bg-zinc-200 px-3 py-1 font-bold text-zinc-800 uppercase transition-all duration-500 ease-in-out hover:scale-110 hover:bg-zinc-800 hover:text-zinc-200"
            >
              Dismiss
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
