import { Grid, TextField } from "@mui/material";
import { Faq } from "@/services/types";

interface FaqFormProps {
  faq: Faq | null;
}
const FaqForm: React.FC<FaqFormProps> = ({ faq }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq question"
          name="question"
          fullWidth
          defaultValue={faq?.question || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq Answer"
          name="answer"
          fullWidth
          defaultValue={faq?.answer || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Faq Type"
          name="type"
          fullWidth
          defaultValue={faq?.type || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default FaqForm;
