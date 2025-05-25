"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import BrandForm from "@/components/pageComponents/BrandForm";

const AddBrand: React.FC = () => {
  const photosData = {
    image: [],
  };
  const additionalFields = <BrandForm brand={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/brand-logos`}
      additionalFields={additionalFields}
      buttonText="Add Brand"
      id=""
      photosData={photosData}
      imageFields={[
        {
          key: "image",
          isMultiple: false,
          label: "Size must be (64*64)",
          isArray: false,
        },
      ]}
      link="brand-list"
    />
  );
};

export default AddBrand;
