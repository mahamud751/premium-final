"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import AdditionalSalaryForm from "@/components/pageComponents/AdditionalSalaryForm";

const AddAdditionalSalary: React.FC = () => {
  const [selectUser, setSelectUser] = useState<string>("");
  const additionalFields = (
    <AdditionalSalaryForm
      data={null}
      selectUser={selectUser}
      setSelectUser={setSelectUser}
    />
  );
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/additional-salaries`}
      additionalFields={additionalFields}
      buttonText="Add Additional Salary"
      id=""
      isNoPhotoFile={true}
      link="additional-salary-list"
    />
  );
};

export default AddAdditionalSalary;
