import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import { Camera } from "@/services/types";

interface CameraSelectProps {
  selectedCameras: string[];
  onCameraChange: (event: SelectChangeEvent<string[]>) => void;
}

const CameraSelect: React.FC<CameraSelectProps> = ({
  selectedCameras,
  onCameraChange,
}) => {
  const {
    data: responseData,
    loading: cameraLoading,
    error: cameraError,
  } = useFetch<{ data: Camera[] }>("admin/cameras?_status=Active");

  const cameras = responseData?.data || [];

  if (cameraLoading) return <p>Loading cameras...</p>;
  if (cameraError) return <p>Error: {cameraError?.message}</p>;

  // Convert selected camera IDs to strings for consistent comparison
  const stringSelectedCameras = selectedCameras.map(String);

  return (
    <FormControl fullWidth>
      <InputLabel id="camera-select-label">Cameras</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        multiple
        value={stringSelectedCameras}
        label="Cameras"
        onChange={onCameraChange}
        name="cc_camera_urls"
        renderValue={(selected) => (
          <div>
            {selected
              .map((value) => {
                const camera = cameras.find((c) => String(c.id) === value);
                return camera ? camera.name : value;
              })
              .join(", ")}
          </div>
        )}
      >
        {cameras.map((camera) => (
          <MenuItem key={camera.id} value={String(camera.id)}>
            {camera.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CameraSelect;
