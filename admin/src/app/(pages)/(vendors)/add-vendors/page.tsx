"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import VendorForm from "@/components/pageComponents/VendorForm";

const AddVendors: React.FC = () => {
  const additionalFields = <VendorForm vendor={null} />;
  const photosData = {
    image: [],
  };
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/vendors`}
      additionalFields={additionalFields}
      buttonText="Add Vendor"
      id=""
      photosData={photosData}
      link="vendors-list"
      imageFields={[
        {
          key: "image",
          isMultiple: false,
          label: "Size must be (960*960)",
          isArray: false,
        },
      ]}
    />
  );
};

export default AddVendors;
