import React from "react";
import { Designation } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface DesignationFormProps {
  designation: Designation | null;
}

const DesignationForm: React.FC<DesignationFormProps> = ({ designation }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="designation-name"
          label="Designation Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={designation?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default DesignationForm;
