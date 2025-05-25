import React from "react";
import { Banner } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  banner: Banner | null;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="banner-name"
          label="Banner Name"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={banner?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="banner-position"
          label="Banner Position"
          variant="outlined"
          name="position"
          fullWidth
          defaultValue={banner?.position || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="banner-link"
          label="Banner Link"
          variant="outlined"
          name="link"
          fullWidth
          defaultValue={banner?.link || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default BannerForm;
