import React from "react";
import { Location } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface LocationFormProps {
  location: Location | null;
}

const LocationForm: React.FC<LocationFormProps> = ({ location }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="location-name"
          label="Location Name"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={location?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default LocationForm;
