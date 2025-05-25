import React from "react";
import {
  Department,
  Designation,
  EmployeeFormProps,
  User,
} from "@/services/types";
import { Grid, TextField, Paper } from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import UserSelect from "../molecules/UserSelect";
import DesignationSelect from "../molecules/DesignationSelect";
import DepartmentSelect from "../molecules/DepartmentSelect";

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  selectedUser,
  setSelectedUser,
  selectedDepartment,
  setSelectedDepartment,
  selectedDesignation,
  setSelectedDesignation,
}) => {
  const { data: responseUserData } = useFetch<{ data: User[] }>(
    "admin/users?_user_type=Employee"
  );

  const { data: responseDeisgnationData } = useFetch<{ data: Designation[] }>(
    "admin/designations"
  );

  const { data: responseDepartmentData } = useFetch<{ data: Department[] }>(
    "admin/departments"
  );

  const users = responseUserData?.data || [];
  const designations = responseDeisgnationData?.data || [];
  const departments = responseDepartmentData?.data || [];

  const handleUserChange = (event: { target: { value: any } }) => {
    setSelectedUser(event.target.value);
  };
  const handleDepartmentChange = (event: { target: { value: any } }) => {
    setSelectedDepartment(event.target.value);
  };
  const handleDesignationChange = (event: { target: { value: any } }) => {
    setSelectedDesignation(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <UserSelect
                users={users}
                selectedUser={selectedUser}
                onUserChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DesignationSelect
                designations={designations}
                selectedDesignation={selectedDesignation}
                onDesignationChange={handleDesignationChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DepartmentSelect
                departments={departments}
                selectedDepartment={selectedDepartment}
                onDepartmentChange={handleDepartmentChange}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="bank_account_number"
          label="Bank Account Number"
          variant="outlined"
          name="bank_account_number"
          fullWidth
          defaultValue={employee?.employee?.bank_account_number || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="joining_date-date"
          label="Joining Date"
          type="date"
          variant="outlined"
          name="joining_date"
          fullWidth
          defaultValue={employee?.employee?.joining_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="salary"
          label="Salary"
          variant="outlined"
          name="salary"
          fullWidth
          defaultValue={employee?.employee?.salary || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
