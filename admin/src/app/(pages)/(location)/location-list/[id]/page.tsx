"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, LocationApiResponse } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import LocationForm from "@/components/pageComponents/LocationForm";

const EditLocation: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<LocationApiResponse>(
    `admin/locations/${params.id}`
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
      <LocationForm location={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/locations/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Location"
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/location-list"
      />
    </LoadingError>
  );
};

export default EditLocation;
