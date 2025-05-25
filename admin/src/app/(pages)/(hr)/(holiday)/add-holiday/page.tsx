"use client";
import React, { useState } from "react";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";
import HolidayForm from "@/components/pageComponents/HolidayForm";

const AddHoliday: React.FC = () => {
  const additionalFields = <HolidayForm holiday={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/holidays`}
      additionalFields={additionalFields}
      buttonText="Add Holiday"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="holiday-list"
    />
  );
};

export default AddHoliday;
