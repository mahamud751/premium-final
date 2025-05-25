"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import CustomerForm from "@/components/pageComponents/CustomerForm";

const AddCustomer: React.FC = () => {
  const additionalFields = <CustomerForm customer={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/customers`}
      additionalFields={additionalFields}
      buttonText="Add Customer"
      id=""
      //@ts-ignore
      photosData={[]}
      isNoPhotoFile={true}
      link="customer-list"
    />
  );
};

export default AddCustomer;
