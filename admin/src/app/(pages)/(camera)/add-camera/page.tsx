"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import CameraForm from "@/components/pageComponents/CameraForm";

const AddCamera: React.FC = () => {
  const additionalFields = <CameraForm camera={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/cameras`}
      additionalFields={additionalFields}
      buttonText="Add Camera"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="camera-list"
      imageLabel="Size must be (1920*860)"
    />
  );
};

export default AddCamera;
