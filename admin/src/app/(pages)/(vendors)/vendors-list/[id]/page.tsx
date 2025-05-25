"use client";

import React, { useState, useEffect } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, VendorApiResponse } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import VendorForm from "@/components/pageComponents/VendorForm";
import StatusSelect from "@/components/molecules/StatusSelect";

const EditVendor: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<VendorApiResponse>(
    `admin/vendors/${params.id}`
  );
  const [photosData, setPhotosData] = useState<{
    image: { title: string; src: string }[];
  }>({
    image: [],
  });

  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    if (data?.data) {
      setPhotosData({
        image: Array.isArray(data.data.image)
          ? data.data.image.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
      });
      setStatus(data.data.status);
    }
  }, [data]);
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <VendorForm vendor={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/vendors/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit Vendor"
        id={params.id}
        photosData={photosData}
        setPhotosData={setPhotosData}
        imageFields={[
          {
            key: "image",
            isMultiple: true,
            label: "Size must be (960*960)",
            isArray: false, // Changed to true
          },
        ]}
        link="/vendor-list"
      />
    </LoadingError>
  );
};

export default EditVendor;
