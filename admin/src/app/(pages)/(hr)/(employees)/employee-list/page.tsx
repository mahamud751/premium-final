"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";

const EmployeeList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    {
      field: "machine_user_id",
      headerName: "Machine User ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusButton status={params.value} />
        </div>
      ),
    },
    {
      field: "father_or_husband_name",
      headerName: "Father/Husband Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "nid_number",
      headerName: "NID Number",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "role_id",
      headerName: "Role ID",
      flex: 1,
      minWidth: 100,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/employees`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/employees`}
        columns={columns}
        searchField="name"
        link="employee-list"
        isJustCreateData={false}
      />
    </>
  );
};

export default EmployeeList;
