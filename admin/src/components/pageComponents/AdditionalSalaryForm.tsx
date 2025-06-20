import React from "react";
import { AdditionalSalaryFormProps, User } from "@/services/types";
import { Grid, TextField } from "@mui/material";
import useFetch from "@/services/hooks/UseRequest"; // Note: Corrected casing to match import
import UserSelect from "../molecules/UserSelect";

const AdditionalSalaryForm: React.FC<AdditionalSalaryFormProps> = ({
  data,
  selectUser,
  setSelectUser,
}) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useFetch<{
    data: User[];
  }>("admin/users");

  const users = userData?.data || [];

  const handleUserChange = (
    event: React.SyntheticEvent,
    value: User | null
  ) => {
    const selectedUserId = value?.id || "";
    setSelectUser(selectedUserId);
  };

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <UserSelect
          users={users}
          selectedUser={selectUser}
          onUserChange={handleUserChange}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="additional-salary-name"
          label="Additional Salary Name"
          variant="outlined"
          name="additional_salary"
          fullWidth
          defaultValue={data?.additional_salary || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="reason"
          label="Reason"
          variant="outlined"
          name="reason"
          fullWidth
          defaultValue={data?.reason || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="date"
          label="Date"
          name="date"
          type="date"
          fullWidth
          defaultValue={data?.date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default AdditionalSalaryForm;
