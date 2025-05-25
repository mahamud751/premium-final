"use client";
import React, { useState } from "react";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";
import AccountForm from "@/components/pageComponents/AccountForm";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const AddAccount: React.FC = () => {
  const [normalBalance, setNewBalance] = useState<string>("Debit");
  const [type, setType] = useState<string>("Asset");
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setNewBalance(event.target.value as string);
  };
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as string);
  };
  const additionalFields = (
    <>
      <AccountForm account={null} />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="normal-balance-select">Normal Balance</InputLabel>
          <Select
            labelId="normal-balance"
            id="normal-balance-select"
            label="Select Normal Balance"
            name="normal_balance"
            value={normalBalance}
            onChange={handleStatusChange}
          >
            <MenuItem value="Debit">Debit</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="Type"
            name="type"
            value={type}
            onChange={handleTypeChange}
          >
            <MenuItem value="Asset">Asset</MenuItem>
            <MenuItem value="Liability">Liability</MenuItem>
            <MenuItem value="Equity">Equity</MenuItem>
            <MenuItem value="Revenue">Revenue</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURLHOME}/v1/admin/chart-of-accounts`}
      additionalFields={additionalFields}
      buttonText="Add Account"
      id=""
      isNoPhotoFile={true}
      link="account-list"
    />
  );
};

export default AddAccount;
