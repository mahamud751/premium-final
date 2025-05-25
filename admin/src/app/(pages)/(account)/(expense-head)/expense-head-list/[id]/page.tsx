"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, ExpenseApiResponse } from "@/services/types";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import ExpenseHeadForm from "@/components/pageComponents/ExpenseHeadForm";

const EditExpense: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<ExpenseApiResponse>(
    `admin/expense-heads/${params.id}`
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
      <ExpenseHeadForm expenseHead={data?.data || null} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/expense-heads/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Expense Head"
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="/expense-head-list"
      />
    </LoadingError>
  );
};

export default EditExpense;
