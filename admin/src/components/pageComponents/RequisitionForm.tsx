// RequisitionForm.tsx
import React, { useEffect } from "react";
import {
  Project,
  Requisition,
  RequisitionFormProps,
  RequisitionItem,
  Unit,
} from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import ProjectSelect from "../molecules/ProjectSelect";

const RequisitionForm: React.FC<RequisitionFormProps> = ({
  requisition,
  selectedProject,
  setSelectedProject,
  onRequisitionChange,
}) => {
  const [formData, setFormData] = React.useState<Requisition>({
    project_id: "",
    description: "",
    required_date: "",
    remark: "",
    items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
  });
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFetch<{ data: Project[] }>("admin/projects");
  const {
    data: unitData,
    loading: unitLoading,
    error: unitError,
  } = useFetch<{ data: Unit[] }>("admin/units");

  const units = unitData?.data || [];
  const projects = projectData?.data || [];

  useEffect(() => {
    if (requisition) {
      setFormData(requisition);
      setSelectedProject(requisition.project_id);
    }
  }, [requisition, setSelectedProject]);

  const handleProjectChange = (event: { target: { value: any } }) => {
    setSelectedProject(event.target.value);
  };

  const handleChange = (
    field: keyof Requisition,
    value: string | number | RequisitionItem[]
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onRequisitionChange(updatedFormData);
  };

  const handleItemChange = (
    index: number,
    field: keyof RequisitionItem,
    value: string | number
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange("items", updatedItems);
  };

  const addItem = () => {
    handleChange("items", [
      ...formData.items,
      { unit_id: "", description: "", qty: 0, unit_price: 0 },
    ]);
  };

  const removeItemEntry = (index: number) => {
    if (formData.items.length > 1) {
      handleChange(
        "items",
        formData.items.filter((_, i) => i !== index)
      );
    }
  };

  if (projectLoading || unitLoading) return <p>Loading...</p>;
  if (projectError) return <p>Error: {projectError?.message}</p>;
  if (unitError) return <p>Error: {unitError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12} md={12}>
              <ProjectSelect
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
              />
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="required_date"
                  label="Required Date"
                  type="date"
                  variant="outlined"
                  name="required_date"
                  defaultValue={requisition?.required_date}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  name="description"
                  defaultValue={requisition?.description}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="remark"
                  label="Remark"
                  variant="outlined"
                  name="remark"
                  defaultValue={requisition?.remark}
                  fullWidth
                  multiline
                  rows={4}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} className="mt-5">
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <h3>Items</h3>
              {formData?.items?.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  mt={2}
                >
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id={`unit-select-${index}-label`}>
                        Unit
                      </InputLabel>
                      <Select
                        labelId={`unit-select-${index}-label`}
                        id={`unit-select-${index}`}
                        value={item.unit_id}
                        label="Unit"
                        onChange={(e) =>
                          handleItemChange(index, "unit_id", e.target.value)
                        }
                      >
                        {units.map((unit) => (
                          <MenuItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      label="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "qty",
                          parseInt(e.target.value) || 0
                        )
                      }
                      fullWidth
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Unit Price"
                      type="number"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "unit_price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      fullWidth
                      inputProps={{ min: 0, step: "0.01" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeItemEntry(index)}
                      disabled={formData?.items.length === 1}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Button variant="contained" onClick={addItem} className="mt-4">
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RequisitionForm;
