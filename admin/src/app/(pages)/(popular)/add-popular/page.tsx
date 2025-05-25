"use client";
import React from "react";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";
import PopularForm from "@/components/pageComponents/PopularForm";

const AddPopular: React.FC = () => {
  const additionalFields = <PopularForm popular={null} />;
  const photosData = {
    image: [],
  };

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/popular-projects`}
      additionalFields={additionalFields}
      buttonText="Add Popular Project"
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
      link="popular-list"
      imageLabel="Size must be (1920*860)"
    />
  );
};

export default AddPopular;
