"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import DataTable from "@/components/templates/DataTable";

const RequestList: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 160 },
    { field: "mobile", headerName: "Phone", flex: 1, minWidth: 160 },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/product-requests`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/product-requests`}
        columns={columns}
        searchField="name"
        link="requests-list"
        isJustCreateData={false}
      />
    </>
  );
};

export default RequestList;
