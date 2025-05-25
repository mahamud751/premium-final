"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const BannerList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "code", headerName: "Code", flex: 1, minWidth: 160 },
    { field: "balance", headerName: "Balance", flex: 1, minWidth: 160 },
    {
      field: "normal_balance",
      headerName: "Normal Balance",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "opening_balance",
      headerName: "Opening Balance",
      flex: 1,
      minWidth: 160,
    },
    { field: "type", headerName: "Type", flex: 1, minWidth: 160 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    //   minWidth: 160,
    //   renderCell: (params) => <StatusButton status={params.value} />,
    // },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/chart-of-accounts`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/chart-of-accounts`}
        columns={columns}
        searchField="name"
        link="account-list"
      />
    </>
  );
};

export default BannerList;
