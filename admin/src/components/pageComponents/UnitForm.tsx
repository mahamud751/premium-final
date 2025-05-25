import React from "react";
import { Unit } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  unit: Unit | null;
}

const UnitForm: React.FC<BannerFormProps> = ({ unit }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="unit-name"
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={unit?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="unit-label"
          label="Label"
          variant="outlined"
          name="label"
          fullWidth
          defaultValue={unit?.label || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="unit-multiplier"
          label="Multiplier"
          variant="outlined"
          name="multiplier"
          fullWidth
          defaultValue={unit?.multiplier || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default UnitForm;
