"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";

import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const VendorList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 120 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <p>{params.row?.name}</p>,
    },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 120 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 120 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/vendors`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/vendors`}
        columns={columns}
        searchField="name"
        // defaultHiddenColumns={["id"]}
        link="vendors-list"
      />
    </>
  );
};

export default VendorList;
