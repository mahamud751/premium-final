import React from "react";
import { Department } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface DepartmentFormProps {
  department: Department | null;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="department-name"
          label="Department Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={department?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default DepartmentForm;
