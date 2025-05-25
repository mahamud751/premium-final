"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const EmployeeLeaveList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "reason", headerName: "Reason", flex: 1, minWidth: 160 },
    { field: "from_date", headerName: "From Date", flex: 1, minWidth: 160 },
    { field: "to_date", headerName: "To Date", flex: 1, minWidth: 160 },
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
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/leaves?_status=Pending`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/leaves?_status=Pending`}
        columns={columns}
        searchField="name"
        link="leave-list"
        isJustDeleteData={false}
      />
    </>
  );
};

export default EmployeeLeaveList;
