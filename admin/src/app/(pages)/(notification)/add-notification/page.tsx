"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";

import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import NotificationForm from "@/components/pageComponents/NotificationForm";

const AddNotification: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductTye, setSelectedProductType] = useState<string>("");

  const additionalFields = (
    <>
      <NotificationForm
        payment={null}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="entity_type">Entity Type</InputLabel>
          <Select
            labelId="entity_type"
            id="entity_type"
            label="Select Entity Type"
            name="entity_type"
            value={selectedProductTye}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <MenuItem value="Project">Project</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  const resetFields = () => {
    setSelectedProduct("");
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/notifications`}
        additionalFields={additionalFields}
        buttonText="Add Notification"
        resetFields={resetFields}
        id={""}
        //@ts-ignore
        photosData={[]}
        isNoPhotoFile={true}
        link="notification-list"
      />
    </div>
  );
};

export default AddNotification;
