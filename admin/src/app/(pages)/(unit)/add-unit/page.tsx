"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import UnitForm from "@/components/pageComponents/UnitForm";

const AddUnit: React.FC = () => {
  const additionalFields = <UnitForm unit={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/units`}
      additionalFields={additionalFields}
      buttonText="Add Unit"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="unit-list"
    />
  );
};

export default AddUnit;
