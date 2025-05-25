"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import LeaveForm from "@/components/pageComponents/LeaveForm";

const AddLeave: React.FC = () => {
  const additionalFields = <LeaveForm leave={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/leaves`}
      additionalFields={additionalFields}
      buttonText="Add Leave"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="employee-leave-list"
    />
  );
};

export default AddLeave;
