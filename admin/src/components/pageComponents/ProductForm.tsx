import React, { useEffect, useState } from "react";
import { ProductFormProps, Project } from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import ProjectSelect from "../molecules/ProjectSelect";

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  selectedProject,
  setSelectedProject,
  onDescriptionChange,
}) => {
  const [description, setDescription] = useState("");
  const [rooftopGardening, setRooftopGardening] = useState(false);
  const [carParking, setCarParking] = useState(false);
  const [generator, setGenerator] = useState(false);
  const {
    data: responseData,
    loading: projectLoading,
    error: projectError,
  } = useFetch<{ data: Project[] }>("admin/projects");

  const projects = responseData?.data || [];

  useEffect(() => {
    if (product) {
      setDescription(product.description || "");
      setRooftopGardening(product.rooftop_gardening || false);
      setCarParking(product.car_parking || false);
      setGenerator(product.generator || false);
      onDescriptionChange(product.description || "");
    }
  }, [product, onDescriptionChange]);

  const handleProjectChange = (event: { target: { value: any } }) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    onDescriptionChange(event.target.value);
  };

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>Error: {projectError?.message}</p>;

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
                  id="flat_type"
                  label="Flat Type"
                  variant="outlined"
                  name="flat_type"
                  fullWidth
                  defaultValue={product?.flat_type || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="floor_number"
                  label="Floor Number"
                  variant="outlined"
                  name="floor_number"
                  fullWidth
                  defaultValue={product?.floor_number || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="flat_size"
                  label="Flat Size (sqft)"
                  variant="outlined"
                  name="flat_size"
                  fullWidth
                  defaultValue={product?.flat_size || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="unit_price"
                  label="Unit Price"
                  variant="outlined"
                  name="unit_price"
                  fullWidth
                  defaultValue={product?.unit_price || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="total_price"
                  label="Total Price"
                  variant="outlined"
                  name="total_price"
                  fullWidth
                  defaultValue={product?.total_price || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="parking_charge"
                  label="Parking Charge"
                  variant="outlined"
                  name="parking_charge"
                  fullWidth
                  defaultValue={product?.parking_charge || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="utility_charge"
                  label="Utility Charge"
                  variant="outlined"
                  name="utility_charge"
                  fullWidth
                  defaultValue={product?.utility_charge || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="additional_charge"
                  label="Additional Charge"
                  variant="outlined"
                  name="additional_charge"
                  fullWidth
                  defaultValue={product?.additional_charge || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="other_charge"
                  label="Other Charge"
                  variant="outlined"
                  name="other_charge"
                  fullWidth
                  defaultValue={product?.other_charge || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="discount"
                  label="Discount"
                  variant="outlined"
                  name="discount"
                  fullWidth
                  defaultValue={product?.discount || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="refund_amount"
                  label="Refund Amount"
                  variant="outlined"
                  name="refund_amount"
                  fullWidth
                  defaultValue={product?.refund_amount || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="booking_money"
                  label="Booking Money"
                  variant="outlined"
                  name="booking_money"
                  fullWidth
                  defaultValue={product?.booking_money || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="land_registration_amount"
                  label="Land Registration"
                  variant="outlined"
                  name="land_registration_amount"
                  fullWidth
                  defaultValue={product?.land_registration_amount || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="service_charge"
                  label="Service Charge"
                  variant="outlined"
                  name="service_charge"
                  fullWidth
                  defaultValue={product?.service_charge || ""}
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
                id="description"
                label="Description"
                variant="outlined"
                name="description"
                fullWidth
                value={description}
                onChange={handleDescriptionChange}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="bedroom"
                label="Bedroom"
                variant="outlined"
                name="bedroom"
                fullWidth
                defaultValue={product?.bedroom || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="bathroom"
                label="Bathroom"
                variant="outlined"
                name="bathroom"
                fullWidth
                defaultValue={product?.bathroom || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="kitchen"
                label="Kitchen"
                variant="outlined"
                name="kitchen"
                fullWidth
                defaultValue={product?.kitchen || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="drawing_room"
                label="Drawing Room"
                variant="outlined"
                name="drawing_room"
                fullWidth
                defaultValue={product?.drawing_room || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="dining_room"
                label="Dining Room"
                variant="outlined"
                name="dining_room"
                fullWidth
                defaultValue={product?.dining_room || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="balcony"
                label="Balcony"
                variant="outlined"
                name="balcony"
                fullWidth
                defaultValue={product?.balcony || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rooftop_gardening"
                    checked={rooftopGardening}
                    onChange={(e) => setRooftopGardening(e.target.checked)}
                  />
                }
                label="Rooftop Gardening"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="car_parking"
                    checked={carParking}
                    onChange={(e) => setCarParking(e.target.checked)}
                  />
                }
                label="Car Parking"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="generator"
                    checked={generator}
                    onChange={(e) => setGenerator(e.target.checked)}
                  />
                }
                label="Generator"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="passenger_lift"
                label="Passenger Lift"
                variant="outlined"
                name="passenger_lift"
                fullWidth
                defaultValue={product?.passenger_lift || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                id="emi_mounts"
                label="EMI Months"
                variant="outlined"
                name="emi_mounts"
                fullWidth
                defaultValue={product?.emi_mounts || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
