import { Grid, TextField } from "@mui/material";
import { Vendor } from "@/services/types";

interface VendorFormProps {
  vendor: Vendor | null;
}
const VendorForm: React.FC<VendorFormProps> = ({ vendor }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          fullWidth
          defaultValue={vendor?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={vendor?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          fullWidth
          defaultValue={vendor?.phone || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          fullWidth
          defaultValue={vendor?.address || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {!vendor?.id && (
        <>
          <Grid item xs={12} md={4}>
            <TextField
              id="outlined-basic"
              label="Password"
              name="password"
              fullWidth
              defaultValue={vendor?.password || ""}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default VendorForm;
