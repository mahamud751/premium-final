"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import { Location, Project, AdditionalData } from "@/services/types";
import ProjectForm from "@/components/pageComponents/ProjectForm";
import { Grid, SelectChangeEvent } from "@mui/material";
import ImagePdfUpload from "@/components/molecules/ImagePdfUpload";

const AddProject: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [photosData, setPhotosData] = useState<{
    images: { title: string; src: string }[];
    unit_images: { title: string; src: string }[];
    floor_images: { title: string; src: string }[];
  }>({
    images: [],
    unit_images: [],
    floor_images: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [projectData, setProjectData] = useState<Project>({
    name: "",
    description: "",
    status: "Active",
    location_id: "",
    address: "",
    facing: "",
    building_height: "",
    land_area: "",
    launching_date: "",
    hand_over_date: "",
    road_width: "",
    total_share: "",
    project_type: "",
    images: [],
    unit_images: [],
    floor_images: [],
    documents: [],
    unit_per_floor: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    progress_timeline: [{ title: "", progress: 0, status: false }],
    cc_camera_urls: [],
  });
  const [status, setStatus] = useState<string>("Active");

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
    setProjectData({ ...projectData, status: event.target.value });
  };

  const additionalFields = (
    <>
      <ProjectForm
        project={null}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onProjectChange={(project: Project) => setProjectData(project)}
      />
    </>
  );

  const resetFields = () => {
    setLocations([]);
    setSelectedLocation("");
    setProjectData({
      name: "",
      description: "",
      status: "Active",
      project_type: "",
      location_id: "",
      address: "",
      facing: "",
      building_height: "",
      land_area: "",
      launching_date: "",
      hand_over_date: "",
      road_width: "",
      total_share: "",
      images: [],
      unit_images: [],
      floor_images: [],
      documents: [],
      unit_per_floor: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      progress_timeline: [{ title: "", progress: 0, status: false }],
      cc_camera_urls: [],
    });

    setFiles([]);
  };

  const additionalData: AdditionalData = {
    ...projectData,
    documents: [],
    deleted_documents: [],
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/projects`}
        additionalFields={additionalFields}
        additionalData={additionalData}
        buttonText="Add Project"
        resetFields={resetFields}
        id=""
        photosData={photosData}
        setPhotosData={setPhotosData}
        files={files}
        setFiles={setFiles}
        imageFields={[
          {
            key: "images",
            isMultiple: true,
            isArray: true,
            label: "Project Image Size must be (610*510)",
          },
          {
            key: "unit_images",
            isMultiple: true,
            isArray: true,
            label: "Unit Image Size must be (610*510)",
          },
          {
            key: "floor_images",
            isMultiple: true,
            isArray: true,
            label: "Floor Image Size must be (610*510)",
          },
        ]}
        link="/project-list"
      >
        <Grid item xs={8}>
          <ImagePdfUpload
            onFilesChangePdf={setFiles}
            files={files}
            existingUrls={[]}
            isMultiple={true}
            isFile={true}
            imageLabel="Only PDF files are allowed"
            accept="application/pdf"
          />
        </Grid>
      </AddForm>
    </div>
  );
};

export default AddProject;
