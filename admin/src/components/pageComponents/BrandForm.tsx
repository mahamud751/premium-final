import React from "react";
import { Brand } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BrandFormProps {
  brand: Brand | null;
}

const BrandForm: React.FC<BrandFormProps> = ({ brand }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="brand-name"
          label="Brand Name"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={brand?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="brand-position"
          label="Brand Position"
          variant="outlined"
          name="position"
          fullWidth
          defaultValue={brand?.position || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default BrandForm;
