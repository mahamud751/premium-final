"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import ExpenseHeadForm from "@/components/pageComponents/ExpenseHeadForm";

const AddExpenseHead: React.FC = () => {
  const additionalFields = <ExpenseHeadForm expenseHead={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/expense-heads`}
      additionalFields={additionalFields}
      buttonText="Add Expense Head"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="expense-head-list"
    />
  );
};

export default AddExpenseHead;
