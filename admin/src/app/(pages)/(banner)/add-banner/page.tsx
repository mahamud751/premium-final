"use client";
import React from "react";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";

const AddBanner: React.FC = () => {
  const additionalFields = <BannerForm banner={null} />;
  const photosData = {
    image: [],
  };

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/banners`}
      additionalFields={additionalFields}
      buttonText="Add Banner"
      id=""
      photosData={photosData}
      imageFields={[
        {
          key: "image",
          isMultiple: false,
          label: "Size must be (1920*860)",
          isArray: false,
        },
      ]}
      link="banner-list"
      imageLabel="Size must be (1920*860)"
    />
  );
};

export default AddBanner;
