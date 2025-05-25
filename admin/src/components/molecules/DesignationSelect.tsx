import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Designation } from "@/services/types";

interface DesignationSelectProps {
  designations: Designation[];
  selectedDesignation: string;
  onDesignationChange: (event: SelectChangeEvent<string>) => void;
}

const DesignationSelect: React.FC<DesignationSelectProps> = ({
  designations,
  selectedDesignation,
  onDesignationChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="designation-select-label">Designation</InputLabel>
      <Select
        labelId="designation-select-label"
        id="designation-select"
        value={selectedDesignation}
        label="Designation"
        onChange={onDesignationChange}
        name="designation_id"
      >
        {designations?.map((designation) => (
          <MenuItem key={designation.id} value={designation.id}>
            {designation.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DesignationSelect;
