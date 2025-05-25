import React from "react";
import { Popular } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface FormProps {
  popular: Popular | null;
}

const PopularForm: React.FC<FormProps> = ({ popular }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={popular?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="position"
          label="Position"
          variant="outlined"
          name="position"
          fullWidth
          defaultValue={popular?.position || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="link"
          label="Link"
          variant="outlined"
          name="link"
          fullWidth
          defaultValue={popular?.link || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default PopularForm;
