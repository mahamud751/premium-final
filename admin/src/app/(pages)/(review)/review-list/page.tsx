"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Photo } from "@/services/types";
import Image from "next/image";
import StatusButton from "@/components/atoms/StatusButton";

const ReviewList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "message", headerName: "Message", flex: 1, minWidth: 160 },
    { field: "designation", headerName: "Designation", flex: 1, minWidth: 160 },
    {
      field: "image",
      headerName: "Images",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        let images: string[] = [];

        // Handle JSON-encoded string or array
        try {
          if (typeof params.value === "string") {
            // Replace escaped slashes and parse JSON
            const cleanedValue = params.value.replace(/\\\//g, "/");
            const parsed = JSON.parse(cleanedValue);
            // Ensure parsed result is an array
            images = Array.isArray(parsed) ? parsed : [parsed];
          } else if (Array.isArray(params.value)) {
            images = params.value;
          }
        } catch (error) {
          console.error("Failed to parse image field:", error);
          images = [];
        }

        return (
          <div className="my-2 flex flex-wrap gap-2">
            {images.length > 0 ? (
              images.map((photo, index) => (
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
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/reviews`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/reviews`}
      columns={columns}
      searchField="name"
      link="review-list"
      isJustCreateData={false}
    />
  );
};

export default ReviewList;
