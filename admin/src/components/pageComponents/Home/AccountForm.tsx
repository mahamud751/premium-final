import React from "react";
import { Account } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface BannerFormProps {
  account: Account | null;
}

const AccountForm: React.FC<BannerFormProps> = ({ account }) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="account-name"
          label="Account Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={account?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="account-position"
          label="Account Normal Balance"
          variant="outlined"
          name="normal_balance"
          fullWidth
          defaultValue={account?.normal_balance || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          id="account-opening_balance"
          label="Account O peningBalance"
          variant="outlined"
          name="opening_balance"
          fullWidth
          defaultValue={account?.opening_balance || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default AccountForm;
