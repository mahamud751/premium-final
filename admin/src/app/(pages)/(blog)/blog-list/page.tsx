"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import Image from "next/image";

const BlogList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "image",
      headerName: "Images",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex flex-wrap gap-2">
          {Array.isArray(params.value) && params.value.length > 0 ? (
            params.value.map((photo: string, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={photo}
                  alt={`Image ${index + 1}`}
                  width={36}
                  height={36}
                  className="object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.png";
                  }}
                />
              </div>
            ))
          ) : (
            <span>No images</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/blogs`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/blogs`}
      columns={columns}
      searchField="name"
      link="blog-list"
    />
  );
};

export default BlogList;
