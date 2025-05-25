"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import DesignationForm from "@/components/pageComponents/DesignationForm";

const AddDesignations: React.FC = () => {
  const additionalFields = <DesignationForm designation={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/designations`}
      additionalFields={additionalFields}
      buttonText="Add Designation"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="designation-list"
    />
  );
};

export default AddDesignations;
