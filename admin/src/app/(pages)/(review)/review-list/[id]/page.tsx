"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Photo, ReviewApiResponse } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import ReviewForm from "@/components/pageComponents/ReviewForm";

const EditReview: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<ReviewApiResponse>(
    `admin/reviews/${params.id}`
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
      <ReviewForm review={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/reviews/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Review"
        link="/review-list"
        photosData={photosData}
        setPhotosData={setPhotosData}
        imageFields={[
          {
            key: "image",
            isMultiple: true,
            label: "Size must be (1920*860)",
            isArray: false, // Changed to true
          },
        ]}
      />
    </LoadingError>
  );
};

export default EditReview;
