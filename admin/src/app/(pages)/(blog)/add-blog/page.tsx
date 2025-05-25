"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import BlogForm from "@/components/pageComponents/BlogForm";

const AddBlog: React.FC = () => {
  const [content, setContent] = useState("");
  const photosData = {
    image: [],
  };
  const additionalFields = (
    <BlogForm
      blog={null}
      onDetailsChange={(newDetails) => setContent(newDetails)}
    />
  );

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/blogs`}
      additionalFields={additionalFields}
      buttonText="Add Blog"
      id=""
      photosData={photosData}
      imageFields={[
        {
          key: "image",
          isMultiple: false,
          label: "Size must be (1080*810)",
          isArray: false,
        },
      ]}
      link="blog-list"
      additionalData={{ content }}
    />
  );
};

export default AddBlog;
