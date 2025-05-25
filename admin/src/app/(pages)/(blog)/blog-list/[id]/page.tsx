"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { BaseEditProps, BlogApiResponse, Photo } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import BlogForm from "@/components/pageComponents/BlogForm";

const EditBlog: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<BlogApiResponse>(
    `admin/blogs/${params.id}`
  );
  const [photosData, setPhotosData] = useState<{
    image: { title: string; src: string }[];
  }>({
    image: [],
  });

  const [status, setStatus] = useState<string>("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.data) {
      setPhotosData({
        image: Array.isArray(data.data.image)
          ? data.data.image.map((url) => ({
              title: url.split("/").pop() || "",
              src: url,
            }))
          : [],
      });

      setStatus(data.data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <BlogForm
        blog={data?.data || null}
        onDetailsChange={(newDetails) => setContent(newDetails)}
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
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/blogs/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Blog"
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/blog-list"
        additionalData={{ content }}
        imageFields={[
          {
            key: "image",
            isMultiple: false,
            label: "Size must be (1080*810)",
            isArray: false,
          },
        ]}
      />
    </LoadingError>
  );
};

export default EditBlog;
