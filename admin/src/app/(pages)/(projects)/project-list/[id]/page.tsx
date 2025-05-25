// pages/ProjectEdit.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  BaseEditProps,
  ProjectApiResponse,
  Location,
  Project,
  AdditionalData,
} from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import ProjectForm from "@/components/pageComponents/ProjectForm";
import StatusSelect from "@/components/molecules/StatusSelect";
import { Grid, SelectChangeEvent } from "@mui/material";
import ImagePdfUpload from "@/components/molecules/ImagePdfUpload";

const ProjectEdit: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<ProjectApiResponse>(
    `admin/projects/${params.id}`
  );
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
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [deletedDocumentUrls, setDeletedDocumentUrls] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [projectData, setProjectData] = useState<Project>({
    name: "",
    description: "",
    status: "",
    location_id: "",
    address: "",
    facing: "",
    building_height: "",
    land_area: "",
    launching_date: "",
    hand_over_date: "",
    project_type: "",
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

  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useFetch<{ data: Location[] }>("admin/locations");

  useEffect(() => {
    if (data?.data) {
      const mappedProject: Project = {
        ...data.data,
        location_id: String(data.data.location_id),
        total_share: String(data.data.total_share),
        unit_per_floor: String(data.data.unit_per_floor),
      };

      setProjectData(mappedProject);
      setPhotosData({
        images: Array.isArray(data.data.images)
          ? data.data.images.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
        unit_images: Array.isArray(data.data.unit_images)
          ? data.data.unit_images.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
        floor_images: Array.isArray(data.data.floor_images)
          ? data.data.floor_images.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
      });
      setDocumentUrls(
        Array.isArray(data.data.documents) ? data.data.documents : []
      );
      setSelectedLocation(String(data.data.location_id));
      setStatus(data.data.status);
    }
  }, [data]);

  useEffect(() => {
    if (locationData?.data) {
      setLocations(locationData.data);
    }
  }, [locationData]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as string;
    setStatus(newStatus);
  };

  const handleRemoveDocumentUrl = (index: number) => {
    const removedUrl = documentUrls[index];
    setDocumentUrls((prev) => prev.filter((_, i) => i !== index));
    setDeletedDocumentUrls((prev) => [...prev, removedUrl]);
  };

  const additionalFields = (
    <>
      <ProjectForm
        project={projectData}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onProjectChange={(project: Project) => setProjectData(project)}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  const resetFields = () => {
    setPhotosData({ images: [], unit_images: [], floor_images: [] });
    setFiles([]);
    setDocumentUrls([]);
    setDeletedDocumentUrls([]);
    setSelectedLocation("");
    setStatus("");
    setProjectData({
      name: "",
      description: "",
      status: "",
      location_id: "",
      address: "",
      project_type: "",
      facing: "",
      building_height: "",
      land_area: "",
      launching_date: "",
      hand_over_date: "",
      road_width: "",
      total_share: "",
      images: [],
      documents: [],
      floor_images: [],
      unit_images: [],
      unit_per_floor: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      progress_timeline: [{ title: "", progress: 0, status: false }],
      cc_camera_urls: [],
    });
  };

  const additionalData: AdditionalData = {
    unit_per_floor: projectData.unit_per_floor,
    progress_timeline: projectData.progress_timeline,
    cc_camera_urls: projectData.cc_camera_urls,
    documents: documentUrls,
    deleted_documents: deletedDocumentUrls,
  };

  return (
    <LoadingError
      loading={loading || locationLoading}
      error={error || locationError}
    >
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/projects/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        additionalData={additionalData}
        buttonText="Edit Project"
        resetFields={resetFields}
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
        booleanFields={[]}
      >
        {setFiles && (
          <Grid item xs={8}>
            <ImagePdfUpload
              onFilesChangePdf={setFiles}
              files={files}
              existingUrls={documentUrls}
              onRemoveUrl={handleRemoveDocumentUrl}
              isMultiple={true}
              isFile={true}
              imageLabel="Only PDF files are allowed"
              accept="application/pdf"
            />
          </Grid>
        )}
      </AddForm>
    </LoadingError>
  );
};

export default ProjectEdit;
