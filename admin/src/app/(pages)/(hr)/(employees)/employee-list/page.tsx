"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const EmployeeList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StatusButton status={params.value} />
        </div>
      ),
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
