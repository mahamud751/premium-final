// components/pageComponents/ProjectForm.tsx
import React, { useEffect, useState } from "react";
import {
  Location,
  ProgressTimeline,
  Project,
  ProjectFormProps,
} from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import LocationySelect from "../molecules/LocationSelect";
import CameraSelect from "../molecules/CameraSelect";

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  selectedLocation,
  setSelectedLocation,
  onProjectChange,
}) => {
  const [formData, setFormData] = React.useState<Project>({
    name: "",
    description: "",
    status: "Active",
    location_id: "",
    project_type: "",
    address: "",
    facing: "",
    building_height: "",
    land_area: "",
    launching_date: "",
    hand_over_date: "",
    road_width: "",
    total_share: "",
    documents: [],
    images: [],
    unit_images: [],
    floor_images: [],
    unit_per_floor: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    progress_timeline: [{ title: "", progress: 0, status: false }],
    cc_camera_urls: [], // Initialize cc_camera_urls
  });

  const {
    data: responseData,
    loading: locationLoading,
    error: locationError,
  } = useFetch<{ data: Location[] }>("admin/locations?_status=Active");

  const locations = responseData?.data || [];

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        cc_camera_urls: project.cc_camera_urls
          ? project.cc_camera_urls.map(String)
          : [],
      });
      setSelectedLocation(project.location_id);
    }
  }, [project, setSelectedLocation]);

  const handleLocationChange = (event: { target: { value: any } }) => {
    const selectedLocationId = event.target.value;
    setSelectedLocation(selectedLocationId);
    handleChange("location_id", selectedLocationId);
  };

  const handleCameraChange = (event: SelectChangeEvent<string[]>) => {
    const selectedCameraUrls = event.target.value as string[];
    handleChange("cc_camera_urls", selectedCameraUrls);
  };

  const handleChange = (
    field: keyof Project,
    value: string | number | ProgressTimeline[] | string[]
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onProjectChange(updatedFormData);
  };

  const handleItemChange = (
    index: number,
    field: keyof ProgressTimeline,
    value: string | number | boolean
  ) => {
    const updatedItems = [...formData.progress_timeline];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange("progress_timeline", updatedItems);
  };

  const addTimelineEntry = () => {
    handleChange("progress_timeline", [
      ...formData.progress_timeline,
      { title: "", progress: 0, status: false },
    ]);
  };

  const removeItemEntry = (index: number) => {
    if (formData.progress_timeline.length > 1) {
      handleChange(
        "progress_timeline",
        formData.progress_timeline.filter((_, i) => i !== index)
      );
    }
  };

  if (locationLoading) return <p>Loading...</p>;
  if (locationError) return <p>Error: {locationError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <LocationySelect
                locations={locations || []}
                selectedLocation={selectedLocation}
                onLocationChange={handleLocationChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CameraSelect
                selectedCameras={formData.cc_camera_urls}
                onCameraChange={handleCameraChange}
              />
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  name="description"
                  fullWidth
                  defaultValue={project?.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="road_width"
                  label="Road Width"
                  variant="outlined"
                  name="road_width"
                  fullWidth
                  defaultValue={project?.road_width || ""}
                  onChange={(e) => handleChange("road_width", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="project_type"
                  label="Project Type"
                  variant="outlined"
                  name="project_type"
                  fullWidth
                  defaultValue={project?.project_type || ""}
                  onChange={(e) => handleChange("project_type", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="total_share"
                  label="Total Share"
                  variant="outlined"
                  name="total_share"
                  fullWidth
                  defaultValue={project?.total_share || ""}
                  onChange={(e) => handleChange("total_share", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="unit_per_floor"
                  label="Unit Per Floor"
                  variant="outlined"
                  name="unit_per_floor"
                  fullWidth
                  defaultValue={project?.unit_per_floor || ""}
                  onChange={(e) =>
                    handleChange("unit_per_floor", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="launching_date"
                  label="Launching Date"
                  type="date"
                  variant="outlined"
                  name="launching_date"
                  fullWidth
                  defaultValue={project?.launching_date || ""}
                  onChange={(e) =>
                    handleChange("launching_date", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="hand_over_date"
                  label="Hand Over Date"
                  type="date"
                  variant="outlined"
                  name="hand_over_date"
                  fullWidth
                  defaultValue={project?.hand_over_date || ""}
                  onChange={(e) =>
                    handleChange("hand_over_date", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                defaultValue={project?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                name="address"
                fullWidth
                defaultValue={project?.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="facing"
                label="Facing"
                variant="outlined"
                name="facing"
                fullWidth
                defaultValue={project?.facing || ""}
                onChange={(e) => handleChange("facing", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="building_height"
                label="Building Height"
                variant="outlined"
                name="building_height"
                fullWidth
                defaultValue={project?.building_height || ""}
                onChange={(e) =>
                  handleChange("building_height", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="land_area"
                label="Land Area"
                variant="outlined"
                name="land_area"
                fullWidth
                defaultValue={project?.land_area || ""}
                onChange={(e) => handleChange("land_area", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} className="mt-5">
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <h3>Progress Timeline</h3>
              {formData?.progress_timeline?.map((entry, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  mt={2}
                >
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Title"
                      value={entry.title}
                      onChange={(e) =>
                        handleItemChange(index, "title", e.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Progress (%)"
                      type="number"
                      value={entry.progress}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "progress",
                          parseInt(e.target.value) || 0
                        )
                      }
                      fullWidth
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={entry.status}
                          onChange={(e) =>
                            handleItemChange(index, "status", e.target.checked)
                          }
                        />
                      }
                      label="Status"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeItemEntry(index)}
                      disabled={formData?.progress_timeline.length === 1}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                onClick={addTimelineEntry}
                className="mt-4"
              >
                Add Timeline Entry
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProjectForm;
