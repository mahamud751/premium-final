import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Department } from "@/services/types";

interface DepartmentSelectProps {
  departments: Department[];
  selectedDepartment: string;
  onDepartmentChange: (event: SelectChangeEvent<string>) => void;
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="department-select-label">Department</InputLabel>
      <Select
        labelId="department-select-label"
        id="department-select"
        value={selectedDepartment}
        label="Department"
        onChange={onDepartmentChange}
        name="department_id"
      >
        {departments?.map((department) => (
          <MenuItem key={department.id} value={department.id}>
            {department.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DepartmentSelect;
