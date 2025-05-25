"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import DepartmentForm from "@/components/pageComponents/DepartmentForm";

const AddDepartment: React.FC = () => {
  const additionalFields = <DepartmentForm department={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/departments`}
      additionalFields={additionalFields}
      buttonText="Add Department"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="department-list"
    />
  );
};

export default AddDepartment;
