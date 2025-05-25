import React from "react";
import { Camera } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  camera: Camera | null;
}

const CameraForm: React.FC<BannerFormProps> = ({ camera }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={camera?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="stream_path"
          label="Stream Path"
          variant="outlined"
          name="stream_path"
          fullWidth
          defaultValue={camera?.stream_path || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default CameraForm;
