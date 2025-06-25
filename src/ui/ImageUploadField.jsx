import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import Upload from "@/assets/icons/Upload";
import ErrorText from "@/ui/ErrorText";

const ImageUploadField = ({ onFileChange, fileType, existingFile }) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingFile || null); // Initialize with existing file if provided
  const [error, setError] = useState();
  const fileInput = useRef();

  const allowedExtensions =
    fileType === "video"
      ? [".mp4", ".mkv", ".mov", ".webm"]
      : [".jpg", ".jpeg", ".png", ".gif"];

  const isValidFile = (file) => {
    return allowedExtensions.some((extension) =>
      file?.name.toLowerCase().endsWith(extension),
    );
  };

  useEffect(() => {
    // Update preview when existingFile changes
    setPreview(existingFile || null);
  }, [existingFile]);
  const onFileChangeHandler = () => {
    const file = fileInput.current?.files?.[0];
    checkIsValidFile(file);
  };

  const onFileSelect = () => {
    fileInput.current.click();
  };
  const removeFile = () => {
    setSelectedFile(null);
    setMessage("");
    setPreview(null);
    setError(null);
    onFileChange(null); // Clear the file in the parent
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    checkIsValidFile(file);
  };

  const close = () => {
    setSelectedFile(null);
    setError("");
    setMessage("");
  };

  const checkIsValidFile = (file) => {
    if (isValidFile(file)) {
      setSelectedFile(file);
      setMessage("");
      setPreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
      onFileChange(file); // Pass the file to the parent component
    } else {
      setSelectedFile(null);
      onFileChange(null); // Clear the file in the parent
      setPreview(null);
      setMessage(
        `Unsupported file type. Allowed types: ${allowedExtensions.join(", ")}`,
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="pb-5">
        {!preview ? (
          <div
            className="flex flex-col items-center justify-center h-64 w-full border-2 border-dashed border-black text-center cursor-pointer relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={onFileSelect}
          >
            <input
              ref={fileInput}
              type="file"
              onChange={onFileChangeHandler}
              style={{ display: "none" }}
            />
            <Upload className="transform scale-y-[-1] w-12 h-14" />
            <p className="text-center font-normal text-sm leading-[16.8px] my-5">
              Drag and drop the file here or click button
            </p>
            <Button className="text-sm font-normal leading-[16.8px] flex items-center rounded-md cursor-pointer">
              Choose File
            </Button>
            {message && <p className="mt-5 text-red-500">{message}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {fileType === "video" ? (
              <video
                className="h-64 w-full rounded-lg object-cover"
                controls
                loop
                autoPlay
                muted
                src={preview}
              />
            ) : (
              <img
                className="h-64 w-full rounded-lg object-cover"
                alt="Preview"
                src={preview}
              />
            )}
            <div className="flex justify-between items-center mt-2">
              <span>{selectedFile?.name || "Existing File"}</span>
              <button
                className="cursor-pointer bg-transparent"
                onClick={removeFile}
              >
                <TrashIcon className="w-[18px]" />
              </button>
            </div>
          </div>
        )}
      </div>
      <ErrorText text={error} />
    </div>
  );
};

export default ImageUploadField;
