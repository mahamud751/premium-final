import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import FileUploadBox from "./FileUpload";

interface MultipleImageUploadProps {
  photosData: string[];
  onImagesChange: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  isMultiple: boolean;
  imageLabel?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  photosData,
  onImagesChange,
  onRemoveImage,
  isMultiple,
  imageLabel,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onImagesChange(files);
    }
  };

  return (
    <div>
      <FileUploadBox
        onFileChange={handleImageChange}
        isMultiple={isMultiple}
        isFile={true}
        imageLabel={imageLabel}
        accept="image/*"
      />
      <div className="mt-12 d-flex flex-wrap">
        {photosData.map((preview, index) => (
          <div key={index} className="mt-3 relative inline-block mx-5">
            <Image
              src={preview}
              alt={`Preview ${index}`}
              width={200}
              height={200}
              style={{ width: "100%", height: "120px" }}
            />
            <ClearIcon
              onClick={() => onRemoveImage(index)}
              className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
