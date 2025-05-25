"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, BrandApiResponse, Photo } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import BrandForm from "@/components/pageComponents/BrandForm";

const EditBrand: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<BrandApiResponse>(
    `admin/brand-logos/${params.id}`
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
      <BrandForm brand={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/brand-logos/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Brand"
        photosData={photosData}
        setPhotosData={setPhotosData}
        imageFields={[
          {
            key: "image",
            isMultiple: false,
            label: "Size must be (64*64)",
            isArray: false,
          },
        ]}
        link="/brand-list"
      />
    </LoadingError>
  );
};

export default EditBrand;
