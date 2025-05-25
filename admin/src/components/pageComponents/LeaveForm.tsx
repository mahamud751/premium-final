import React from "react";
import { Leave } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface FormProps {
  leave: Leave | null;
}

const LeaveForm: React.FC<FormProps> = ({ leave }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="reason"
          label="Reason"
          variant="outlined"
          name="reason"
          fullWidth
          defaultValue={leave?.reason || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="form-date"
          label="From Date"
          type="date"
          variant="outlined"
          name="from_date"
          fullWidth
          defaultValue={leave?.from_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="to-date"
          label="To Date"
          type="date"
          variant="outlined"
          name="to_date"
          fullWidth
          defaultValue={leave?.to_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default LeaveForm;
