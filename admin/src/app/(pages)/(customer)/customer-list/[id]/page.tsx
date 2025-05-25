"use client";

import React, { useState, useEffect } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, CustomerApiResponse } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import CustomerForm from "@/components/pageComponents/CustomerForm";
import StatusSelect from "@/components/molecules/StatusSelect";

const EditCustomer: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<CustomerApiResponse>(
    `admin/customers/${params.id}`
  );
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      setStatus(data.data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <CustomerForm customer={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/customers/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit Customer"
        id={params.id}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/customer-list"
      />
    </LoadingError>
  );
};

export default EditCustomer;
