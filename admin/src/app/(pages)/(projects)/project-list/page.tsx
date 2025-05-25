"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import StatusButton from "@/components/atoms/StatusButton";

const ProjectList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 120 },
    { field: "facing", headerName: "Facing", flex: 1, minWidth: 120 },
    { field: "land_area", headerName: "Land Area", flex: 1, minWidth: 120 },
    { field: "facing", headerName: "Facing", flex: 1, minWidth: 120 },
    {
      field: "launching_date",
      headerName: "Launching Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "hand_over_date",
      headerName: "Hand Over Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "building_height",
      headerName: "Building Height",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "images",
      headerName: "Image",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex">
          {Array.isArray(params.value) && params.value.length > 0 ? (
            params.value.map((photo: string, index: number) => (
              <div key={index} className="flex mr-2">
                <Image
                  src={photo}
                  alt={`Project image ${index + 1}`}
                  width={36}
                  height={36}
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
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/projects`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/projects`}
      columns={columns}
      searchField="name"
      defaultHiddenColumns={[""]}
      link="project-list"
    />
  );
};

export default ProjectList;
