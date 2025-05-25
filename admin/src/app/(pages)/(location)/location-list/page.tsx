"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const LocationList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "title", headerName: "Name", flex: 1, minWidth: 160 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/locations`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/locations`}
        columns={columns}
        searchField="name"
        link="location-list"
      />
    </>
  );
};

export default LocationList;
