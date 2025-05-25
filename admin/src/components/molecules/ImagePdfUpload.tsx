import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadBox from "./FileUpload";
import Swal from "sweetalert2";

interface ImagePdfUploadProps {
  files?: File[];
  onFilesChangePdf?: (files: File[]) => void;
  isMultiple?: boolean;
  isFile?: boolean;
  imageLabel?: string;
  accept?: string;
  existingUrls?: string[];
  onRemoveUrl?: (index: number) => void;
}

const ImagePdfUpload: React.FC<ImagePdfUploadProps> = ({
  files = [],
  onFilesChangePdf,
  isMultiple,
  isFile,
  imageLabel,
  accept = "application/pdf",
  existingUrls = [],
  onRemoveUrl,
}) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  // Memoize previews to avoid unnecessary computations
  const newPreviews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  );

  useEffect(() => {
    // Combine existing URLs with new previews
    const combinedPreviews = [...existingUrls, ...newPreviews];

    // Update state only if previews have changed
    setFilePreviews((prev) => {
      if (
        prev.length !== combinedPreviews.length ||
        prev.some((url, i) => url !== combinedPreviews[i])
      ) {
        return combinedPreviews;
      }
      return prev;
    });

    // Cleanup: Revoke only the URLs created for new previews
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews, existingUrls]);

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onFilesChangePdf && e.target.files) {
      const fileList = Array.from(e.target.files);
      const fileArray = fileList.filter(
        (file) => file.type === "application/pdf"
      );
      if (fileArray.length !== fileList.length) {
        Swal.fire(
          "Error",
          "Only PDF files are allowed for documents.",
          "error"
        );
      }
      onFilesChangePdf([...files, ...fileArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (index < existingUrls.length) {
      onRemoveUrl?.(index);
    } else {
      if (onFilesChangePdf) {
        const updatedFiles = files.filter(
          (_, i) => i !== index - existingUrls.length
        );
        onFilesChangePdf(updatedFiles);
      }
    }
  };

  return (
    <div>
      <FileUploadBox
        onFileChange={handlePdfChange}
        isMultiple={isMultiple}
        isFile={isFile}
        imageLabel={imageLabel}
        accept={accept}
      />
      <div className="mt-12 flex flex-wrap">
        {filePreviews.map((preview, index) => (
          <div
            key={`${preview}-${index}`}
            className="mt-3 relative inline-block mx-5"
          >
            <iframe
              src={preview}
              title={`Preview ${index}`}
              style={{ width: "200px", height: "200px" }}
            />
            <ClearIcon
              onClick={() => handleRemoveFile(index)}
              className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePdfUpload;
