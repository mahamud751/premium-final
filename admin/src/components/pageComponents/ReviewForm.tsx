import React from "react";
import { Review } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface ReviewFormProps {
  review: Review | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={review?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          name="message"
          fullWidth
          defaultValue={review?.message || ""}
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
          defaultValue={review?.link || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="designation"
          label="Designation"
          variant="outlined"
          name="designation"
          fullWidth
          defaultValue={review?.designation || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default ReviewForm;
