"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";
import { BaseEditProps, FaqApiResponse } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import FaqForm from "@/components/pageComponents/FaqForm";
import StatusSelect from "@/components/molecules/StatusSelect";

const EditFaq: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<FaqApiResponse>(
    `admin/faqs/${params.id}`
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
      <FaqForm faq={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/faqs/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        //@ts-ignore
        photosData={[]}
        buttonText="Edit Faq"
        link="/faq-list"
        isNoPhotoFile={true}
      />
    </LoadingError>
  );
};

export default EditFaq;
