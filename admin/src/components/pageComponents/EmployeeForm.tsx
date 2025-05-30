"use client";
import React from "react";
import {
  Department,
  Designation,
  Employee,
  EmployeeFormProps,
  User,
} from "@/services/types";
import { Grid, TextField, Paper } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
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
  const { data: responseDesignationData } = useFetch<{ data: Designation[] }>(
    "admin/designations"
  );
  const { data: responseDepartmentData } = useFetch<{ data: Department[] }>(
    "admin/departments"
  );

  const users = responseUserData?.data || [];
  const designations = responseDesignationData?.data || [];
  const departments = responseDepartmentData?.data || [];

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value as string);
  };
  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value as string);
  };
  const handleDesignationChange = (event: SelectChangeEvent<string>) => {
    setSelectedDesignation(event.target.value as string);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                defaultValue={employee?.name || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                defaultValue={employee?.email || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                name="phone"
                fullWidth
                defaultValue={employee?.phone || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="father_or_husband_name"
                label="Father/Husband Name"
                variant="outlined"
                name="father_or_husband_name"
                fullWidth
                defaultValue={employee?.father_or_husband_name || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                name="address"
                fullWidth
                defaultValue={employee?.address || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="nid_number"
                label="NID Number"
                variant="outlined"
                name="nid_number"
                fullWidth
                defaultValue={employee?.nid_number || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="website"
                label="Website"
                variant="outlined"
                name="website"
                fullWidth
                defaultValue={employee?.website || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                name="description"
                fullWidth
                defaultValue={employee?.description || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="image"
                label="Image URL"
                variant="outlined"
                name="image"
                fullWidth
                defaultValue={employee?.image || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="can_login"
                label="Can Login (1 or 0)"
                variant="outlined"
                name="can_login"
                fullWidth
                defaultValue={employee?.can_login || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="user_type"
                label="User Type"
                variant="outlined"
                name="user_type"
                fullWidth
                defaultValue={employee?.user_type || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="role_id"
                label="Role ID"
                variant="outlined"
                name="role_id"
                fullWidth
                defaultValue={employee?.role_id || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <UserSelect
                users={users}
                selectedUser={selectedUser}
                onUserChange={handleUserChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DepartmentSelect
                departments={departments}
                selectedDepartment={selectedDepartment}
                onDepartmentChange={handleDepartmentChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DesignationSelect
                designations={designations}
                selectedDesignation={selectedDesignation}
                onDesignationChange={handleDesignationChange}
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
          id="joining_date"
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
      <Grid item xs={12} md={4}>
        <TextField
          id="resignation_date"
          label="Resignation Date"
          type="date"
          variant="outlined"
          name="resignation_date"
          fullWidth
          defaultValue={employee?.employee?.resignation_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
