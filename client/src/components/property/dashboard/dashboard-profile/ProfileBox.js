"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState } from "react";
import Image from "next/image";

const ProfileBox = ({ onImageChange, uploadedImage, apiImage }) => {
  const [localUploadedImage, setLocalUploadedImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalUploadedImage(e.target.result);
        onImageChange(file); // Pass the file to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine which image to display with fallbacks
  const getDisplayImage = () => {
    if (localUploadedImage) return localUploadedImage;
    if (uploadedImage) return URL.createObjectURL(uploadedImage);
    if (apiImage && typeof apiImage === "string" && apiImage.startsWith("http"))
      return apiImage;
    return "/images/listings/profile-1.jpg";
  };

  const displayImage = getDisplayImage();

  return (
    <div className="profile-box position-relative d-md-flex align-items-end mb50">
      <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
        <Image
          width={240}
          height={220}
          className="w-100 cover h-100"
          src={displayImage}
          alt="profile avatar"
          onError={(e) => {
            e.target.src = "/images/listings/profile-1.jpg";
          }}
        />

        {displayImage !== "/images/listings/profile-1.jpg" && (
          <button
            className="tag-del"
            style={{ border: "none" }}
            data-tooltip-id="profile_del"
            onClick={() => {
              setLocalUploadedImage(null);
              onImageChange(null); // Clear the image
            }}
          >
            <span className="fas fa-trash-can" />
          </button>
        )}

        <ReactTooltip id="profile_del" place="right" content="Delete Image" />
      </div>

      <div className="profile-content ml30 ml0-sm">
        <label className="upload-label pointer">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <div className="ud-btn btn-white2 mb30">
            Upload Profile Files
            <i className="fal fa-arrow-right-long" />
          </div>
        </label>
        <p className="text">
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
