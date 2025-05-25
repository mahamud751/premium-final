import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Location } from "@/services/types";

interface LoactionSelectProps {
  locations: Location[];
  selectedLocation: string;
  onLocationChange: (event: SelectChangeEvent<string>) => void;
}

const LocationySelect: React.FC<LoactionSelectProps> = ({
  locations,
  selectedLocation,
  onLocationChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="loclocation-select-label">Location</InputLabel>
      <Select
        labelId="location-select-label"
        id="location-select"
        value={selectedLocation}
        label="Location"
        onChange={onLocationChange}
        name="location_id"
      >
        {locations?.map((location) => (
          <MenuItem key={location.id} value={location.id}>
            {location.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationySelect;
