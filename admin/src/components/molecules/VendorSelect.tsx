import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Vendor } from "@/services/types";

interface VendorSelectProps {
  vendors: Vendor[];
  selectedVendor: string;
  onVendorChange: (event: SelectChangeEvent<string>) => void;
}

const VendorSelect: React.FC<VendorSelectProps> = ({
  vendors,
  selectedVendor,
  onVendorChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="vendor-select-label">Vendor</InputLabel>
      <Select
        labelId="vendor-select-label"
        id="vendor-select"
        value={selectedVendor}
        label="Vendor"
        onChange={onVendorChange}
        name="vendor_id"
      >
        {vendors?.map((vendor) => (
          <MenuItem key={vendor.id} value={vendor.id}>
            {vendor.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VendorSelect;
