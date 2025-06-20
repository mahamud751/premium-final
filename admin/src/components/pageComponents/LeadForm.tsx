import React, { useEffect, useState } from "react";
import { Customer, LeedFormProps, Project, User } from "@/services/types";
import {
  Grid,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useFetch from "@/services/hooks/UseRequest";
import CustomerSelect from "../molecules/CustomerSelect";
import ProjectSelect from "../molecules/ProjectSelect";
import UserSelect from "../molecules/UserSelect";

const LeadForm: React.FC<LeedFormProps> = ({
  lead,
  selectedCustomer,
  selectedProject,
  setSelectedProject,
  setSelectedCustomer,
  selectedUser,
  setSelectedUser,
  leadStatus,
  setLeadStatus,
  scheduleType,
  setScheduleType,
  leadSource,
  setLeadSource,
  onDetailsChange,
  details,

  setDetails,
}) => {
  const {
    data: responseData,
    loading: customerLoading,
    error: customerError,
  } = useFetch<{ data: Customer[] }>("admin/customers");

  const { data: responseDataProject } = useFetch<{ data: Project[] }>(
    "admin/projects"
  );
  const { data: responseDataUsers } = useFetch<{ data: User[] }>("admin/users");

  const customers = responseData?.data || [];
  const projects = responseDataProject?.data || [];
  const users = responseDataUsers?.data || [];

  useEffect(() => {
    if (lead) {
      onDetailsChange(lead.details || [{ amount: 0 }]);
    }
  }, [lead, onDetailsChange]);

  const handleCustomerChange = (event: { target: { value: any } }) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomer(selectedCustomerId);
  };

  const handleProjectChange = (event: { target: { value: any } }) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const handleUserChange = (
    event: React.SyntheticEvent,
    value: User | null
  ) => {
    const selectedUserId = value?.id || "";
    setSelectedUser(selectedUserId);
  };
  const handleDetailChange = (index: number, value: number) => {
    const updatedDetails = [...details];
    updatedDetails[index] = { ...updatedDetails[index], amount: value };
    setDetails(updatedDetails);
    onDetailsChange(updatedDetails);
  };

  const addDetailEntry = () => {
    setDetails([...details, { amount: 0 }]);
  };

  const removeDetailEntry = (index: number) => {
    if (details.length > 1) {
      setDetails(details.filter((_, i) => i !== index));
    }
  };

  if (customerLoading) return <p>Loading...</p>;
  if (customerError) return <p>Error: {customerError?.message}</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} className="bg-slate-50">
          <Grid container spacing={2} p={5}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="customer"
                  label="Customer"
                  variant="outlined"
                  name="customer_id"
                  fullWidth
                  defaultValue={lead?.customer_id || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="customer_profession"
                  label="Customer Profession"
                  variant="outlined"
                  name="customer_profession"
                  fullWidth
                  defaultValue={lead?.customer_profession || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="customer_name"
                  label="Customer Name"
                  variant="outlined"
                  name="customer_name"
                  fullWidth
                  defaultValue={lead?.customer_name || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  fullWidth
                  defaultValue={lead?.phone || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lead_date"
                  label="Lead Date"
                  type="date"
                  variant="outlined"
                  name="lead_date"
                  fullWidth
                  defaultValue={lead?.lead_date || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  variant="outlined"
                  name="date"
                  fullWidth
                  defaultValue={lead?.date || ""}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6} p={2}>
                <ProjectSelect
                  projects={projects}
                  selectedProject={selectedProject}
                  onProjectChange={handleProjectChange}
                />
              </Grid>
              <Grid item xs={12} md={6} p={2}>
                <UserSelect
                  users={users}
                  selectedUser={selectedUser}
                  onUserChange={handleUserChange}
                />
              </Grid>
              <Grid item xs={12} md={6} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="lead_status">Lead Status</InputLabel>
                  <Select
                    labelId="lead_status"
                    id="lead_status"
                    label="Select Lead Status"
                    name="lead_status"
                    value={leadStatus}
                    onChange={(e) => setLeadStatus(e.target.value)}
                  >
                    <MenuItem value="Interest">Interest</MenuItem>
                    <MenuItem value="Followup">Follow Up</MenuItem>
                    <MenuItem value="Not interest">Not Interest</MenuItem>
                    <MenuItem value="Neutral">Neutral</MenuItem>
                  </Select>
                </FormControl>
              </Grid>{" "}
              <Grid item xs={12} md={6} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="schedule_type">Schedule Type</InputLabel>
                  <Select
                    labelId="schedule_type"
                    id="schedule_type"
                    label="Select Schedule Type"
                    name="schedule_type"
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value)}
                  >
                    <MenuItem value="Call">Call</MenuItem>
                    <MenuItem value="Meeting">Meeting</MenuItem>
                    <MenuItem value="Visit">Visit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="lead_source">Lead Source</InputLabel>
                  <Select
                    labelId="lead_source"
                    id="lead_source"
                    label="Select Lead Source"
                    name="lead_source"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                  >
                    <MenuItem value="Facebook">Facebook</MenuItem>
                    <MenuItem value="Instagram">Instagram</MenuItem>
                    <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                    <MenuItem value="Self">Self</MenuItem>
                    <MenuItem value="Refference">Refference</MenuItem>
                    <MenuItem value="Linkdin">Linkdin</MenuItem>
                    <MenuItem value="Youtube">Youtube</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
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
                id="designation"
                label="Designation"
                variant="outlined"
                name="designation"
                fullWidth
                defaultValue={lead?.designation || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="organization_name"
                label="Organization Name"
                variant="outlined"
                name="organization_name"
                fullWidth
                defaultValue={lead?.organization_name || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                defaultValue={lead?.email || ""}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LeadForm;
