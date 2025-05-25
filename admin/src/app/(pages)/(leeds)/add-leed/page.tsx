"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Customer } from "@/services/types";
import LeadForm from "@/components/pageComponents/LeadForm";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface LeadDetail {
  amount: number;
}

const AddLeed: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leadStatus, setLeadStatus] = useState<string>("");
  const [scheduleType, setScheduleType] = useState<string>("");
  const [leadSource, setLeadSource] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [details, setDetails] = useState<LeadDetail[]>([{ amount: 0 }]);

  const additionalFields = (
    <>
      <LeadForm
        lead={null}
        selectedCustomer={selectedCustomer}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        setSelectedCustomer={setSelectedCustomer}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        leadStatus={leadStatus}
        setLeadStatus={setLeadStatus}
        scheduleType={scheduleType}
        setScheduleType={setScheduleType}
        leadSource={leadSource}
        setLeadSource={setLeadSource}
        onDetailsChange={(newDetails) => setDetails(newDetails)}
        details={details}
        setDetails={setDetails}
      />

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            label="Select Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="on">On</MenuItem>
            <MenuItem value="off">Off</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  const resetFields = () => {
    setCustomers([]);
    setSelectedCustomer("");
    setDetails([{ amount: 0 }]);
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/leads`}
        additionalFields={additionalFields}
        additionalData={{
          //@ts-ignore
          details,
        }}
        buttonText="Add Lead"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="leed-list"
        numberFields={["details[1][amount]"]}
      />
    </div>
  );
};

export default AddLeed;
