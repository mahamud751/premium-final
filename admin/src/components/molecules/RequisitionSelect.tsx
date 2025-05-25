import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Requisition } from "@/services/types";

interface RequisitionSelectProps {
  requisitions: Requisition[];
  selectedRequisition: string;
  onRequisitionChange: (event: SelectChangeEvent<string>) => void;
}

const RequisitionSelect: React.FC<RequisitionSelectProps> = ({
  requisitions,
  selectedRequisition,
  onRequisitionChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="requisition-select-label">Requisition</InputLabel>
      <Select
        labelId="requisition-select-label"
        id="requisition-select"
        value={selectedRequisition}
        label="Requisition"
        onChange={onRequisitionChange}
        name="requisition_id"
      >
        {requisitions?.map((requisition) => (
          <MenuItem key={requisition.id} value={requisition.id}>
            {requisition.remark}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RequisitionSelect;
