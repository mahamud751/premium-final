import { Grid, TextField } from "@mui/material";
import { Customer } from "@/services/types";

interface CustomerFormProps {
  customer: Customer | null;
}
const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          fullWidth
          defaultValue={customer?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Email"
          name="email"
          fullWidth
          defaultValue={customer?.email || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          fullWidth
          defaultValue={customer?.phone || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Address"
          name="address"
          fullWidth
          defaultValue={customer?.address || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Father or Husband Name"
          name="father_or_husband_name"
          fullWidth
          defaultValue={customer?.father_or_husband_name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="NID Number"
          name="nid_number"
          fullWidth
          defaultValue={customer?.nid_number || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {!customer?.id && (
        <>
          <Grid item xs={12} md={4}>
            <TextField
              id="outlined-basic"
              label="Password"
              name="password"
              fullWidth
              defaultValue={customer?.password || ""}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default CustomerForm;
