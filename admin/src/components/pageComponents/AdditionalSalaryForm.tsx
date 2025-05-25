import React from "react";
import {
  AdditionalSalary,
  AdditionalSalaryFormProps,
  User,
} from "@/services/types";
import { Grid, TextField } from "@mui/material";
import UseFetch from "@/services/hooks/UseRequest";
import UserSelect from "../molecules/UserSelect";

const AdditionalSalaryForm: React.FC<AdditionalSalaryFormProps> = ({
  data,
  selectUser,
  setSelectUser,
}) => {
  const { data: userData } = UseFetch<{ data: User[] }>("admin/users");

  const users = userData?.data || [];
  const handleUserChange = (event: { target: { value: any } }) => {
    const selectedUserId = event.target.value;
    setSelectUser(selectedUserId);
  };
  return (
    <>
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
          id="outlined-basic"
          label="Date"
          name="date"
          type="date"
          fullWidth
          defaultValue={data?.date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default AdditionalSalaryForm;
