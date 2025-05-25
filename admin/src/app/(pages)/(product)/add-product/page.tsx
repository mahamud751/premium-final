"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Project } from "@/services/types";
import ProductForm from "@/components/pageComponents/ProductForm";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const AddProduct: React.FC = () => {
  const photosData: { title: string; src: string }[] = [];
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [, setProjects] = useState<Project[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("Active");
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <ProductForm
        product={null}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        onDescriptionChange={(newDescription) => setDescription(newDescription)}
      />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Select Status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">InActive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  const resetFields = () => {
    setProjects([]);
    setSelectedProject("");
    setDescription("");
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/products`}
        additionalFields={additionalFields}
        additionalData={{
          description,
          documents: [],
          deleted_documents: [],
        }}
        buttonText="Add Product"
        resetFields={resetFields}
        id={""}
        link="product-list"
        //@ts-ignore
        photosData={photosData}
        files={files}
        setFiles={setFiles}
        imageFields={[
          {
            key: "images",
            isMultiple: true,
            label: "Product Image Size must be (610*610)",
            isArray: true,
          },
          {
            key: "layout_images",
            isMultiple: true,
            label: "Layout Image Size must be (610*610)",
            isArray: true,
          },
        ]}
        booleanFields={["rooftop_gardening", "car_parking", "generator"]}
        imageLabel="Size must be (610*510)"
      />
    </div>
  );
};

export default AddProduct;
