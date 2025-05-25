import React from "react";
import { Holiday } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  holiday: Holiday | null;
}

const HolidayForm: React.FC<BannerFormProps> = ({ holiday }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TextField
          id="holiday-name"
          label="Holiday Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={holiday?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="form-date"
          label="From Date"
          type="date"
          variant="outlined"
          name="from_date"
          fullWidth
          defaultValue={holiday?.from_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="to-date"
          label="To Date"
          type="date"
          variant="outlined"
          name="to_date"
          fullWidth
          defaultValue={holiday?.to_date || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default HolidayForm;
