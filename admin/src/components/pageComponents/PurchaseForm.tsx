import React, { useEffect } from "react";
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
import VendorSelect from "../molecules/VendorSelect";
import RequisitionSelect from "../molecules/RequisitionSelect";
import { Project, Vendor, Requisition, Unit } from "@/services/types";

interface PurchaseItem {
  unit_id: string;
  description: string;
  qty: number;
  unit_price: number;
}

interface PurchaseData {
  project_id: string;
  vendor_id: string;
  requisition_id: string;
  contact_number: string;
  description: string;
  required_date: string;
  items: PurchaseItem[];
}

interface PurchaseFormProps {
  purchase: PurchaseData | null;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedVendor: string;
  setSelectedVendor: (value: string) => void;
  selectedRequisition: string;
  setSelectedRequisition: (value: string) => void;
  onPurchaseChange: (purchase: PurchaseData) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({
  purchase,
  selectedProject,
  setSelectedProject,
  selectedVendor,
  setSelectedVendor,
  selectedRequisition,
  setSelectedRequisition,
  onPurchaseChange,
}) => {
  const [formData, setFormData] = React.useState<PurchaseData>({
    project_id: "",
    vendor_id: "",
    requisition_id: "",
    contact_number: "",
    description: "",
    required_date: "",
    items: [{ unit_id: "", description: "", qty: 0, unit_price: 0 }],
  });

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFetch<{ data: Project[] }>("admin/projects");

  const {
    data: vendorData,
    loading: vendorLoading,
    error: vendorError,
  } = useFetch<{ data: Vendor[] }>("admin/vendors");

  const {
    data: requisitionData,
    loading: requisitionLoading,
    error: requisitionError,
  } = useFetch<{ data: Requisition[] }>("admin/requisitions");
  const { data: unitData } = useFetch<{ data: Unit[] }>("admin/units");

  const projects = projectData?.data || [];
  const vendors = vendorData?.data || [];
  const requisitions = requisitionData?.data || [];
  const units = unitData?.data || [];

  useEffect(() => {
    if (purchase) {
      setFormData(purchase);
      setSelectedProject(purchase.project_id);
      setSelectedVendor(purchase.vendor_id);
      setSelectedRequisition(purchase.requisition_id);
    }
  }, [purchase, setSelectedProject, setSelectedVendor, setSelectedRequisition]);

  const handleChange = (
    field: keyof PurchaseData,
    value: string | number | PurchaseItem[]
  ) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onPurchaseChange(updatedFormData);
  };

  const handleItemChange = (
    index: number,
    field: keyof PurchaseItem,
    value: string | number
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange("items", updatedItems);
  };

  const addItemEntry = () => {
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

  const handleProjectChange = (event: { target: { value: any } }) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const handleVendorChange = (event: { target: { value: any } }) => {
    const vendorId = event.target.value;
    setSelectedVendor(vendorId);
  };

  const handleRequisitionChange = (event: { target: { value: any } }) => {
    const requisitionId = event.target.value;
    setSelectedRequisition(requisitionId);
  };

  if (projectLoading || vendorLoading || requisitionLoading)
    return <p>Loading...</p>;
  if (projectError) return <p>Error: {projectError?.message}</p>;
  if (vendorError) return <p>Error: {vendorError?.message}</p>;
  if (requisitionError) return <p>Error: {requisitionError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <ProjectSelect
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
              />
            </Grid>
            <Grid item xs={12}>
              <VendorSelect
                vendors={vendors}
                selectedVendor={selectedVendor}
                onVendorChange={handleVendorChange}
              />
            </Grid>
            <Grid item xs={12}>
              <RequisitionSelect
                requisitions={requisitions}
                selectedRequisition={selectedRequisition}
                onRequisitionChange={handleRequisitionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="contact_number"
                label="Contact Number"
                variant="outlined"
                name="contact_number"
                fullWidth
                value={formData.contact_number}
                onChange={(e) => handleChange("contact_number", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                name="description"
                fullWidth
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="required_date"
                label="Required Date"
                type="date"
                variant="outlined"
                name="required_date"
                fullWidth
                value={formData.required_date}
                onChange={(e) => handleChange("required_date", e.target.value)}
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
              <h3>Purchase Items</h3>
              {formData.items.map((item, index) => (
                <>
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
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeItemEntry(index)}
                        disabled={formData.items.length === 1}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ))}
              <Button
                variant="contained"
                onClick={addItemEntry}
                className="mt-4"
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PurchaseForm;
