"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import EmployeeForm from "@/components/pageComponents/EmployeeForm";

const AddEmployee: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };
  const additionalFields = (
    <>
      <EmployeeForm
        employee={null}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
      />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Select Status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">InActive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  const resetFields = () => {
    setSelectedUser("");
    setSelectedDepartment("");
    setSelectedDesignation("");
    setStatus("");
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/employees`}
        additionalFields={additionalFields}
        buttonText="Add Employee"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={[]}
        link="employee-list"
        isNoPhotoFile={true}
      />
    </div>
  );
};

export default AddEmployee;
