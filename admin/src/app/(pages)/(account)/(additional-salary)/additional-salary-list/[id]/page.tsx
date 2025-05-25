"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { AdditionalSalaryApiResponse, BaseEditProps } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import AdditionalSalaryForm from "@/components/pageComponents/AdditionalSalaryForm";

const EditAdditionalSalary: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<AdditionalSalaryApiResponse>(
    `admin/additional-salaries/${params.id}`
  );
  const [status, setStatus] = useState<string>("");
  const [selectUser, setSelectUser] = useState<string>("");
  useEffect(() => {
    if (data?.data) {
      setSelectUser(data.data.user_id);
      setStatus(data.data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <AdditionalSalaryForm
        data={data?.data || null}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/additional-salaries/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Additional Salary"
        link="/additional-salary-list"
      />
    </LoadingError>
  );
};
export default EditAdditionalSalary;
