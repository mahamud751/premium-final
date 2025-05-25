"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const AdditionalList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    {
      field: "additional_salary",
      headerName: "Additional Salary",
      flex: 1,
      minWidth: 160,
    },
    { field: "reason", headerName: "Reason", flex: 1, minWidth: 160 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 160 },
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
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/additional-salaries`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/additional-salaries`}
        columns={columns}
        searchField="name"
        link="additional-salary-list"
      />
    </>
  );
};

export default AdditionalList;
