import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Customer } from "@/services/types";

interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomer: string;
  onCustomerChange: (event: SelectChangeEvent<string>) => void;
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  customers,
  selectedCustomer,
  onCustomerChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="customer-select-label">Customer</InputLabel>
      <Select
        labelId="customer-select-label"
        id="customer-select"
        value={selectedCustomer}
        label="Customer"
        onChange={onCustomerChange}
        name="customer_id"
      >
        {customers?.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomerSelect;
