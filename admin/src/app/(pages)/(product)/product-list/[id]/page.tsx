"use client";
import React, { useEffect, useState } from "react";
import { BaseEditProps, ProductApiResponse, Project } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import ProductForm from "@/components/pageComponents/ProductForm";
import { Grid, SelectChangeEvent } from "@mui/material";
import StatusSelect from "@/components/molecules/StatusSelect";

const EditProduct: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<ProductApiResponse>(
    `admin/products/${params.id}`
  );
  const [photosData, setPhotosData] = useState<{
    images: { title: string; src: string }[];
    layout_images: { title: string; src: string }[];
  }>({
    images: [],
    layout_images: [],
  });
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [, setProjects] = useState<Project[]>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("");

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFetch<{ data: Project[] }>("admin/projects");

  useEffect(() => {
    if (data?.data) {
      setPhotosData({
        images: Array.isArray(data.data.images)
          ? data.data.images.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
        layout_images: Array.isArray(data.data.layout_images)
          ? data?.data?.layout_images?.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
      });
      setSelectedProject(data.data.project_id);
      setStatus(data.data.status);
    }
  }, [data]);

  const resetFields = () => {
    setSelectedProject("");
    setProjects([]);
    setDescription("");
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <ProductForm
        product={data?.data || null}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        onDescriptionChange={(newDescription) => setDescription(newDescription)}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError
      loading={loading || projectLoading}
      error={error || projectError}
    >
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/products/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        additionalData={{
          description,
        }}
        buttonText="Edit Product"
        resetFields={resetFields}
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/product-list"
        booleanFields={["rooftop_gardening", "car_parking", "generator"]}
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
      />
    </LoadingError>
  );
};

export default EditProduct;
