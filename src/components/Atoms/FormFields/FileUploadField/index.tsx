import { combineClass } from "@/helpers/development/combineClass";
import { useField } from "formik";
import React, { useState, useRef } from "react";

interface FileUploadFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hideErrorMessage?: boolean;
  // Kabul edilebilir ozellikler mesaji:
  acceptTypesMessage?: string;
  uploadMessage?: string;
  dropMessage?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  hideErrorMessage = false,
  uploadMessage,
  dropMessage,
  acceptTypesMessage,
  ...props
}) => {
  const [field, meta, setField] = useField(name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      setField.setTouched(true);
      setField.setValue(selectedFile);
      setFile(selectedFile);
      generatePreview(selectedFile);
    }
  };

  const generatePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // setField.setTouched(true);
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
    setField.setTouched(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setField.setTouched(true);
    if (event.dataTransfer.files.length) {
      const droppedFile = event.dataTransfer.files[0];
      setField.setValue(droppedFile);
      setFile(droppedFile);
      generatePreview(droppedFile);
    }
  };

  const handleRemoveFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setFile(null);
    setPreview(null);
    setField.setTouched(true);
    setField.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        className={combineClass(
          "relative z-0 cursor-pointer select-none rounded-md border text-center text-gray-400 transition-colors",
          {
            "!border-blue-500": isDragging,
            "border-dashed": !file,
            "border-red-500": meta.touched && meta.error,
          },
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={combineClass("relative flex cursor-pointer gap-2 p-3", {
            "justify-centers": !file,
            "p-2": file,
            "p-3": file && isDragging,
          })}
        >
          {file && !isDragging ? (
            <>
              <div className="flex w-full items-center gap-1 ltr:pr-7 rtl:pl-7">
                {preview ? (
                  <div className="h-8 w-8 flex-shrink-0 rounded-md border border-gray-200 p-0.5">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      className="h-8 w-6 fill-gray-600"
                    >
                      <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                    </svg>
                  </div>
                )}
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                  {file.name}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute right-2 top-[50%] z-[1] -translate-y-[50%] rtl:left-2 rtl:right-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-gray-400"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path>
                </svg>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-gray-600"
              >
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
              </svg>
              {isDragging ? dropMessage : uploadMessage}
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleFileChange}
            {...props}
          />
        </div>
      </div>
      {acceptTypesMessage && (
        <p className="mt-1 px-1 text-xs text-gray-500">{acceptTypesMessage}</p>
      )}
      {!hideErrorMessage && meta.touched && meta.error ? (
        <p className="ml-1 mt-0.5 text-xs text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};
