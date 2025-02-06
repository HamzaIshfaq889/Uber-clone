import { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadImage = ({ setImageFiles, files }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImageFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="p-10 border border-dashed border-slate-400 mb-10"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
      <div className="flex gap-4">
        {files?.length > 0 &&
          files?.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)} // Create URL for each image
                alt={file?.name}
                className="w-50 h-50 object-cover"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default UploadImage;
